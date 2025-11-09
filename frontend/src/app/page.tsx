import Link from 'next/link';
import Layout from '@/components/layout';
import BlogCard from '@/components/blog-card';
import { blogApi } from '@/lib/api';

// Force dynamic rendering to avoid build-time errors
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  let blogs: any[] = [];
  let error: string | null = null;

  try {
    const response = await blogApi.getAll(1, 6); // Get latest 6 blogs
    if (response.success) {
      blogs = response.data;
    }
  } catch (err) {
    console.error('Failed to fetch blogs:', err);
    error = 'Failed to load blogs. Please try again later.';
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Welcome to Blog Platform
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Discover amazing stories and share your own experiences
          </p>
          <Link
            href="/blogs"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
          >
            Explore All Blogs
          </Link>
        </div>
      </section>

      {/* Latest Blogs Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Latest Posts</h2>
          <Link
            href="/blogs"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            View all →
          </Link>
        </div>

        {error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        ) : blogs.length === 0 ? (
          <p className="text-gray-500 text-center py-12">
            No blogs available yet. Check back soon!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Why Choose Our Platform?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-semibold mb-2">Easy Writing</h3>
              <p className="text-gray-600">
                Simple and intuitive interface to write and publish your stories
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-semibold mb-2">Engage with Readers</h3>
              <p className="text-gray-600">
                Connect with your audience through comments and discussions
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-xl font-semibold mb-2">Get Feedback</h3>
              <p className="text-gray-600">
                Receive ratings and reviews from the community
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
