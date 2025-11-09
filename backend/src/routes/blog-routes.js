import express from 'express';
import {
  getAllBlogs,
  getBlogByIdentifier,
  createBlog,
  updateBlog,
  deleteBlog,
  getAllSlugs,
} from '../controllers/blog-controller.js';
import { createBlogValidation, updateBlogValidation } from '../validators/blog-validator.js';
import { validate } from '../middlewares/validate.js';

const router = express.Router();

// Get all slugs (must be before /:identifier to avoid route conflict)
router.get('/slugs/all', getAllSlugs);

// Get all blogs
router.get('/', getAllBlogs);

// Get single blog by slug or ID
router.get('/:identifier', getBlogByIdentifier);

// Create new blog
router.post('/', createBlogValidation, validate, createBlog);

// Update blog
router.put('/:id', updateBlogValidation, validate, updateBlog);

// Delete blog
router.delete('/:id', deleteBlog);

export default router;
