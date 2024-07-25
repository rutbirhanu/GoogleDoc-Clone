const chai = require("chai")
const expect = chai.expect
const userModel= require("../model/user")
const { signIn, signUp, fetchUserInfo, verifyToken, signInWithGoogle } = require("../controller/userController")

describe("testing if signIn function register user", () => {
    const user = userModel({ firstName: "ruth", lastName: "birhanu", email: "bir@gmail.com", password: "123" })
    user.
})