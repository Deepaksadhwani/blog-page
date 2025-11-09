'use client';

import { useState, useEffect } from 'react';
import { Comment, commentApi } from '@/lib/api';
import { formatRelativeTime } from '@/lib/utils';

interface CommentsProps {
    blogId: string;
}

export default function Comments({ blogId }: CommentsProps) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        author: '',
        comment: '',
    });

    // Fetch comments
    useEffect(() => {
        async function fetchComments() {
            try {
                setLoading(true);
                const response = await commentApi.getByBlogId(blogId);
                if (response.success) {
                    setComments(response.data);
                }
            } catch (err) {
                setError('Failed to load comments');
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchComments();
    }, [blogId]);

    // Handle form submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.author.trim() || !formData.comment.trim()) {
            setError('Please fill in all fields');
            return;
        }

        try {
            setSubmitting(true);
            setError(null);

            const response = await commentApi.create({
                ...formData,
                blogId,
            });

            if (response.success) {
                setComments([response.data, ...comments]);
                setFormData({ author: '', comment: '' });
            }
        } catch (err) {
            setError('Failed to post comment');
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Comments ({comments.length})
            </h3>

            {/* Comment Form */}
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 mb-8">
                <h4 className="text-lg font-semibold mb-4 text-black">Leave a Comment</h4>

                {error && (
                    <div className="bg-red-50 text-red-700 p-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <div className="mb-4">
                    <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        id="author"
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Your name"
                        disabled={submitting}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                        Comment
                    </label>
                    <textarea
                        id="comment"
                        value={formData.comment}
                        onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        placeholder="Write your comment..."
                        disabled={submitting}
                    />
                </div>

                <button
                    type="submit"
                    disabled={submitting}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {submitting ? 'Posting...' : 'Post Comment'}
                </button>
            </form>

            {/* Comments List */}
            {loading ? (
                <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
            ) : comments.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                    No comments yet. Be the first to comment!
                </p>
            ) : (
                <div className="space-y-6">
                    {comments.map((comment) => (
                        <div key={comment.id} className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center justify-between mb-3">
                                <h5 className="font-semibold text-gray-900">{comment.author}</h5>
                                <time className="text-sm text-gray-500">
                                    {formatRelativeTime(comment.date)}
                                </time>
                            </div>
                            <p className="text-gray-700 whitespace-pre-wrap">{comment.comment}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
