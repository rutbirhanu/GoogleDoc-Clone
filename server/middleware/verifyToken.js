const jwt = require("jsonwebtoken")
require("dotenv").config()

const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json("unauthorized")
        }
        const decodedJwt = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json("unauthorized")
            }
            req.user = decoded.payload
            next()
        })
    }
    catch (err) {
        return res.status(500).json(err)
    }
}

module.exports = verifyToken