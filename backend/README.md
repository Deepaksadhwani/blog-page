# Blog Backend API

A production-ready REST API for a blog application built with Node.js, Express, PostgreSQL, and Prisma ORM.

## 🚀 Features

- **Blog Management**: Create, read, update, and delete blog posts
- **Comments System**: Add and manage comments on blog posts
- **Rating & Review System**: Star ratings (1-5) with optional reviews
- **Pagination**: All list endpoints support pagination
- **Validation**: Input validation using express-validator
- **Error Handling**: Comprehensive error handling middleware
- **Database**: PostgreSQL with Prisma ORM
- **CORS**: Configured for cross-origin requests

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   
   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```

   Update the `.env` file with your configuration:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/blog_db?schema=public"
   PORT=5000
   NODE_ENV=development
   CORS_ORIGIN=http://localhost:3000
   ```

4. **Setup PostgreSQL Database**
   
   Create a new PostgreSQL database:
   ```sql
   CREATE DATABASE blog_db;
   ```

5. **Run Prisma migrations**
   ```bash
   npm run prisma:migrate
   ```
   
   Or if you prefer to push the schema directly:
   ```bash
   npm run prisma:push
   ```

6. **Generate Prisma Client**
   ```bash
   npm run prisma:generate
   ```

## 🏃 Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000` (or the PORT specified in .env)

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Response Format
All API responses follow this format:
```json
{
  "success": true,
  "data": {},
  "message": "Optional message",
  "pagination": {
    "page": 1,
    "limit": 10,
    "totalPages": 5,
    "totalCount": 50
  }
}
```

### Error Response Format
```json
{
  "success": false,
  "error": "Error message",
  "details": []
}
```

---

## 📝 Blog Endpoints

### Get All Blogs
```http
GET /api/blogs
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `sortBy` (optional): Field to sort by (default: 'date')
- `order` (optional): Sort order 'asc' or 'desc' (default: 'desc')

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "Blog Title",
      "body": "Blog content...",
      "slug": "blog-title",
      "date": "2025-11-07T00:00:00.000Z",
      "createdAt": "2025-11-07T00:00:00.000Z",
      "updatedAt": "2025-11-07T00:00:00.000Z",
      "averageRating": 4.5,
      "commentCount": 10,
      "ratingCount": 8
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "totalPages": 2,
    "totalCount": 15
  }
}
```

### Get Blog by Slug or ID
```http
GET /api/blogs/:identifier
```

**Parameters:**
- `identifier`: Blog slug or UUID

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Blog Title",
    "body": "Blog content...",
    "slug": "blog-title",
    "date": "2025-11-07T00:00:00.000Z",
    "comments": [],
    "ratings": [],
    "averageRating": 4.5,
    "commentCount": 10,
    "ratingCount": 8
  }
}
```

### Get All Slugs
```http
GET /api/blogs/slugs/all
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "slug": "blog-title",
      "title": "Blog Title"
    }
  ]
}
```

### Create Blog
```http
POST /api/blogs
```

**Body:**
```json
{
  "title": "My New Blog Post",
  "body": "This is the content of my blog post...",
  "date": "2025-11-07T00:00:00.000Z" // optional
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "My New Blog Post",
    "body": "This is the content...",
    "slug": "my-new-blog-post",
    "date": "2025-11-07T00:00:00.000Z",
    "createdAt": "2025-11-07T00:00:00.000Z",
    "updatedAt": "2025-11-07T00:00:00.000Z"
  },
  "message": "Blog created successfully"
}
```

### Update Blog
```http
PUT /api/blogs/:id
```

**Body:**
```json
{
  "title": "Updated Title",
  "body": "Updated content...",
  "date": "2025-11-08T00:00:00.000Z"
}
```

### Delete Blog
```http
DELETE /api/blogs/:id
```

---

## 💬 Comment Endpoints

### Get Comments by Blog ID
```http
GET /api/comments/blog/:blogId
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)
- `sortBy` (optional): Field to sort by (default: 'date')
- `order` (optional): Sort order 'asc' or 'desc' (default: 'desc')

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "author": "John Doe",
      "comment": "Great post!",
      "date": "2025-11-07T00:00:00.000Z",
      "blogId": "uuid"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "totalPages": 1,
    "totalCount": 5
  }
}
```

### Get Comment by ID
```http
GET /api/comments/:id
```

### Create Comment
```http
POST /api/comments
```

**Body:**
```json
{
  "author": "John Doe",
  "comment": "This is a great blog post!",
  "blogId": "blog-uuid"
}
```

### Update Comment
```http
PUT /api/comments/:id
```

**Body:**
```json
{
  "author": "John Doe",
  "comment": "Updated comment text"
}
```

### Delete Comment
```http
DELETE /api/comments/:id
```

---

## ⭐ Rating Endpoints

### Get Ratings by Blog ID
```http
GET /api/ratings/blog/:blogId
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)
- `sortBy` (optional): Field to sort by (default: 'date')
- `order` (optional): Sort order 'asc' or 'desc' (default: 'desc')

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "author": "Jane Smith",
      "rating": 5,
      "review": "Excellent content!",
      "date": "2025-11-07T00:00:00.000Z",
      "blogId": "uuid"
    }
  ],
  "stats": {
    "averageRating": 4.5,
    "totalRatings": 10,
    "distribution": {
      "1": 0,
      "2": 1,
      "3": 2,
      "4": 3,
      "5": 4
    }
  },
  "pagination": {
    "page": 1,
    "limit": 20,
    "totalPages": 1,
    "totalCount": 10
  }
}
```

### Get Average Rating
```http
GET /api/ratings/blog/:blogId/average
```

**Response:**
```json
{
  "success": true,
  "data": {
    "blogId": "uuid",
    "averageRating": 4.5,
    "totalRatings": 10
  }
}
```

### Get Rating by ID
```http
GET /api/ratings/:id
```

### Create Rating
```http
POST /api/ratings
```

**Body:**
```json
{
  "author": "Jane Smith",
  "rating": 5,
  "review": "Excellent content! Very informative.",
  "blogId": "blog-uuid"
}
```

**Validation:**
- `author`: 2-100 characters
- `rating`: Integer between 1-5 (required)
- `review`: Optional, max 1000 characters
- `blogId`: Valid UUID (required)

### Update Rating
```http
PUT /api/ratings/:id
```

**Body:**
```json
{
  "author": "Jane Smith",
  "rating": 4,
  "review": "Updated review text"
}
```

### Delete Rating
```http
DELETE /api/ratings/:id
```

---

## 🗄️ Database Schema

### Blog
- `id`: UUID (Primary Key)
- `title`: String
- `body`: Text
- `slug`: String (Unique)
- `date`: DateTime
- `createdAt`: DateTime
- `updatedAt`: DateTime

### Comment
- `id`: UUID (Primary Key)
- `author`: String
- `comment`: Text
- `date`: DateTime
- `blogId`: UUID (Foreign Key)

### Rating
- `id`: UUID (Primary Key)
- `author`: String
- `rating`: Integer (1-5)
- `review`: Text (Optional)
- `date`: DateTime
- `blogId`: UUID (Foreign Key)

## 🔧 Useful Prisma Commands

```bash
# Generate Prisma Client
npm run prisma:generate

