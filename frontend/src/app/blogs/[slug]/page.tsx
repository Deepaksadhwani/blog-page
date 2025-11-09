'use client';

import { useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import dynamicImport from 'next/dynamic';
import Layout from '@/components/layout';
import Comments from '@/components/comments';
import Ratings from '@/components/ratings';
import Loading from '@/components/loading';
import ShareButtons from '@/components/share-buttons';
import ArticleReactions from '@/components/article-reactions';
import TourGuides from '@/components/tour-guides';
import AboutAuthor from '@/components/about-author';
import ExploreMore from '@/components/explore-more';
import RelatedArticles from '@/components/related-articles';
import { blogApi } from '@/lib/api';
import { formatDate, calculateReadingTime } from '@/lib/utils';

// Dynamically import EditBlogForm - only loads when Edit button is clicked
const EditBlogForm = dynamicImport(() => import('@/components/edit-blog-form'), {
    loading: () => <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading editor...</p>
        </div>
    </div>,
    ssr: false, // Disable server-side rendering for this component
});

// Tell Next.js this is a dynamic route that should not be pre-rendered
export const dynamic = 'force-dynamic';

export default function BlogPage() {
    const params = useParams();
    const [blog, setBlog] = useState<any>(null);
    const [relatedBlogs, setRelatedBlogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showEditForm, setShowEditForm] = useState(false);

    useEffect(() => {
        async function fetchBlog() {
            try {
                setLoading(true);
                const response = await blogApi.getBySlug(params.slug as string);
                if (response.success) {
                    setBlog(response.data);

                    // Fetch related blogs
                    const relatedResponse = await blogApi.getAll(1, 4);
                    if (relatedResponse.success) {
                        setRelatedBlogs(relatedResponse.data);
                    }
                } else {
                    setBlog(null);
                }
            } catch (error) {
                console.error('Failed to fetch blog:', error);
                setBlog(null);
            } finally {
                setLoading(false);
            }
        }

        if (params.slug) {
            fetchBlog();
        }
    }, [params.slug]);

    if (loading) {
        return (
            <Layout>
                <Loading />
            </Layout>
        );
    }

    if (!blog) {
        notFound();
    }

    return (
        <Layout>
            <div className="bg-gray-50 min-h-screen">
                {/* Hero Image Section */}
                <div className="relative h-64 md:h-96 bg-gradient-to-r from-gray-800 to-gray-900">
                    <div className="absolute inset-0 bg-black bg-opacity-40" />
                    <div className="relative h-full flex items-center justify-center">
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white text-center px-4 max-w-4xl">
                            {blog.title}
                        </h1>
                    </div>
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content - Left/Center Column */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Author and Meta Info */}
                            <div className="bg-white rounded-lg p-6 shadow-sm">
                                <div className="flex items-center justify-between flex-wrap gap-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-lg font-bold">
                                            A
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">ALEX CARTER</h3>
                                            <div className="flex items-center text-sm text-gray-600 space-x-3">
                                                <time dateTime={blog.date}>{formatDate(blog.date)}</time>
                                                <span>•</span>
                                                <button className="text-blue-600 hover:text-blue-700 font-medium">
                                                    Explore more
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setShowEditForm(true)}
                                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition text-sm font-medium"
                                    >
                                        ✏️ Edit
                                    </button>
                                </div>
                            </div>

                            {/* Article Content */}
                            <article className="bg-white rounded-lg p-6 md:p-8 shadow-sm">
                                <div className="prose prose-lg max-w-none">
                                    <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                                        {blog.body}
                                    </div>
                                </div>

                                {/* Explore More Card - Mobile/Tablet Only */}
                                <div className="mt-8 lg:hidden">
                                    <ExploreMore
                                        title="Culinary"
                                        description="Two women in local island are chatting during morning."
                                        image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
                                    />
                                </div>
                            </article>

                            {/* About Author - Large Screen */}
                            <div className="hidden lg:block">
                                <AboutAuthor
                                    name="Alex Carter"
                                    bio="With over a decade of experience in the fitness industry, Alex specializes in strength training and functional fitness. Certified by NASM and known for his individualized style, Alex designs workout programs that are both challenging and achievable. His passion lies in helping clients build strength and confidence through personalized training routines. Outside the gym, Alex is an avid runner and enjoys outdoor adventures."
                                />
                            </div>

                            {/* Navigation Buttons */}
                            <div className="flex items-center justify-between gap-4">
                                <button className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                                    <span className='text-black'>⬅</span>
                                    <span className="hidden text-black sm:inline">Previous</span>
                                </button>
                                <button className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                                    <span className="hidden text-black sm:inline">Next</span>
                                    <span className='text-black'>➡</span>
                                </button>
                            </div>

                            {/* Article Reactions */}
                            <ArticleReactions articleId={blog.id} />

                            {/* Share Buttons */}
                            <div className="bg-white rounded-lg p-6 shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Share This Article</h3>
                                <ShareButtons
                                    url={typeof window !== 'undefined' ? window.location.href : ''}
                                    title={blog.title}
                                />
                            </div>

                            {/* Comments Section */}
                            <div className="bg-white rounded-lg p-6 md:p-8 shadow-sm">
                                <Comments blogId={blog.id} />
                            </div>

                            {/* Ratings Section */}
                            <div className="bg-white rounded-lg p-6 md:p-8 shadow-sm">
                                <Ratings blogId={blog.id} />
                            </div>

                            {/* About Author - Mobile/Tablet */}
                            <div className="lg:hidden">
                                <AboutAuthor
                                    name="Alex Carter"
                                    bio="With over a decade of experience in the fitness industry, Alex specializes in strength training and functional fitness. Certified by NASM and known for his individualized style, Alex designs workout programs that are both challenging and achievable. His passion lies in helping clients build strength and confidence through personalized training routines. Outside the gym, Alex is an avid runner and enjoys outdoor adventures."
                                />
                            </div>
                        </div>

                        {/* Sidebar - Right Column */}
                        <div className="lg:col-span-1 space-y-6">
                            {/* Explore More Card - Large Screen Only */}
                            <div className="hidden lg:block sticky top-4 space-y-6">
                                <ExploreMore
                                    title="Culinary"
                                    description="Two women in local island are chatting during morning."
                                    image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
                                />

                                {/* Travel Card */}
                                <ExploreMore
                                    title="Travel"
                                    description="Enjoying the sunset on Batur Island via boat trip."
                                    image="https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=400&h=300&fit=crop"
                                />

                                {/* Travel Info Card */}
                                <ExploreMore
                                    title="Travel"
                                    description="The cool green homestepping of the orangutans made it."
                                    image="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop"
                                />

                                {/* Tour Guides */}
                                <TourGuides />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Articles Section */}
                <RelatedArticles articles={relatedBlogs} currentArticleId={blog.id} />

                {/* Dynamically loaded Edit Form */}
                {showEditForm && (
                    <EditBlogForm
                        blog={blog}
                        onCancel={() => setShowEditForm(false)}
                    />
                )}
            </div>
        </Layout>
    );
}
