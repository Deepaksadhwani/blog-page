import Link from 'next/link';
import { Blog } from '@/lib/api';
import { getExcerpt } from '@/lib/utils';

interface RelatedArticlesProps {
    articles?: Blog[];
    currentArticleId?: string;
}

export default function RelatedArticles({ articles, currentArticleId }: RelatedArticlesProps) {
    // Filter out current article if viewing a blog post
    const displayArticles = articles?.filter(article => article.id !== currentArticleId)?.slice(0, 4) || [];

    if (displayArticles.length === 0) {
        return null;
    }

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                    Related articles
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {displayArticles.map((article) => (
                        <Link
                            key={article.id}
                            href={`/blogs/${article.slug}`}
                            className="group"
                        >
                            <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                                {/* Image */}
                                <div className="relative h-48 bg-gradient-to-br from-blue-400 to-purple-500">
                                    <div className="absolute inset-0 flex items-center justify-center text-white text-6xl font-bold opacity-20">
                                        {article.title.charAt(0)}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4 flex-1 flex flex-col">
                                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition">
                                        {article.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-3 line-clamp-3 flex-1">
                                        {getExcerpt(article.body, 100)}
                                    </p>
                                    <div className="flex items-center justify-between text-xs text-gray-500">
                                        <span>Read more →</span>
                                        {article.commentCount !== undefined && (
                                            <span>💬 {article.commentCount}</span>
                                        )}
                                    </div>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
