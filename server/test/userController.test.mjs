import app from '../server.js';
import mongoose from 'mongoose';
import { use, expect, should } from 'chai'
import chaiHttp from 'chai-http';
import connectDB from "../config/dbConfig.js"
const chai = use(chaiHttp);
should()


describe("test user controller", () => {
    before(async() =>{
    
       await connectDB("mongodb://localhost:27017/test_connection")
        })

    after(async() => {
        await mongoose.connection.close();
    })

    describe("test registration endpoint", () => {
        let user = {
            "firstName": "ruth",
            "lastName": "birhanu",
            "email": "birha@gmail.com",
            "password": "yes",
            "sendEmail": true
        }
        it("post new user", () => {
            chai.request.execute(app)
                .post("/user/signUp")
                .send(user)
                .end((err, res) => {
                    if (err) {
                        return ;
                    }
                    expect(res).to.have.status(201)
                })
        })

        it("return error message when email duplication happends", () => {
            chai.request.execute(app)
                .post("/user/signup")
                .send(user)
            end((err, res) => {
                if (err) {
                    expect(res).to.have.status(409)
                    expect(res.body).to.include("email already exist")
                }
               
                })

        })

        it("fetch users data", () => {
            chai.request.execute(app)
                .get("/doc/get_all")
                .end((err, res) => {
                    if (err) {
                        expect(res.to.have.status(500))
                        return 
                    }
                expect(res).to.have.status(200)
            })
        })
    })
})