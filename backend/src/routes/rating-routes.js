import express from 'express';
import {
  getRatingsByBlogId,
  getRatingById,
  createRating,
  updateRating,
  deleteRating,
  getAverageRating,
} from '../controllers/rating-controller.js';
import { createRatingValidation, getBlogRatingsValidation } from '../validators/rating-validator.js';
import { validate } from '../middlewares/validate.js';

const router = express.Router();

// Get average rating for a blog (must be before /:blogId route)
router.get('/blog/:blogId/average', getBlogRatingsValidation, validate, getAverageRating);

// Get all ratings for a blog
router.get('/blog/:blogId', getBlogRatingsValidation, validate, getRatingsByBlogId);

// Get single rating
router.get('/:id', getRatingById);

// Create new rating
router.post('/', createRatingValidation, validate, createRating);

// Update rating
router.put('/:id', updateRating);

// Delete rating
router.delete('/:id', deleteRating);

export default router;
