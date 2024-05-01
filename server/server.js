import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import cors from "cors";
import aws from "aws-sdk";

import User from "./Schema/User.js";
import Novel from "./Schema/Novel.js";

const server = express();
let PORT = 3000;

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/; 

// Enable json sharing in order to accept the json data
server.use(express.json());
server.use(cors());

// Connect Mongoose to server
mongoose.connect(process.env.DB_LOCATION, {
    autoIndex: true
});

// set up aws s3 bucket
const s3 = new aws.S3({
    region: 'ap-southeast-1',
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

// Generate a random upload url for front-end uploading
const generateUploadURL = async () => {
    const date = new Date();
    const imageName = `${nanoid()}-${date.getTime()}.jpeg`;

    return await s3.getSignedUrlPromise('putObject', {
        Bucket: 'novel-publishing-and-reading-website',
        Key: 'lightnovels/' + imageName,
        Expires: 3000,
        ContentType: "image/jpeg",
    })
}

const formatDatatoSend = (user) => { 
    // Make an access token to verify user login
    const access_token = jwt.sign({ id: user._id }, process.env.SECRET_ACCESS_KEY);

    return {
        access_token,
        profile_img: user.personal_info.profile_img,
        username: user.personal_info.username
    }
}

const verifyJWT = (req, res, next) => {
    const authHeaders = req.headers['authorization'];

    const token = authHeaders && authHeaders.split(" ")[1];
    if (token == null) {
        return res.status(401).json({ error: "No access token"});
    }

    jwt.verify(token, process.env.SECRET_ACCESS_KEY, (err, user) =>{
        if (err) {
            return res.status(403).json({ error: "Access token không khả dụng" });
        }

        req.user = user.id;
        next();
    });
}

// Upload images url route
server.get("/get-upload-url", (req, res) => {
    generateUploadURL().then(url => res.status(200).json({ uploadURL: url }))
    .catch(err => {
        console.log(err.message);
        return res.status(500).json({ error: err.message })
    })
})

server.post("/signup", async (req, res) => {
    let { username, email, password } = req.body;

    // Validate data from front end 
    if (username.length < 3) {
        return res.status(403).json({ "error": "Tên tài khoản phải ít nhất 3 ký tự" }); //status using to throw a status code
    } 

    // Check user input email or not
    if (!email.length) {
        return res.status(403).json({ "error": "Bạn chưa nhập email" });
    }

    if (!password.length) {
        return res.status(403).json({ "error": "Bạn chưa nhập mật khẩu" });
    }

    if (!emailRegex.test(email)) {
        return res.status(403).json({ "error": "Email không khả dụng" });
    }

    if (!passwordRegex.test(password)) {
        return res.status(403).json({ "error": "Mật khẩu từ 8 tới 20 ký tự và có ít nhất một chữ in hoa và một chữ số" });
    }

    bcrypt.hash(password, 10, (err, hashed_password) => {
        
        let user = new User({
            personal_info: {
                username, email, password: hashed_password
            }
        })

        user.save().then((u) => {
            return res.status(200).json(formatDatatoSend(u))
        })
        .catch(err => {
            // When MongoDB catch a duplication error, it throw out error code 11000
            if (err.code === 11000) {
                const duplicateKey = Object.keys(err.keyPattern)[0];

                if (duplicateKey === "personal_info.email") {
                    return res.status(403).json({ error: "Email đã tồn tại" });
                } 
                else if (duplicateKey === "personal_info.username") {
                    return res.status(403).json({ error: "Tên đăng nhập đã tồn tại" });
                }
            }

            return res.status(500).json({ "error": err.message })
        }) 
    })
})

// Change this to make a login can use email or username
server.post("/signin", (req, res) => {
    let { email, password } = req.body;

    // Try to find email that user input is exist or not
    User.findOne({ "personal_info.email": email}).then((user) => {
        // If not, return error email not found
        if (!user) {
            return res.status(403).json({ "error": "Không tìm thấy email" });
        }
        
        bcrypt.compare(password, user.personal_info.password, (err, result) => {
            if (err) {
                return res.status(403).json({ "error": "Lỗi xuất hiện khi đăng nhập, xin hãy thử lại" });
            }

            // If password is incorrect
            if (!result) {
                return res.status(403).json({ "error": "Mật khẩu sai" });
            } else {
                return res.status(200).json(formatDatatoSend(user));
            }
        })
    })
    .catch(err => {
        console.log(err.message);
        return res.status(500).json({ "error": err.message });
    })
})

server.get("/trending", (req, res) => {

    Novel.find({ draft: false })
    .populate("publisher", "personal_info.username personal_info.profile_img -_id") // populate adds username and profile_img to publisher variable
    .sort({ "activity.total_reads": -1, "activity.total_likes": -1, "updatedAt": -1 }) // -1 gives the lastest updatedAt variable in database
    .select("novel_id novel_title novel_banner author artist categories description activity publishedAt updatedAt -_id") // select gives the tag need for frontend
    .limit(4) // limit the number of novel in one page
    .then(novels => {
        return res.status(200).json({ novels })
    })
    .catch(err => {
        return res.status(500).json({ error: err.message })
    })
})

// Can be changed in the future
server.get("/latest-original", (req, res) => {

    Novel.find({ draft: false, type_of_novel: "Truyện sáng tác" })
    .populate("publisher", "personal_info.username personal_info.profile_img -_id") // populate adds username and profile_img to publisher variable
    .sort({ "updatedAt": -1 }) // -1 gives the lastest updatedAt variable in database
    .select("novel_id novel_title novel_banner author artist categories description activity publishedAt updatedAt -_id") // select gives the tag need for frontend
    .limit(5) // limit the number of novel in one page
    .then(novels => {
        return res.status(200).json({ novels })
    })
    .catch(err => {
        return res.status(500).json({ error: err.message })
    })
})

// Can be changed in the future
server.get("/latest-chapter", (req, res) => {

    Novel.find({ draft: false, type_of_novel: "Truyện dịch" })
    .populate("publisher", "personal_info.username personal_info.profile_img -_id") // populate adds username and profile_img to publisher variable
    .sort({ "updatedAt": -1 }) // -1 gives the lastest updatedAt variable in database
    .select("novel_id novel_title novel_banner author artist categories description activity publishedAt updatedAt -_id") // select gives the tag need for frontend
    .limit(11) // limit the number of novel in one page
    .then(novels => {
        return res.status(200).json({ novels })
    })
    .catch(err => {
        return res.status(500).json({ error: err.message })
    })
})

server.get("/latest-publish", (req, res) => {

    Novel.find({ draft: false })
    .populate("publisher", "personal_info.username personal_info.profile_img -_id") // populate adds username and profile_img to publisher variable
    .sort({ "publishedAt": -1 }) // -1 gives the lastest updatedAt variable in database
    .select("novel_id novel_title novel_banner author artist categories description activity publishedAt updatedAt -_id") // select gives the tag need for frontend
    .limit(6) // limit the number of novel in one page
    .then(novels => {
        return res.status(200).json({ novels })
    })
    .catch(err => {
        return res.status(500).json({ error: err.message })
    })
})

server.post('/search-novels', (req, res) => {
    
    let { page, query } = req.body;

    let maxLimit = 18;

    let regexQuery = { draft: false };

    // Search by novel title or other name
    if (query) {
        regexQuery.$or = [
            { novel_title: { $regex: query, $options: 'i' } },
            { other_name: { $regex: query, $options: 'i' } }
        ];
    }

    Novel.find(regexQuery)
    .populate("publisher", "personal_info.username personal_info.profile_img -_id")
    .sort({ "publishedAt": -1 })
    .select("novel_id novel_title novel_banner other_name author artist categories description activity publishedAt updatedAt -_id")
    .skip((page - 1) * maxLimit)
    .limit(maxLimit)
    .then(novels => {
        return res.status(200).json({ novels })
    })
    .catch(err => {
        return res.status(500).json({ error: err.message })
    })
})

server.post('/all-novels', (req, res) => {
    // countDocuments let we run a count query in order to count the number of documents
    Novel.countDocuments({ draft: false })
    .then(count => {
        return res.status(200).json({ totalDocs: count })
    })
    .catch(err => {
        console.log(err.message);
        return res.status(500).json({ error: err.message })
    })
})

server.post('/create-series', verifyJWT, (req, res) => {

    let publisherId = req.user;

    let {
        novel_title, 
        other_name,
        sensitive_content,
        novel_banner,
        author,
        artist,
        type_of_novel,
        categories,
        description,
        note,
        status,
        episode,
        draft
    } = req.body;

    if (!novel_title.length) {
        return res.status(403).json({ error: "Truyện chưa có novel_title" });
    }
    
    if (!author.length) {
        return res.status(403).json({ error: "Truyện chưa có tác giả" });
    }

    if (!categories.length) {
        return res.status(403).json({ error: "Truyện chưa có thể loại" });
    }
    
    if (!description.length) {
        return res.status(403).json({ error: "Truyện chưa có tóm tắt" });
    }

    let novel_id = novel_title.replace(/[^a-zA-Z0-9]/g, ' ').replace(/\s+/g, "-").trim() + nanoid();

    const r16 = !!sensitive_content;

    let novel = new Novel({
        novel_id,
        novel_title, 
        other_name,
        sensitive_content: Boolean(sensitive_content),
        novel_banner,
        author,
        artist,
        type_of_novel,
        categories,
        description,
        note,
        status,
        // episode,
        publisher: publisherId,
        draft: Boolean(draft)
    })

    novel.save().then(novel => {
        let incrementValue = draft ? 0 : 1;

        User.findOneAndUpdate({ _id: publisherId }, { $inc: { "account_info.total_posts": incrementValue }, $push: { "novels": novel._id } })
        .then(user => {
            return res.status(200).json({ id: novel.novel_id });
        })
        .catch(err => {
            return res.status(500).json({ error: "Không thể cập nhật tổng số truyện đã đăng" });
        })
    })
    .catch(err => {
        return res.status(500).json({ error: err.message });
    })
})

server.listen(PORT, () => {
    console.log("listening on port " + PORT);
})