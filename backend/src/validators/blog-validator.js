import { body } from 'express-validator';

export const createBlogValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 3, max: 200 })
    .withMessage('Title must be between 3 and 200 characters'),
  body('body')
    .trim()
    .notEmpty()
    .withMessage('Body is required')
    .isLength({ min: 10 })
    .withMessage('Body must be at least 10 characters long'),
  body('date')
    .optional()
    .isISO8601()
    .withMessage('Invalid date format'),
];

export const updateBlogValidation = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage('Title must be between 3 and 200 characters'),
  body('body')
    .optional()
    .trim()
    .isLength({ min: 10 })
    .withMessage('Body must be at least 10 characters long'),
  body('date')
    .optional()
    .isISO8601()
    .withMessage('Invalid date format'),
];
