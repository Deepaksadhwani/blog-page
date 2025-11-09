'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface EditBlogFormProps {
    blog: {
        id: string;
        title: string;
        body: string;
        date: string;
    };
    onCancel: () => void;
}

export default function EditBlogForm({ blog, onCancel }: EditBlogFormProps) {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        title: blog.title,
        body: blog.body,
        date: blog.date.split('T')[0],
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!formData.title.trim() || !formData.body.trim()) {
            setError('Please fill in all required fields');
            return;
        }

        try {
            setSubmitting(true);
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${blog.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error('Failed to update blog');
            
            const response = await res.json();
            if (response.success) {
                // Refresh the page to show updated content
                router.refresh();
                onCancel(); // Close the editor
            }
        } catch (err: any) {
            setError(err.message || 'Failed to update blog post');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Edit Blog Post</h2>
                        <button
                            onClick={onCancel}
                            className="text-gray-400 hover:text-gray-600 text-2xl"
                            disabled={submitting}
                        >
                            ×
                        </button>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {/* Title */}
                        <div className="mb-6">
                            <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700 mb-2">
                                Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="edit-title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter blog title"
                                disabled={submitting}
                                required
                            />
                        </div>

                        {/* Date */}
                        <div className="mb-6">
                            <label htmlFor="edit-date" className="block text-sm font-medium text-gray-700 mb-2">
                                Publish Date
                            </label>
                            <input
                                type="date"
                                id="edit-date"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                disabled={submitting}
                            />
                        </div>

                        {/* Body - Markdown Editor Area */}
                        <div className="mb-6">
                            <label htmlFor="edit-body" className="block text-sm font-medium text-gray-700 mb-2">
                                Content (Markdown Supported) <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="edit-body"
                                value={formData.body}
                                onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                                rows={15}
                                className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
                                placeholder="Write your blog content here... Supports markdown!"
                                disabled={submitting}
                                required
                            />
                            <p className="text-sm text-gray-500 mt-1">
                                💡 Tip: Use markdown syntax for formatting (# headers, **bold**, *italic*, etc.)
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end space-x-4">
                            <button
                                type="button"
                                onClick={onCancel}
                                disabled={submitting}
                                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition disabled:cursor-not-allowed"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                {submitting ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
