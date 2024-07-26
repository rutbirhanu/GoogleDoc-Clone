const mongoose = require("mongoose")
const userModel = require("../model/user")
const bcrypt = require("bcrypt")
const admin = require("firebase-admin")
const nodemailer = require("nodemailer")
require("dotenv").config()
const jwt= require("jsonwebtoken")


const signUp = async (req,res) => {
    try {
        const { firstName,lastName, email, password, sendEmail } = req.body
        const hashed=await bcrypt.hash(password, 10)
        const user = await userModel.create({ password: hashed,firstName, lastName, email,sendEmail })
        res.status(202).json("User registered succuessfully")
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}


const signIn = async (req, res) => {
    try {
        const { userName, password } = req.body
        const user = await userModel.find({ userName: userName })
        if (!user) {
            return res.status(404).json("user is not found")
        }
        const compare = bcrypt.compare(password, user.password)
        if (compare == false) {
            return res.status(401).json("login failed")
        }
        const token = jwt.sign({
            payload: {
                userId: user._id
            }
        }, process.env.JWT_SECRET, {expiresIn:'10d'}
        )
        res.status(200).json({ token,message:"login successfully"})
        
    }
    catch (err) {
        res.status(500).json(err)
    }
}

const signInWithGoogle = async (req, res) => {
    try { 
        const { name, email } = req.user
        let user = await userModel.findOne({email:email})
        if (!user) {
           user= await userModel.create({ email:email, firstName:name, sendEmail:true})
        }
        res.status(200).json(user)
    }
    catch (err) {
        console.log(err)
        res.status(400).json("error loading google account")
    }
}

const fetchUserInfo = async () => {
    try {
        
    }
    catch (err) {
        
    }

}

const transporter = nodemailer.createTransport({
   service:"gmail",
    auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.APP_PASSWORD
    }
})

const sendEmailFunction = async (req, res) => {
    try {
        const uid  = "1234567"
        const user = await userModel.findById(uid)
        if (!user) {
            console.log("user not found")
            return
            // return res.status(404).json("user not found")
        }
        if (user.sendEmail === false)
        { return }
        
     transporter.sendMail({
            from: "Google Clone Team",
            to: user.email,
            subject: "Thanks for subscribing to Google clone",
            text:"We are happy that You subscribe to Google clone so we will send You important emails "
    }, function (error, info) {
        if (error) {
            console.log(error)
            return 
            // return res.status(400).json(error)
        } else {
            console.log(info.response)
        }
     })
        
     }
    catch (err) {
        console.log(err)
        // res.status(400).json(err)
    }
}

module.exports= {signIn, signUp, fetchUserInfo, signInWithGoogle}