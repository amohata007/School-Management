const jwt = require("jsonwebtoken");

function authJWT(req, res, next) {
    const header = req.header("Authorization");

    // 1. Check header exists
    if (!header) {
        return res.status(401).json({
            status: "N",
            message: "Authorization header missing"
        });
    }

    // 2. Extract token safely
    const parts = header.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return res.status(401).json({
            status: "N",
            message: "Invalid Authorization format"
        });
    }

    const token = parts[1];

    // 3. Verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded; // attach user info
        next();

    } catch (err) {

        // 4. Handle JWT specific errors
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({
                status: "N",
                message: "Token expired, please login again"
            });
        }

        if (err.name === "JsonWebTokenError") {
            return res.status(401).json({
                status: "N",
                message: "Invalid token"
            });
        }

        // 5. Fallback error
        return res.status(500).json({
            status: "N",
            message: "Internal server error"
        });
    }
}

module.exports = authJWT;