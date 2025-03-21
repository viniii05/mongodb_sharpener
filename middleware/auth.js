const jwt = require("jsonwebtoken");
const User = require("../models/User");
require('dotenv').config();

exports.isAuthenticated = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect("/login");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        const user = await User.findUserById(decoded.userId); 
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Authentication Error:", error);
        res.redirect("/login");
    }
};
