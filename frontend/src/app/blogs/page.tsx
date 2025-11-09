import Layout from '@/components/layout';
import BlogCard from '@/components/blog-card';
import { blogApi } from '@/lib/api';

// Force dynamic rendering to avoid build-time errors
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function BlogsPage() {
    let blogs: any[] = [];
    let error: string | null = null;

    try {
        const response = await blogApi.getAll(1, 100); // Get all blogs
        if (response.success) {
            blogs = response.data;
        }
    } catch (err) {
        console.error('Failed to fetch blogs:', err);
        error = 'Failed to load blogs. Please try again later.';
    }

    return (
        <Layout>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">All Blog Posts</h1>

                {error ? (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                        {error}
                    </div>
                ) : blogs.length === 0 ? (
                    <p className="text-gray-500 text-center py-12">
                        No blogs available yet. Check back soon!
                    </p>
                ) : (
                    <>
                        <p className="text-gray-600 mb-8">
                            Showing {blogs.length} {blogs.length === 1 ? 'post' : 'posts'}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogs.map((blog) => (
                                <BlogCard key={blog.id} blog={blog} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </Layout>
    );
}
