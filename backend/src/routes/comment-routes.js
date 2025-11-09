import express from 'express';
import {
  getCommentsByBlogId,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
} from '../controllers/comment-controller.js';
import { createCommentValidation, getBlogCommentsValidation } from '../validators/comment-validator.js';
import { validate } from '../middlewares/validate.js';

const router = express.Router();

// Get all comments for a blog
router.get('/blog/:blogId', getBlogCommentsValidation, validate, getCommentsByBlogId);

// Get single comment
router.get('/:id', getCommentById);

// Create new comment
router.post('/', createCommentValidation, validate, createComment);

// Update comment
router.put('/:id', updateComment);

// Delete comment
router.delete('/:id', deleteComment);

export default router;
