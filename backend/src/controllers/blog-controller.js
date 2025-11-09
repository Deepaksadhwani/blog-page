import prisma from '../libs/prisma.js';
import { asyncHandler } from '../middlewares/error-handler.js';

// Helper function to create slug from title
const createSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
export const getAllBlogs = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, sortBy = 'date', order = 'desc' } = req.query;
  
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const take = parseInt(limit);

  const [blogs, totalCount] = await Promise.all([
    prisma.blog.findMany({
      skip,
      take,
      orderBy: {
        [sortBy]: order,
      },
      include: {
        _count: {
          select: {
            comments: true,
            ratings: true,
          },
        },
      },
    }),
    prisma.blog.count(),
  ]);

  // Calculate average rating for each blog
  const blogsWithRatings = await Promise.all(
    blogs.map(async (blog) => {
      const ratings = await prisma.rating.findMany({
        where: { blogId: blog.id },
        select: { rating: true },
      });

      const averageRating = ratings.length > 0
        ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
        : 0;

      return {
        ...blog,
        averageRating: parseFloat(averageRating.toFixed(1)),
        commentCount: blog._count.comments,
        ratingCount: blog._count.ratings,
        _count: undefined,
      };
    })
  );

  res.json({
    success: true,
    data: blogsWithRatings,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(totalCount / take),
      totalCount,
    },
  });
});

// @desc    Get single blog by slug or ID
// @route   GET /api/blogs/:identifier
// @access  Public
export const getBlogByIdentifier = asyncHandler(async (req, res) => {
  const { identifier } = req.params;

  const blog = await prisma.blog.findFirst({
    where: {
      OR: [
        { id: identifier },
        { slug: identifier },
      ],
    },
    include: {
      comments: {
        orderBy: {
          date: 'desc',
        },
      },
      ratings: {
        orderBy: {
          date: 'desc',
        },
      },
    },
  });

  if (!blog) {
    return res.status(404).json({
      success: false,
      error: 'Blog not found',
    });
  }

  // Calculate average rating
  const averageRating = blog.ratings.length > 0
    ? blog.ratings.reduce((sum, r) => sum + r.rating, 0) / blog.ratings.length
    : 0;

  res.json({
    success: true,
    data: {
      ...blog,
      averageRating: parseFloat(averageRating.toFixed(1)),
      commentCount: blog.comments.length,
      ratingCount: blog.ratings.length,
    },
  });
});

// @desc    Create new blog
// @route   POST /api/blogs
// @access  Public (should be protected in production)
export const createBlog = asyncHandler(async (req, res) => {
  const { title, body, date } = req.body;

  let slug = createSlug(title);
  
  // Ensure slug is unique
  let slugExists = await prisma.blog.findUnique({ where: { slug } });
  let counter = 1;
  
  while (slugExists) {
    slug = `${createSlug(title)}-${counter}`;
    slugExists = await prisma.blog.findUnique({ where: { slug } });
    counter++;
  }

  const blog = await prisma.blog.create({
    data: {
      title,
      body,
      slug,
      ...(date && { date: new Date(date) }),
    },
  });

  res.status(201).json({
    success: true,
    data: blog,
    message: 'Blog created successfully',
  });
});

// @desc    Update blog
// @route   PUT /api/blogs/:id
// @access  Public (should be protected in production)
export const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, body, date } = req.body;

  const updateData = {};
  
  if (title) {
    updateData.title = title;
    
    // Update slug if title changed
    let slug = createSlug(title);
    let slugExists = await prisma.blog.findFirst({ 
      where: { 
        slug,
        NOT: { id }
      } 
    });
    let counter = 1;
    
    while (slugExists) {
      slug = `${createSlug(title)}-${counter}`;
      slugExists = await prisma.blog.findFirst({ 
        where: { 
          slug,
          NOT: { id }
        } 
      });
      counter++;
    }
    
    updateData.slug = slug;
  }
  
  if (body) updateData.body = body;
  if (date) updateData.date = new Date(date);

  const blog = await prisma.blog.update({
    where: { id },
    data: updateData,
  });

  res.json({
    success: true,
    data: blog,
    message: 'Blog updated successfully',
  });
});

// @desc    Delete blog
// @route   DELETE /api/blogs/:id
// @access  Public (should be protected in production)
export const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await prisma.blog.delete({
    where: { id },
  });

  res.json({
    success: true,
    message: 'Blog deleted successfully',
  });
});

// @desc    Get all blog slugs (for static generation)
// @route   GET /api/blogs/slugs/all
// @access  Public
export const getAllSlugs = asyncHandler(async (req, res) => {
  const blogs = await prisma.blog.findMany({
    select: {
      slug: true,
      id: true,
      title: true,
    },
  });

  res.json({
    success: true,
    data: blogs,
  });
});
