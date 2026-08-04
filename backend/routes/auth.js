const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// =========================
// Signup
// =========================

router.post("/signup", async (req, res) => {
    try {

        const { name, email, address, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            `INSERT INTO users (name, email, password, address, role)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING id, name, email, address, role`,
            [name, email, hashedPassword, address, "USER"]
        );

        res.status(201).json({
            message: "User registered successfully",
            user: result.rows[0]
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error"
        });

    }
});


// =========================
// Login
// =========================

router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const user = result.rows[0];

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                address: user.address,
                role: user.role
            }
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error"
        });

    }

});


// =========================
// Get Profile
// =========================

router.get("/profile", authMiddleware, async (req, res) => {

    try {

        const result = await pool.query(
            `SELECT
                id,
                name,
                email,
                address,
                role
             FROM users
             WHERE id = $1`,
            [req.user.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json(result.rows[0]);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error"
        });

    }

});


// =========================
// Update Profile
// =========================

router.put("/profile", authMiddleware, async (req, res) => {

    try {

        const { name, email, address } = req.body;

        if (!name || !email || !address) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const result = await pool.query(
            `UPDATE users
             SET
                name = $1,
                email = $2,
                address = $3
             WHERE id = $4
             RETURNING
                id,
                name,
                email,
                address,
                role`,
            [
                name,
                email,
                address,
                req.user.id
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json({
            message: "Profile updated successfully",
            user: result.rows[0]
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error"
        });

    }

});


module.exports = router;