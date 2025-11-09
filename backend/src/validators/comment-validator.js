import { body, param } from 'express-validator';

export const createCommentValidation = [
  body('author')
    .trim()
    .notEmpty()
    .withMessage('Author name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Author name must be between 2 and 100 characters'),
  body('comment')
    .trim()
    .notEmpty()
    .withMessage('Comment is required')
    .isLength({ min: 1, max: 1000 })
    .withMessage('Comment must be between 1 and 1000 characters'),
  body('blogId')
    .notEmpty()
    .withMessage('Blog ID is required')
    .isUUID()
    .withMessage('Invalid blog ID format'),
];

export const getBlogCommentsValidation = [
  param('blogId')
    .notEmpty()
    .withMessage('Blog ID is required'),
];
