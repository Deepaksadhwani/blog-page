import Layout from '@/components/layout';
import Link from 'next/link';

export default function NotFound() {
    return (
        <Layout>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
                <h2 className="text-3xl font-semibold text-gray-700 mb-6">Blog Not Found</h2>
                <p className="text-gray-600 mb-8">
                    Sorry, the blog post you're looking for doesn't exist or has been removed.
                </p>
                <Link
                    href="/blogs"
                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                >
                    Browse All Blogs
                </Link>
            </div>
        </Layout>
    );
}
