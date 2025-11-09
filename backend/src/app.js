import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { errorHandler, notFoundHandler } from './middlewares/error-handler.js';
import blogRoutes from './routes/blog-routes.js';
import commentRoutes from './routes/comment-routes.js';
import ratingRoutes from './routes/rating-routes.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'))

app.use('/api/blogs', blogRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/ratings', ratingRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
