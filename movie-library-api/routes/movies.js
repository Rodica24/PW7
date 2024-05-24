const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const authMiddleware = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: Movie management endpoints
 */

/**
 * @swagger
 * /api/movies:
 *   get:
 *     tags: [Movies]
 *     summary: Get all movies with pagination
 *     parameters:
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *         description: Number of movies to skip
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Maximum number of movies to return
 *     responses:
 *       200:
 *         description: A list of movies
 *       500:
 *         description: Internal server error
 */
router.get('/', authMiddleware(['ADMIN', 'WRITER', 'VISITOR']), async (req, res) => {
  const { skip = 0, limit = 10 } = req.query;
  try {
    const movies = await Movie.find().skip(parseInt(skip)).limit(parseInt(limit));
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/movies:
 *   post:
 *     tags: [Movies]
 *     summary: Create a new movie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               genre:
 *                 type: string
 *               imageUrl:
 *                 type */

module.exports = router;