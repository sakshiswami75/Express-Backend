const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        if (!authorization) {
            return res.status(401).json({ message: "Unauthorized user. No token provided." });
        }

        const token = authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Invalid token format." });
        }

        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data;
        next();

    } catch (err) {
        return res.status(401).json({ 
            message: "Unauthorized user. Invalid or expired token." 
        });
    }
};

module.exports = authMiddleware;
