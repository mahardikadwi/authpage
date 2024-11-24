import jwt from "jsonwebtoken";

const AuthMiddleware = (req, res, next) => {
    const token = req.cookies?.token;

    if(!token) {
        return res.status(401).json({ message: "You must login" });
    };

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userId = decoded.userId;
        next()
    } catch (error) {
        return res.status(401).json({ message: "invalid or expired token" });
    }
};

export default AuthMiddleware