
const mongoose = require("mongoose")

const document = new mongoose.Schema({
    _id: String,
    data: Object,
    snapshot:String
})

module.exports= mongoose.model("documentModel", document)
