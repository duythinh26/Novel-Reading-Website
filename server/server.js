import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import cors from "cors"

import User from "./Schema/User.js";

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

const formatDatatoSend = (user) => { 
    // Make an access token to verify user login
    const access_token = jwt.sign({ id: user._id }, process.env.SECRET_ACCESS_KEY);

    return {
        access_token,
        profile_img: user.personal_info.profile_img,
        username: user.personal_info.username
    }
}

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
            console.log("Finish format data")
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

server.listen(PORT, () => {
    console.log("listening on port " + PORT);
})