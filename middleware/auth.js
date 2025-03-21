const jwt = require("jsonwebtoken");
require('dotenv').config();

exports.isAuthenticated = (req, res, next) => {
    const token = req.cookies.token; // Get token from cookies

    if (!token) {
        return res.redirect("/login"); // Redirect to login if no token
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify JWT
        req.user = decoded; // Store user data in request
        next(); // Proceed to next middleware
    } catch (error) {
        console.error("Authentication Error:", error);
        res.redirect("/login"); // Redirect on failure
    }
};
