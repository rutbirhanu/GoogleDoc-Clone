const documentModel = require("../model/document")
const crypto = require("crypto");


const defaultValue = ""

const findOrCreateDoc = async (id) => {
    if (id == null) return
    const doc = await documentModel.findById({_id:id})
    if (doc) {
        return doc
    }
    return await documentModel.create({ _id: id, data: defaultValue })
}



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

const findDoc = async (id) => {
    try {
        const doc = await documentModel.findById({ _id: id })
        res.status(200).json(doc)
    }
    catch (err) {
        res.status(500).json(err)
        
    }
}

const updateDoc = async (id, docData) => {
    try {
        await documentModel.findByIdAndUpdate(id, {data:docData })
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


module.exports = {findOrCreateDoc, findDoc, createDoc, updateDoc, deleteDoc}