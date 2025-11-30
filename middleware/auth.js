module.exports = function (req, res, next) {

    console.log("===== AUTH DEBUG START =====");
    console.log("AUTH HEADER RECEIVED RAW:", req.headers);
    console.log("AUTH HEADER RECEIVED AUTH ONLY:", req.headers["authorization"]);
    console.log("===== AUTH DEBUG END =====");

    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ error: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Token missing" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: "Invalid or expired token" });
    }
};
