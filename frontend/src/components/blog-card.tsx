import Link from 'next/link';
import { Blog } from '@/lib/api';
import { formatDate, getExcerpt, calculateReadingTime } from '@/lib/utils';

interface BlogCardProps {
    blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
    return (
        <article className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <div className="p-6">
                {/* Title */}
                <Link href={`/blogs/${blog.slug}`}>
                    <h2 className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition mb-3 line-clamp-2">
                        {blog.title}
                    </h2>
                </Link>

                {/* Meta info */}
                <div className="flex items-center text-sm text-gray-600 mb-4 space-x-4">
                    <time dateTime={blog.date}>
                        {formatDate(blog.date)}
                    </time>
                    <span>•</span>
                    <span>{calculateReadingTime(blog.body)} min read</span>
                    {blog.averageRating && (
                        <>
                            <span>•</span>
                            <div className="flex items-center">
                                <span className="text-yellow-500">★</span>
                                <span className="ml-1">{blog.averageRating.toFixed(1)}</span>
                            </div>
                        </>
                    )}
                </div>

                {/* Excerpt */}
                <p className="text-gray-700 mb-4 line-clamp-3">
                    {getExcerpt(blog.body)}
                </p>

                {/* Stats and Read More */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                        {blog.commentCount !== undefined && (
                            <span>💬 {blog.commentCount} {blog.commentCount === 1 ? 'comment' : 'comments'}</span>
                        )}
                        {blog.ratingCount !== undefined && (
                            <span>⭐ {blog.ratingCount} {blog.ratingCount === 1 ? 'rating' : 'ratings'}</span>
                        )}
                    </div>

                    <Link
                        href={`/blogs/${blog.slug}`}
                        className="text-blue-600 hover:text-blue-800 font-medium transition"
                    >
                        Read more →
                    </Link>
                </div>
            </div>
        </article>
    );
}
