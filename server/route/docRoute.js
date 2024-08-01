const express= require("express")
const router = express.Router()
const {findDoc} = require("../controller/docController")

router.route.get(findDoc)


module.exports= router