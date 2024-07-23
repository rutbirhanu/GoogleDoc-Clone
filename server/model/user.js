const mongoose = require("mongoose")

const user = mongoose.Schema({
    firstName: String,
    lastName: String,
    password: String,
    email: String,
})

module.exports = mongoose.model("userModel", user) 