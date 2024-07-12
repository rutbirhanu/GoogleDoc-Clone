const documentModel = require("./document.js")

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
        
    }
    catch (err) {
        res.status(500).json(err)
    }
}

module.exports = {findOrCreateDoc}