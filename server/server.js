const express = require("express")
const mongoose = require("mongoose")
const { findOrCreateDoc } = require("./controller/docController")
const admin = require("firebase-admin")
const serviceAccount = require("./serviceAccountKey.json")
const cookieParser = require("cookie-parser")
const userRouter = require("./route/userRoute")
const docRouter = require("./route/docRoute")
const cors = require("cors")
const documentModel = require("./model/document")
const fs = require('fs');
const path = require('path');
const bodyParser = require("body-parser")


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const app = express()

const corsOptions = {
    origin: 'http://localhost:5173', // Set the specific origin of your frontend application
    methods: 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));
app.use(express.json())
app.use(cookieParser());
app.use("/user", userRouter)
app.use("/doc", docRouter)
app.use('/previews', express.static(path.join(__dirname, 'previews')));

const multer = require("multer")

const upload = multer({ dest: 'previews/' }); // Temporary directory

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
                await documentModel.findByIdAndUpdate(documentId, { data: docData })

            } catch (err) {
                console.error('Error updating document:', err);
            }
        })

    })

    console.log("connected")
})

app.post('/api/documents/:id/preview', upload.single('file'), (req, res) => {
    const { id } = req.params;
    const file = req.file;

    if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const previewPath = path.join(__dirname, 'previews', `${id}.png`);

    fs.rename(file.path, previewPath, (err) => {
        if (err) {
            console.error('Failed to save image', err);
            return res.status(500).json({ message: 'Failed to save image' });
        }

        res.status(200).json({ message: 'Preview saved' });
    });
});

app.listen(5001, () => {
    console.log("server started")
})