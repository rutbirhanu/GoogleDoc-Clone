const express= require("express")
const mongoose = require("mongoose")
const {findOrCreateDoc} = require("./controller/docController")

const app=express()

mongoose.connect("mongodb://localhost:27017/google-docs")

const io = require("socket.io")(5000, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
})

const defaultValue = ""

io.on("connection", socket => {

    socket.on("get-document", async documentId => {
        const document = await findOrCreateDoc(documentId)

        socket.join(documentId)
        socket.emit("load-document", document.data)
        socket.on("emit-changes", delta => {
            socket.broadcast.to(documentId).emit("recieve-changes", delta)
        })

        socket.on("save-doc", async docData => {
            try {
            await documentModel.findByIdAndUpdate(documentId, {data:docData })

            } catch (err) {
                console.error('Error updating document:', err);
            }
        })

    })

    console.log("connected")
})

