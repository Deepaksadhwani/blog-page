'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/layout';
import { blogApi } from '@/lib/api';

export default function CreateBlogPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        body: '',
        date: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!formData.title.trim() || !formData.body.trim()) {
            setError('Please fill in all required fields');
            return;
        }

        try {
            setLoading(true);
            const response = await blogApi.create(formData);

            if (response.success) {
                // Redirect to the new blog post
                router.push(`/blogs/${response.data.slug}`);
            }
        } catch (err: any) {
            setError(err.message || 'Failed to create blog post');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">Create New Blog Post</h1>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
                    {/* Title */}
                    <div className="mb-6">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                            Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter blog title"
                            disabled={loading}
                            required
                        />
                        <p className="text-sm text-gray-500 mt-1">
                            3-200 characters
                        </p>
                    </div>

                    {/* Date */}
                    <div className="mb-6">
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                            Publish Date
                        </label>
                        <input
                            type="date"
                            id="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            disabled={loading}
                        />
                    </div>

                    {/* Body */}
                    <div className="mb-6">
                        <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-2">
                            Content <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="body"
                            value={formData.body}
                            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                            rows={15}
                            className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
                            placeholder="Write your blog content here..."
                            disabled={loading}
                            required
                        />
                        <p className="text-sm text-gray-500 mt-1">
                            Minimum 10 characters. You can use plain text or markdown.
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Creating...' : 'Create Blog Post'}
                        </button>
                        <button
                            type="button"
                            onClick={() => router.back()}
                            disabled={loading}
                            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition disabled:cursor-not-allowed"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}
