const jwt = require("jsonwebtoken");

function authJWT(req, res, next) {
    const header = req.header("Authorization");
    console.log(header);
    const getToken = header && header.split(" ")[1];
    if (!getToken) {
        return res.status(401).json({ status: "N", message: "Token Expired!! Please login again" })
    }
    try {
        const decoded = jwt.verify(getToken, process.env.JWT_SECRET);
        console.log(decoded);
        req.user = decoded;
        next();
    }
    catch (err) {
        return res.status(500).json({ status: "N", message: "Something went wrong..!!" })
    }
}

module.exports = authJWT;