'use client';

import { useState } from 'react';

interface StarRatingProps {
    rating: number;
    onChange?: (rating: number) => void;
    readonly?: boolean;
    size?: 'sm' | 'md' | 'lg';
}

export default function StarRating({ rating, onChange, readonly = false, size = 'md' }: StarRatingProps) {
    const [hoverRating, setHoverRating] = useState(0);

    const sizeClasses = {
        sm: 'text-lg',
        md: 'text-2xl',
        lg: 'text-3xl',
    };

    const displayRating = hoverRating || rating;

    return (
        <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    className={`${sizeClasses[size]} ${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} transition-transform`}
                    onClick={() => !readonly && onChange?.(star)}
                    onMouseEnter={() => !readonly && setHoverRating(star)}
                    onMouseLeave={() => !readonly && setHoverRating(0)}
                    disabled={readonly}
                >
                    <span className={star <= displayRating ? 'text-yellow-500' : 'text-gray-300'}>
                        ★
                    </span>
                </button>
            ))}
            <span className="ml-2 text-sm text-gray-600">
                {displayRating > 0 && `${displayRating}/5`}
            </span>
        </div>
    );
}
