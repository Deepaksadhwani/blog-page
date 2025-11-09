import prisma from '../libs/prisma.js';
import { asyncHandler } from '../middlewares/error-handler.js';

// @desc    Get all comments for a blog
// @route   GET /api/comments/blog/:blogId
// @access  Public
export const getCommentsByBlogId = asyncHandler(async (req, res) => {
  const { blogId } = req.params;
  const { page = 1, limit = 20, sortBy = 'date', order = 'desc' } = req.query;

  // Check if blog exists
  const blog = await prisma.blog.findUnique({
    where: { id: blogId },
  });

  if (!blog) {
    return res.status(404).json({
      success: false,
      error: 'Blog not found',
    });
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);
  const take = parseInt(limit);

  const [comments, totalCount] = await Promise.all([
    prisma.comment.findMany({
      where: { blogId },
      skip,
      take,
      orderBy: {
        [sortBy]: order,
      },
    }),
    prisma.comment.count({
      where: { blogId },
    }),
  ]);

  res.json({
    success: true,
    data: comments,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(totalCount / take),
      totalCount,
    },
  });
});

// @desc    Get single comment by ID
// @route   GET /api/comments/:id
// @access  Public
export const getCommentById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const comment = await prisma.comment.findUnique({
    where: { id },
    include: {
      blog: {
        select: {
          id: true,
          title: true,
          slug: true,
        },
      },
    },
  });

  if (!comment) {
    return res.status(404).json({
      success: false,
      error: 'Comment not found',
    });
  }

  res.json({
    success: true,
    data: comment,
  });
});

// @desc    Create new comment
// @route   POST /api/comments
// @access  Public
export const createComment = asyncHandler(async (req, res) => {
  const { author, comment, blogId } = req.body;

  // Check if blog exists
  const blog = await prisma.blog.findUnique({
    where: { id: blogId },
  });

  if (!blog) {
    return res.status(404).json({
      success: false,
      error: 'Blog not found',
    });
  }

  const newComment = await prisma.comment.create({
    data: {
      author,
      comment,
      blogId,
    },
  });

  res.status(201).json({
    success: true,
    data: newComment,
    message: 'Comment added successfully',
  });
});

// @desc    Update comment
// @route   PUT /api/comments/:id
// @access  Public (should be protected in production)
export const updateComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { author, comment } = req.body;

  const updateData = {};
  if (author) updateData.author = author;
  if (comment) updateData.comment = comment;

  const updatedComment = await prisma.comment.update({
    where: { id },
    data: updateData,
  });

  res.json({
    success: true,
    data: updatedComment,
    message: 'Comment updated successfully',
  });
});

// @desc    Delete comment
// @route   DELETE /api/comments/:id
// @access  Public (should be protected in production)
export const deleteComment = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await prisma.comment.delete({
    where: { id },
  });

  res.json({
    success: true,
    message: 'Comment deleted successfully',
  });
});
