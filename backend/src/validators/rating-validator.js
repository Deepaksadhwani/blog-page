import { body, param } from 'express-validator';

export const createRatingValidation = [
  body('author')
    .trim()
    .notEmpty()
    .withMessage('Author name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Author name must be between 2 and 100 characters'),
  body('rating')
    .notEmpty()
    .withMessage('Rating is required')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be an integer between 1 and 5'),
  body('review')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Review must not exceed 1000 characters'),
  body('blogId')
    .notEmpty()
    .withMessage('Blog ID is required')
    .isUUID()
    .withMessage('Invalid blog ID format'),
];

export const getBlogRatingsValidation = [
  param('blogId')
    .notEmpty()
    .withMessage('Blog ID is required'),
];
