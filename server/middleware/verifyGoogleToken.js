const admin = require("firebase-admin")

const verifyGoogleToken = async (req, res, next) => {
    try {
        const idToken = req.headers.authorization
    
        if (!idToken) {
            res.status(401).json("Unauthorized")
        }
        const decodedJwt = await admin.auth().verifyIdToken(idToken)
        req.user = decodedJwt
        next()
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
    
}

module.exports= verifyGoogleToken
