const express= require("express")
const router = express.Router()
const {findOrCreateDoc, findDoc, createDoc, updateDoc, deleteDoc, findAllDoc} = require("../controller/docController")
const verifyToken = require("../middleware/verifyToken")


router.route("/get_all").get(verifyToken, findAllDoc)
router.route("/update_doc").patch(verifyToken,updateDoc)
router.route("/delete_doc").delete(verifyToken , deleteDoc)
router.route("/get_doc:id").get(verifyToken , findOrCreateDoc)


module.exports= router