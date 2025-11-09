import prisma from '../libs/prisma.js';
import { asyncHandler } from '../middlewares/error-handler.js';

// @desc    Get all ratings for a blog
// @route   GET /api/ratings/blog/:blogId
// @access  Public
export const getRatingsByBlogId = asyncHandler(async (req, res) => {
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

  const [ratings, totalCount] = await Promise.all([
    prisma.rating.findMany({
      where: { blogId },
      skip,
      take,
      orderBy: {
        [sortBy]: order,
      },
    }),
    prisma.rating.count({
      where: { blogId },
    }),
  ]);

  // Calculate average rating
  const averageRating = ratings.length > 0
    ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
    : 0;

  // Calculate rating distribution
  const distribution = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  ratings.forEach(r => {
    distribution[r.rating]++;
  });

  res.json({
    success: true,
    data: ratings,
    stats: {
      averageRating: parseFloat(averageRating.toFixed(1)),
      totalRatings: totalCount,
      distribution,
    },
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(totalCount / take),
      totalCount,
    },
  });
});

// @desc    Get single rating by ID
// @route   GET /api/ratings/:id
// @access  Public
export const getRatingById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const rating = await prisma.rating.findUnique({
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

  if (!rating) {
    return res.status(404).json({
      success: false,
      error: 'Rating not found',
    });
  }

  res.json({
    success: true,
    data: rating,
  });
});

// @desc    Create new rating
// @route   POST /api/ratings
// @access  Public
export const createRating = asyncHandler(async (req, res) => {
  const { author, rating, review, blogId } = req.body;

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

  const newRating = await prisma.rating.create({
    data: {
      author,
      rating,
      review,
      blogId,
    },
  });

  res.status(201).json({
    success: true,
    data: newRating,
    message: 'Rating submitted successfully',
  });
});

// @desc    Update rating
// @route   PUT /api/ratings/:id
// @access  Public (should be protected in production)
export const updateRating = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { author, rating, review } = req.body;

  const updateData = {};
  if (author) updateData.author = author;
  if (rating) updateData.rating = rating;
  if (review !== undefined) updateData.review = review;

  const updatedRating = await prisma.rating.update({
    where: { id },
    data: updateData,
  });

  res.json({
    success: true,
    data: updatedRating,
    message: 'Rating updated successfully',
  });
});

// @desc    Delete rating
// @route   DELETE /api/ratings/:id
// @access  Public (should be protected in production)
export const deleteRating = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await prisma.rating.delete({
    where: { id },
  });

  res.json({
    success: true,
    message: 'Rating deleted successfully',
  });
});

// @desc    Get average rating for a blog
// @route   GET /api/ratings/blog/:blogId/average
// @access  Public
export const getAverageRating = asyncHandler(async (req, res) => {
  const { blogId } = req.params;

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

  const ratings = await prisma.rating.findMany({
    where: { blogId },
    select: { rating: true },
  });

  const averageRating = ratings.length > 0
    ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
    : 0;

  res.json({
    success: true,
    data: {
      blogId,
      averageRating: parseFloat(averageRating.toFixed(1)),
      totalRatings: ratings.length,
    },
  });
});
