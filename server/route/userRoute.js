const express= require("express")
const router = express.Router() 
const {verifyToken, signIn, signUp, fetchUserInfo,  signInWithGoogle}= require("../controller/userController")

router.route("/signUp").post()
router.route("/signWithGoogle").post(verifyToken, signInWithGoogle)

module.exports=router