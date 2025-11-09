'use client';

import { useState } from 'react';

interface ArticleReactionsProps {
    articleId: string;
}

export default function ArticleReactions({ articleId }: ArticleReactionsProps) {
    const [selectedReaction, setSelectedReaction] = useState<string | null>(null);

    const reactions = [
        { emoji: '😢', label: 'Sad', color: 'hover:bg-gray-100' },
        { emoji: '😐', label: 'Neutral', color: 'hover:bg-gray-100' },
        { emoji: '😊', label: 'Happy', color: 'hover:bg-green-50' },
        { emoji: '😍', label: 'Love', color: 'hover:bg-pink-50' },
        { emoji: '🤩', label: 'Amazing', color: 'hover:bg-yellow-50' },
    ];

    const handleReaction = (label: string) => {
        setSelectedReaction(label === selectedReaction ? null : label)
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                Rate The Usefulness Of The Article
            </h3>
            <div className="flex items-center justify-center space-x-3">
                {reactions.map((reaction) => (
                    <button
                        key={reaction.label}
                        onClick={() => handleReaction(reaction.label)}
                        className={`
                            w-14 h-14 rounded-full border-2 flex items-center justify-center
                            text-3xl transition-all
                            ${selectedReaction === reaction.label
                                ? 'border-green-500 bg-green-50 scale-110'
                                : 'border-gray-200 hover:border-gray-300 ' + reaction.color
                            }
                        `}
                        title={reaction.label}
                        aria-label={`Rate as ${reaction.label}`}
                    >
                        {reaction.emoji}
                    </button>
                ))}
            </div>
        </div>
    );
}
