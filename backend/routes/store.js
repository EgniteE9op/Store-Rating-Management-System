const express = require("express");
const pool = require("../db");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// ===========================
// Create Store
// ===========================
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, email, address } = req.body;

    if (!name || !email || !address) {
      return res.status(400).json({
        message: "Name, email and address are required",
      });
    }

    const result = await pool.query(
      `INSERT INTO stores (name, email, address, owner_id)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name, email, address, req.user.id]
    );

    res.status(201).json({
      message: "Store created successfully",
      store: result.rows[0],
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});


// ===========================
// Get All Stores
// ===========================
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT
        s.id,
        s.name,
        s.email,
        s.address,
        COALESCE(ROUND(AVG(r.rating),1),0) AS average_rating,
        COUNT(r.id) AS total_ratings
      FROM stores s
      LEFT JOIN ratings r
      ON s.id = r.store_id
      GROUP BY
        s.id,
        s.name,
        s.email,
        s.address
      ORDER BY s.id
      `
    );

    res.json({
      stores: result.rows,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});


// ===========================
// Store Summary
// ===========================
router.get("/:id/summary", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      SELECT
        s.id,
        s.name,
        s.email,
        s.address,
        COALESCE(ROUND(AVG(r.rating),1),0) AS average_rating,
        COUNT(r.id) AS total_ratings
      FROM stores s
      LEFT JOIN ratings r
      ON s.id = r.store_id
      WHERE s.id = $1
      GROUP BY
        s.id,
        s.name,
        s.email,
        s.address
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Store not found",
      });
    }

    res.json({
      summary: result.rows[0],
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});


// ===========================
// Get Single Store + Ratings
// ===========================
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const storeResult = await pool.query(
      `
      SELECT
        s.id,
        s.name,
        s.email,
        s.address,
        COALESCE(ROUND(AVG(r.rating),1),0) AS average_rating,
        COUNT(r.id) AS total_ratings
      FROM stores s
      LEFT JOIN ratings r
      ON s.id = r.store_id
      WHERE s.id = $1
      GROUP BY
        s.id,
        s.name,
        s.email,
        s.address
      `,
      [id]
    );

    if (storeResult.rows.length === 0) {
      return res.status(404).json({
        message: "Store not found",
      });
    }

    const ratingsResult = await pool.query(
      `
      SELECT
        ratings.id,
        ratings.rating,
        users.name AS user_name,
        ratings.created_at
      FROM ratings
      JOIN users
      ON ratings.user_id = users.id
      WHERE ratings.store_id = $1
      ORDER BY ratings.created_at DESC
      `,
      [id]
    );

    res.json({
      store: storeResult.rows[0],
      ratings: ratingsResult.rows,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});


// ===========================
// Update Store
// ===========================
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, address } = req.body;

    if (!name || !email || !address) {
      return res.status(400).json({
        message: "Name, email and address are required",
      });
    }

    const result = await pool.query(
      `
      UPDATE stores
      SET
        name = $1,
        email = $2,
        address = $3,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $4
      RETURNING *
      `,
      [name, email, address, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Store not found",
      });
    }

    res.json({
      message: "Store updated successfully",
      store: result.rows[0],
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});


// ===========================
// Delete Store
// ===========================
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      DELETE FROM stores
      WHERE id = $1
      RETURNING *
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Store not found",
      });
    }

    res.json({
      message: "Store deleted successfully",
      store: result.rows[0],
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;