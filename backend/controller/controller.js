const model = require("../model/model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

async function signup(req, res) {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400).json({ success: false, error: "invalid input" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = model.createUser(username, email, hashedPassword);

    if (result.success) {
        res.status(201).json({ success: true, message: "User created successfully", user: result.data });
    } else {
        res.status(500).json({ success: false, error: "Internal server erorr" });
    }
}

async function login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ success: false, error: "invalid input" });
    }

    const row = model.getUserData(email);
    if (row.length > 0) {
        const match = await bcrypt.compare(password, row[0].user_password);
        
        if (email === row[0].user_email && match) {
            const user = row[0];
            const token = jwt.sign(user, process.env.JWT_SECRET, {expiresIn: "1h"});
            res.status(200).json({ success: true, message: "Login successfully",token, user});
        } else {
            res.status(401).json({ success: false, error: "Invalid email or password"});
        }
    } else {
        res.status(500).json({ success: false, error: "Internal server error"});
    }
}

module.exports = {
    signup,
    login
}