const documentModel = require("../model/document")
const crypto = require("crypto");
const { createCanvas } = require('canvas');
const path = require('path');
const fs = require('fs');

const defaultValue = ""

const createDoc = async () => {

    try {
        let uuid = crypto.randomUUID();
        const doc = await documentModel.create({ _id: uuid, data: defaultValue })
        res.status(201).json(doc)
    }
    catch (err) {
        res.status(500).json(err)
    }
}



const findOrCreateDoc = async (id) => {
    if (id == null) return
    const doc = await documentModel.findById({ _id: id })
    if (doc) {
        return doc
    }
    return await documentModel.create({ _id: id, data: defaultValue })

}


const findDoc = async (id) => {
    try {
        const doc = await documentModel.findById({ _id: id })
        const previewPath = await generatePreview(doc.data, documentId);
        console.log(previewPath)
        res.status(200).json({ doc, previewPath })
    }
    catch (err) {
        res.status(500).json(err)

    }
}

const findAllDoc = async (req, res) => {
    try {
        const docs = await documentModel.find()
        let imgFiles;
        const previewDir = path.join(__dirname, "..", "previews")
        try {
            const files = await fs.promises.readdir(previewDir);
            // Filter for .png files
            imgFiles = files.filter(file => path.extname(file).toLowerCase() === ".png");
        }
        catch (dirError) {
            console.log(dirError)
            res.status(404).json("preview files doesn't exist")
        }
        const docWithImg = docs.map(doc => ({
            ...doc.toObject(),
            "image":`previews/${doc._id}.png`
        }))
        res.status(200).json(docWithImg)
    }
    catch (err) {
        console.log(err)
        res.status(500).json("error occurred")
    }
} 

const updateDoc = async (id, docData) => {
    try {
        await documentModel.findByIdAndUpdate(id, { data: docData })
        res.status(200).json("updated")
    }
    catch (err) {
        res.status(500).json(err)
    }
}

const deleteDoc = async (id) => {
    try {
        await documentModel.findByIdAndDelete(id)
        res.status(200).json("deleted")
    }
    catch (err) {
        res.status(500).json(err)
    }
}



module.exports = { findOrCreateDoc, findDoc, createDoc, updateDoc, deleteDoc, findAllDoc}