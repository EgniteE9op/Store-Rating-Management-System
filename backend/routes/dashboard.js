const express = require("express");
const pool = require("../db");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Dashboard Statistics
router.get("/stats", authMiddleware, async (req, res) => {
  try {
    // Total Stores
    const storesResult = await pool.query(`
      SELECT COUNT(*) AS total_stores
      FROM stores
    `);

    // Ratings given by logged-in user
    const myRatingsResult = await pool.query(
      `
      SELECT COUNT(*) AS my_ratings
      FROM ratings
      WHERE user_id = $1
      `,
      [req.user.id]
    );

    // Total Ratings in the system
    const totalRatingsResult = await pool.query(`
      SELECT COUNT(*) AS total_ratings
      FROM ratings
    `);

    res.status(200).json({
      totalStores: parseInt(storesResult.rows[0].total_stores),
      myRatings: parseInt(myRatingsResult.rows[0].my_ratings),
      totalRatings: parseInt(totalRatingsResult.rows[0].total_ratings),
    });

  } catch (error) {
    console.error("Dashboard Stats Error:", error);

    res.status(500).json({
      message: "Failed to fetch dashboard statistics",
    });
  }
});

module.exports = router;