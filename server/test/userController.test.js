const chai = require("chai")
const expect = chai.expect
const should = chai.should()
const chaiHttp = require("chai-http")
const server= require("../server")
const userModel = require("../model/user")
chai.use(chaiHttp)

const { signIn, signUp, fetchUserInfo, verifyToken, signInWithGoogle } = require("../controller/userController")

describe("test user controller", () => {

    it("test user registration", (done)=> {
        chai.request(server).get("/user/signUp")
            .end(req, res => {
                res.shoud.have.status(200)
                done()
        })
    })
})