'use client';

import { useState, useEffect } from 'react';
import { Rating, ratingApi } from '@/lib/api';
import StarRating from './star-rating';
import { formatRelativeTime } from '@/lib/utils';

interface RatingsProps {
    blogId: string;
}

export default function Ratings({ blogId }: RatingsProps) {
    const [ratings, setRatings] = useState<Rating[]>([]);
    const [average, setAverage] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        author: '',
        rating: 0,
        review: '',
    });

    // Fetch ratings
    useEffect(() => {
        async function fetchRatings() {
            try {
                setLoading(true);
                const [ratingsResponse, avgResponse] = await Promise.all([
                    ratingApi.getByBlogId(blogId),
                    ratingApi.getAverage(blogId),
                ]);

                if (ratingsResponse.success) {
                    setRatings(ratingsResponse.data);
                }
                if (avgResponse.success) {
                    setAverage(avgResponse.data.averageRating);
                }
            } catch (err) {
                console.error('Failed to load ratings', err);
            } finally {
                setLoading(false);
            }
        }

        fetchRatings();
    }, [blogId]);

    // Handle form submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.author.trim() || formData.rating === 0) {
            setError('Please provide your name and rating');
            return;
        }

        try {
            setSubmitting(true);
            setError(null);

            const response = await ratingApi.create({
                ...formData,
                blogId,
            });

            if (response.success) {
                setRatings([response.data, ...ratings]);
                setFormData({ author: '', rating: 0, review: '' });

                // Refresh average
                const avgResponse = await ratingApi.getAverage(blogId);
                if (avgResponse.success) {
                    setAverage(avgResponse.data.averageRating);
                }
            }
        } catch (err) {
            setError('Failed to submit rating');
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Ratings & Reviews
            </h3>

            {/* Average Rating */}
            {!loading && ratings.length > 0 && (
                <div className="bg-blue-50 rounded-lg p-6 mb-8">
                    <div className="flex items-center space-x-4">
                        <div>
                            <p className="text-4xl font-bold text-gray-900">{average.toFixed(1)}</p>
                            <p className="text-sm text-gray-600 mt-1">out of 5</p>
                        </div>
                        <div>
                            <StarRating rating={Math.round(average)} readonly size="lg" />
                            <p className="text-sm text-gray-600 mt-2">
                                Based on {ratings.length} {ratings.length === 1 ? 'review' : 'reviews'}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Rating Form */}
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 mb-8">
                <h4 className="text-lg font-semibold mb-4 text-black">Leave a Rating</h4>

                {error && (
                    <div className="bg-red-50 text-red-700 p-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <div className="mb-4">
                    <label htmlFor="rating-author" className="block text-sm font-medium text-gray-700 mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        id="rating-author"
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Your name"
                        disabled={submitting}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rating
                    </label>
                    <StarRating
                        rating={formData.rating}
                        onChange={(rating) => setFormData({ ...formData, rating })}
                        size="lg"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-2">
                        Review (Optional)
                    </label>
                    <textarea
                        id="review"
                        value={formData.review}
                        onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        placeholder="Write your review..."
                        disabled={submitting}
                    />
                </div>

                <button
                    type="submit"
                    disabled={submitting}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {submitting ? 'Submitting...' : 'Submit Rating'}
                </button>
            </form>

            {/* Ratings List */}
            {loading ? (
                <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
            ) : ratings.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                    No ratings yet. Be the first to rate this blog!
                </p>
            ) : (
                <div className="space-y-6">
                    {ratings.map((rating) => (
                        <div key={rating.id} className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <h5 className="font-semibold text-gray-900 mb-2">{rating.author}</h5>
                                    <StarRating rating={rating.rating} readonly />
                                </div>
                                <time className="text-sm text-gray-500">
                                    {formatRelativeTime(rating.date)}
                                </time>
                            </div>
                            {rating.review && (
                                <p className="text-gray-700 mt-3 whitespace-pre-wrap">{rating.review}</p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
