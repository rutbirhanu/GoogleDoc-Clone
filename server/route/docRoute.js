const express= require("express")
const router = express.Router()
const {findAllDoc} = require("../controller/docController")

router.route("/get_all").get(findAllDoc)


module.exports= router