const mongoose = require("mongoose")
const userModel = require("../model/user")
const bcrypt = require("bcrypt")


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


module.exports= {signIn, signUp}