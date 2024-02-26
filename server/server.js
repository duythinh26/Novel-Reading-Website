import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import bcrypt from "bcrypt";
import User from "./Schema/User.js";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";

const server = express()
let PORT = 3000

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/; 

// Enable json sharing in order to accept the json data
server.use(express.json())

// Connect Mongoose to server
mongoose.connect(process.env.DB_LOCATION, {
    autoIndex: true
})

const formatDatatoSend = (user) => { 
    // Make an access token to verify user login
    const access_token = jwt.sign({ id: user._id }, process.env.SECRET_ACCESS_KEY)

    return {
        access_token,
        profile_img: user.personal_info.profile_img,
        username: user.personal_info.username
    }
}

// const generateUsername = async (email) => {
//     let username = email.split("@")[0]

//     let isUsernameNotUnique = await User.exists({ "personal_info.username": username}).then((result) => result)

//     isUsernameNotUnique ? username += nanoid().substring(0, 3) : ""
    
//     return username
// }

server.post("/signup", (req, res) => {
    let { username, email, password } = req.body

    // Validate data from front end 
    if (username.length < 3) {
        return res.status(403).json({ "error": "username must be at least 3 letters" }) //status using to throw a status code
    } 

    // Check user input email or not
    if (!email.length) {
        return res.status(403).json({ "error": "Enter an email" })
    }

    if (!emailRegex.test(email)) {
        return res.status(403).json({ "error": "Email is invalid" })
    }

    if (!passwordRegex.test(password)) {
        return res.status(403).json({ "error": "Password should be 8 to 20 characters and have at least one number, one uppercase letter and one lowercase letter" })
    }

    bcrypt.hash(password, 5, (err, hashed_password) => {    
        // let username = await generateUsername(email)
        
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
                    return res.status(500).json({ error: "Email already exists" });
                } 
                else if (duplicateKey === "personal_info.username") {
                    return res.status(500).json({ error: "Username already exists" });
                }
            }

            return res.status(500).json({ "error": err.message })
        }) 
    })
})

// Change this to make a login can use email or username
server.post("/signin", (req, res) => {
    let { email, password } = req.body

    // Try to find email that user input is exist or not
    User.findOne({ "personal_info.email": email}).then((user) => {
        // If not, return error email not found
        if (!user) {
            return res.status(403).json({ "error": "Email not found" })
        }
        
        bcrypt.compare(password, user.personal_info.password, (err, result) => {
            if (err) {
                return res.status(403).json({ "error": "Error occur while login, please try again" })
            }

            // If password is incorrect
            if (!result) {
                return res.status(403).json({ "error": "Incorrect password" })
            } else {
                return res.status(200).json(formatDatatoSend(user))
            }
        })
    })
    .catch(err => {
        console.log(err.message)
        return res.status(500).json({ "error": err.message })
    })
})

server.listen(PORT, () => {
    console.log("listening on port => " + PORT)
})