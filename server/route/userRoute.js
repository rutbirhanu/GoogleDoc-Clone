const express= require("express")
const router = express.Router() 
const { signIn, signUp, signInWithGoogle}= require("../controller/userController")
const verifyGoogleToken= require("../middleware/verifyGoogleToken")

router.route("/signUp").post(signUp)
router.route("/signIn").post(signIn)
router.route("/signWithGoogle").post(verifyGoogleToken, signInWithGoogle)

module.exports=router