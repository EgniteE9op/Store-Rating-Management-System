const express = require("express");
const pool = require("../db");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// =========================================
// CREATE OR UPDATE RATING
// =========================================

router.post("/", authMiddleware, async (req, res) => {

    try {

        const { store_id, rating } = req.body;

        if (!store_id || !rating) {
            return res.status(400).json({
                message: "Store ID and Rating are required"
            });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({
                message: "Rating must be between 1 and 5"
            });
        }

        // Check whether user already rated this store
        const existingRating = await pool.query(
            `SELECT *
             FROM ratings
             WHERE user_id = $1
             AND store_id = $2`,
            [req.user.id, store_id]
        );

        // -------------------------
        // UPDATE EXISTING RATING
        // -------------------------
        if (existingRating.rows.length > 0) {

            const updatedRating = await pool.query(
                `UPDATE ratings
                 SET rating = $1,
                     updated_at = CURRENT_TIMESTAMP
                 WHERE user_id = $2
                 AND store_id = $3
                 RETURNING *`,
                [rating, req.user.id, store_id]
            );

            return res.json({
                message: "Rating updated successfully",
                rating: updatedRating.rows[0]
            });

        }

        // -------------------------
        // INSERT NEW RATING
        // -------------------------
        const newRating = await pool.query(
            `INSERT INTO ratings
            (user_id, store_id, rating)
            VALUES ($1, $2, $3)
            RETURNING *`,
            [req.user.id, store_id, rating]
        );

        res.status(201).json({
            message: "Rating submitted successfully",
            rating: newRating.rows[0]
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error"
        });

    }

});


// =========================================
// GET ALL RATINGS OF A STORE
// =========================================

router.get("/store/:storeId", async (req, res) => {

    try {

        const { storeId } = req.params;

        const result = await pool.query(
            `SELECT
                ratings.id,
                ratings.rating,
                ratings.user_id,
                users.name AS user_name,
                ratings.created_at,
                ratings.updated_at
             FROM ratings
             JOIN users
             ON ratings.user_id = users.id
             WHERE ratings.store_id = $1
             ORDER BY ratings.created_at DESC`,
            [storeId]
        );

        res.json({
            store_id: storeId,
            ratings: result.rows
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error"
        });

    }

});


// =========================================
// GET LOGGED-IN USER'S RATING FOR A STORE
// =========================================

router.get("/my-rating/:storeId", authMiddleware, async (req, res) => {

    try {

        const { storeId } = req.params;

        const result = await pool.query(
            `SELECT *
             FROM ratings
             WHERE user_id = $1
             AND store_id = $2`,
            [req.user.id, storeId]
        );

        if (result.rows.length === 0) {

            return res.json({
                rating: null
            });

        }

        res.json({
            rating: result.rows[0]
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error"
        });

    }

});


// =========================================
// UPDATE RATING BY ID
// =========================================

router.put("/:id", authMiddleware, async (req, res) => {

    try {

        const { id } = req.params;
        const { rating } = req.body;

        if (!rating) {
            return res.status(400).json({
                message: "Rating is required"
            });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({
                message: "Rating must be between 1 and 5"
            });
        }

        const result = await pool.query(
            `UPDATE ratings
             SET
                rating = $1,
                updated_at = CURRENT_TIMESTAMP
             WHERE id = $2
             AND user_id = $3
             RETURNING *`,
            [
                rating,
                id,
                req.user.id
            ]
        );

        if (result.rows.length === 0) {

            return res.status(404).json({
                message: "Rating not found"
            });

        }

        res.json({
            message: "Rating updated successfully",
            rating: result.rows[0]
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error"
        });

    }

});


// =========================================
// DELETE RATING
// =========================================

router.delete("/:id", authMiddleware, async (req, res) => {

    try {

        const { id } = req.params;

        const result = await pool.query(
            `DELETE FROM ratings
             WHERE id = $1
             AND user_id = $2
             RETURNING *`,
            [
                id,
                req.user.id
            ]
        );

        if (result.rows.length === 0) {

            return res.status(404).json({
                message: "Rating not found"
            });

        }

        res.json({
            message: "Rating deleted successfully",
            rating: result.rows[0]
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error"
        });

    }

});

router.get("/my", authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT
        ratings.id,
        ratings.rating,
        ratings.created_at,
        stores.id AS store_id,
        stores.name AS store_name,
        stores.address
      FROM ratings
      JOIN stores
      ON ratings.store_id = stores.id
      WHERE ratings.user_id = $1
      ORDER BY ratings.created_at DESC
      `,
      [req.user.id]
    );

    res.json({
      ratings: result.rows,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;