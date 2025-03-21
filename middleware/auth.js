const jwt = require("jsonwebtoken");
const User = require("../models/User");
require('dotenv').config();

exports.isAuthenticated = async (req, res, next) => {
    const token = req.cookies.token; // Get token from cookies

    if (!token) {
        return res.redirect("/login"); // Redirect to login if no token
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify JWT
        const user = await User.findUserById(decoded.userId); // Fetch user from DB
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user; // ✅ Attach full user object to req.user
        next(); // Proceed to next middleware
    } catch (error) {
        console.error("Authentication Error:", error);
        res.redirect("/login"); // Redirect on failure
    }
};
