# Blog Platform - Full Stack Application

A modern, production-ready blog platform built with Node.js, Express, PostgreSQL, Prisma ORM, Next.js, TypeScript, and Tailwind CSS.

## 🌟 Features

### Backend (Express + PostgreSQL + Prisma)
- ✅ RESTful API with 18 endpoints
- ✅ PostgreSQL database with Prisma ORM
- ✅ Full CRUD operations for blogs, comments, and ratings
- ✅ Slug-based URLs for SEO
- ✅ Input validation with express-validator
- ✅ Error handling middleware
- ✅ CORS enabled
- ✅ Pagination support

### Frontend (Next.js + TypeScript + Tailwind)
- ✅ Static Site Generation (SSG) for blog pages
- ✅ Incremental Static Regeneration (ISR)
- ✅ Server and Client Components
- ✅ Responsive design (mobile-first)
- ✅ Interactive comments section
- ✅ 5-star rating system
- ✅ Modern UI with smooth animations
- ✅ SEO optimized

## 📁 Project Structure

```
blog-platform/
├── backend/                 # Express.js API
│   ├── src/
│   │   ├── controllers/    # Business logic
│   │   ├── routes/         # API routes
│   │   ├── validators/     # Input validation
│   │   ├── middlewares/    # Custom middleware
│   │   ├── libs/           # Prisma client
│   │   ├── app.js          # Express app setup
│   │   └── server.js       # Server entry point
│   ├── prisma/
│   │   ├── schema.prisma   # Database schema
│   │   └── seed.js         # Sample data
│   └── package.json
│
└── frontend/               # Next.js app
    ├── src/
    │   ├── app/           # App Router pages
    │   ├── components/    # React components
    │   └── lib/           # Utilities & API
    ├── public/            # Static assets
    └── package.json
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd blog-platform
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   
   # Create .env file
   echo 'DATABASE_URL="postgresql://postgres:password@localhost:5432/blogdb"' > .env
   echo 'PORT=5000' >> .env
   
   # Setup database
   npx prisma migrate dev --name init
   npx prisma db seed
   
   # Start server
   npm run dev
   ```

3. **Setup Frontend** (new terminal)
   ```bash
   cd frontend
   npm install
   
   # Create .env.local file
   echo 'NEXT_PUBLIC_API_URL=http://localhost:5000/api' > .env.local
   
   # Start dev server
   npm run dev
   ```

4. **Open browser**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api

📖 **For detailed setup instructions, see [QUICKSTART.md](./QUICKSTART.md)**

## 📚 Documentation

### Backend
- [Backend README](./backend/README.md) - Complete backend guide
- [API Documentation](./backend/API_TESTING.md) - All API endpoints
- [Setup Guide](./backend/SETUP.md) - Detailed setup instructions
- [Deployment Guide](./backend/DEPLOYMENT.md) - Deploy to production
- [Troubleshooting](./backend/TROUBLESHOOTING.md) - Common issues

### Frontend
- [Frontend README](./frontend/README.md) - Complete frontend guide
- [Development Guide](./frontend/DEVELOPMENT.md) - Best practices

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js 4.18.2
- **Database**: PostgreSQL
- **ORM**: Prisma 5.7.0
- **Validation**: express-validator 7.0.1
- **Other**: CORS, Morgan, Dotenv

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: React Server & Client Components

## 📸 Screenshots

### Homepage
- Hero section with call-to-action
- Latest blog posts grid
- Features section

### Blog Page
- Full blog content
- Reading time and metadata
- Comments section (client-side)
- Rating system with stars

### Blog Listing
- All blog posts
- Responsive grid layout
- Click to read more

## 🔗 API Endpoints

### Blogs
- `GET /api/blogs` - List all blogs (with pagination)
- `GET /api/blogs/:identifier` - Get blog by ID or slug
- `POST /api/blogs` - Create new blog
- `PUT /api/blogs/:id` - Update blog
- `DELETE /api/blogs/:id` - Delete blog
- `GET /api/blogs/slugs/all` - Get all slugs (for SSG)
- `GET /api/blogs/stats/summary` - Get blog statistics

### Comments
- `GET /api/comments` - List all comments
- `GET /api/comments/:id` - Get comment by ID
- `GET /api/comments/blog/:blogId` - Get comments for a blog
- `POST /api/comments` - Create comment
- `PUT /api/comments/:id` - Update comment
- `DELETE /api/comments/:id` - Delete comment

### Ratings
- `GET /api/ratings` - List all ratings
- `GET /api/ratings/:id` - Get rating by ID
- `GET /api/ratings/blog/:blogId` - Get ratings for a blog
- `GET /api/ratings/blog/:blogId/average` - Get average rating
- `POST /api/ratings` - Create rating
- `PUT /api/ratings/:id` - Update rating
- `DELETE /api/ratings/:id` - Delete rating

## 🎯 Key Features Explained

### Static Site Generation (SSG)
Blog pages are pre-rendered at build time for optimal performance:
```typescript
export async function generateStaticParams() {
  const slugs = await blogApi.getAllSlugs();
  return slugs.map(slug => ({ slug }));
}
```

### Slug-based URLs
SEO-friendly URLs generated from titles:
- Title: "Getting Started with Next.js"
- Slug: `getting-started-with-nextjs`
- URL: `/blogs/getting-started-with-nextjs`

### Client-Side Interactivity
Comments and ratings use `'use client'` directive with `useEffect` for dynamic fetching.

### Validation
All inputs validated with express-validator:
```javascript
body('title').trim().notEmpty().isLength({ min: 3, max: 200 })
```

## 🚀 Deployment

### Frontend (Vercel)
1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

### Backend (Render/Heroku)
1. Add `Procfile`
2. Configure database
3. Set environment variables
4. Deploy

See deployment guides in documentation.

## 🧪 Testing

### Test Backend API
```bash
cd backend
npm test
```

Or use the provided API testing guide with sample requests.

### Test Frontend
```bash
cd frontend
npm run build
npm run start
```

## 📝 Sample Data

The seed script creates 3 sample blog posts:
1. "Getting Started with Next.js" - Next.js tutorial
2. "The Power of Prisma ORM" - Database guide
3. "Building RESTful APIs" - API design patterns

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

MIT License - see LICENSE file

## 🆘 Support

- Check [QUICKSTART.md](./QUICKSTART.md) for quick setup
- Review documentation in `backend/` and `frontend/` folders
- Open an issue for bugs or questions

## 🎓 Learning Resources

This project demonstrates:
- RESTful API design
- Database modeling with Prisma
- Next.js 15 App Router
- Server vs Client Components
- Static Site Generation
- TypeScript best practices
- Tailwind CSS styling
- Form handling and validation

Perfect for learning modern full-stack development!

---

**Built with ❤️ using Node.js, Express, PostgreSQL, Prisma, Next.js, and Tailwind CSS**
