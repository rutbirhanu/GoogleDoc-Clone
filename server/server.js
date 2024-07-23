const express= require("express")
const mongoose = require("mongoose")
const { findOrCreateDoc } = require("./controller/docController")
const admin = require("firebase-admin")
const serviceAccount = require("./serviceAccountKey.json")
const userRouter = require("./route/userRoute")
const cors=require("cors")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const app = express()
app.use(cors())
app.use(express.json())
app.use("/user",userRouter )

mongoose.connect("mongodb://localhost:27017/google-docs")

const io = require("socket.io")(5000, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
})


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

app.listen(5001, () => {
    console.log("server started")
})