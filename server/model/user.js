const mongoose = require("mongoose")

const user = mongoose.Schema({
    userName: String,
    password: String,
    email: String,
})

module.exports = mongoose.model("userModel", user) 