# Create and run migrations
npm run prisma:migrate

# Push schema to database without migrations
npm run prisma:push

# Open Prisma Studio (Database GUI)
npm run prisma:studio
```

## 🐛 Error Handling

The API uses consistent error responses:

**Validation Error (400):**
```json
{
  "success": false,
  "error": "Validation failed",
  "details": [
    {
      "field": "title",
      "message": "Title is required"
    }
  ]
}
```

**Not Found (404):**
```json
{
  "success": false,
  "error": "Resource not found"
}
```

**Server Error (500):**
```json
{
  "success": false,
  "error": "Internal Server Error"
}
```

## 🚀 Deployment

### Environment Variables for Production
```env
DATABASE_URL="postgresql://user:password@host:5432/database"
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-domain.com
```

### Deployment Platforms
- **Render**: Supports Node.js and PostgreSQL
- **Railway**: Easy deployment with database
- **Heroku**: Classic PaaS platform
- **Vercel**: Serverless functions (requires adapter)

## 📁 Project Structure

```
backend/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── controllers/           # Route controllers
│   │   ├── blog.controller.js
│   │   ├── comment.controller.js
│   │   └── rating.controller.js
│   ├── routes/                # API routes
│   │   ├── blog.routes.js
│   │   ├── comment.routes.js
│   │   └── rating.routes.js
│   ├── validators/            # Input validation
│   │   ├── blog.validator.js
│   │   ├── comment.validator.js
│   │   └── rating.validator.js
│   ├── middleware/            # Custom middleware
│   │   ├── errorHandler.js
│   │   └── validate.js
│   ├── lib/                   # Utilities
│   │   └── prisma.js
│   ├── app.js                 # Express app setup
│   └── server.js              # Server entry point
├── .env                       # Environment variables
├── .env.example              # Environment variables template
├── .gitignore
├── package.json
└── README.md
```

## 🔒 Security Notes

⚠️ **Important for Production:**

1. Add authentication middleware for POST, PUT, DELETE routes
2. Implement rate limiting to prevent abuse
3. Add request sanitization
4. Use HTTPS in production
5. Implement proper CORS policies
6. Add input sanitization for XSS prevention
7. Use environment variables for sensitive data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🆘 Support

For issues and questions:
- Create an issue in the GitHub repository
- Check existing documentation
- Review API responses for detailed error messages

## ✨ Next Steps

After setup, you can:
1. Test the API using Postman or Thunder Client
2. Use Prisma Studio to view/manage database: `npm run prisma:studio`
3. Create seed data for development
4. Integrate with your Next.js frontend
5. Add authentication and authorization
6. Implement search functionality
7. Add image upload for blog posts

---

Made with ❤️ for the Blog Application Project
