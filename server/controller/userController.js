const mongoose = require("mongoose")
const userModel = require("../model/user")
const bcrypt = require("bcrypt")
const admin = require("firebase-admin")

const signUp = async () => {
    try {
        const { userName, email, password } = req.body
        const hashed= bcrypt.hash(password, 10)
        const user = await userModel.create({ password: hashed, email, userName })
        res.status(202).json("User registered succuessfully")
    }
    catch (err) {
        res.status(500).json(err)
    }
}


const signIn = async () => {
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
        res.status(200).json("login successfully")
        
    }
    catch (err) {
        res.status(500).json(err)
        
    }
}

const verifyToken = async (req, res, next) => {
    try {
        const idToken = req.headers.authorization
    
        if (!idToken) {
            res.status(401).json("Unauthorized")
        }
        const decodedJwt = await admin.auth().verifyIdToken(idToken)
        req.user = decodedJwt
        next()
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
    
}

const signInWithGoogle = async (req, res) => {
    try { 
        const { uid, name, email } = req.user
        let user = await userModel.findById(uid)
        if (!user) {
           user= await userModel.create({_id:uid, email:email, firstName:name, sendEmail:true})
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

const sendEmail = async (req, res) => {
    try {
        const { uid } = req.user
        const user = await userModel.findById(uid)
        if (!user) {
            return res.status(404).json("user not found")
        }
        if (user.sendEmail === false)
        { return }
        

     }
    catch (err) {
        res.status(400).json(err)
    }
}

module.exports= {signIn, signUp, fetchUserInfo, verifyToken, signInWithGoogle}