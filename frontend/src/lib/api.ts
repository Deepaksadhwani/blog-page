const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface Blog {
    id: string;
    title: string;
    body: string;
    slug: string;
    date: string;
    createdAt: string;
    updatedAt: string;
    averageRating?: number;
    commentCount?: number;
    ratingCount?: number;
}

export interface Comment {
    id: string;
    author: string;
    comment: string;
    date: string;
    blogId: string;
}

export interface Rating {
    id: string;
    author: string;
    rating: number;
    review?: string;
    date: string;
    blogId: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
    pagination?: {
        page: number;
        limit: number;
        totalPages: number;
        totalCount: number;
    };
}

// Blog API calls
export const blogApi = {
    // Get all blogs
    async getAll(page = 1, limit = 10): Promise<ApiResponse<Blog[]>> {
        const res = await fetch(`${API_URL}/blogs?page=${page}&limit=${limit}`, {
            cache: 'no-store'
        });
        if (!res.ok) throw new Error('Failed to fetch blogs');
        return res.json();
    },

    // Get blog by slug
    async getBySlug(slug: string): Promise<ApiResponse<Blog>> {
        const res = await fetch(`${API_URL}/blogs/${slug}`, {
            cache: 'no-store'
        });
        if (!res.ok) throw new Error('Failed to fetch blog');
        return res.json();
    },

    // Get all slugs for static generation
    async getAllSlugs(): Promise<ApiResponse<{ slug: string; id: string; title: string }[]>> {
        const res = await fetch(`${API_URL}/blogs/slugs/all`, {
            cache: 'no-store'
        });
        if (!res.ok) throw new Error('Failed to fetch slugs');
        return res.json();
    },

    // Create new blog
    async create(data: { title: string; body: string; date?: string }): Promise<ApiResponse<Blog>> {
        const res = await fetch(`${API_URL}/blogs`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Failed to create blog');
        return res.json();
    },

    // Update blog
    async update(id: string, data: { title?: string; body?: string; date?: string }): Promise<ApiResponse<Blog>> {
        const res = await fetch(`${API_URL}/blogs/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Failed to update blog');
        return res.json();
    },

    // Delete blog
    async delete(id: string): Promise<ApiResponse<null>> {
        const res = await fetch(`${API_URL}/blogs/${id}`, {
            method: 'DELETE',
        });
        if (!res.ok) throw new Error('Failed to delete blog');
        return res.json();
    },
};

// Comment API calls
export const commentApi = {
    // Get comments by blog ID
    async getByBlogId(blogId: string): Promise<ApiResponse<Comment[]>> {
        const res = await fetch(`${API_URL}/comments/blog/${blogId}`);
        if (!res.ok) throw new Error('Failed to fetch comments');
        return res.json();
    },

    // Create comment
    async create(data: { author: string; comment: string; blogId: string }): Promise<ApiResponse<Comment>> {
        const res = await fetch(`${API_URL}/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Failed to create comment');
        return res.json();
    },
};

// Rating API calls
export const ratingApi = {
    // Get ratings by blog ID
    async getByBlogId(blogId: string): Promise<ApiResponse<Rating[]>> {
        const res = await fetch(`${API_URL}/ratings/blog/${blogId}`);
        if (!res.ok) throw new Error('Failed to fetch ratings');
        return res.json();
    },

    // Create rating
    async create(data: { author: string; rating: number; review?: string; blogId: string }): Promise<ApiResponse<Rating>> {
        const res = await fetch(`${API_URL}/ratings`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Failed to create rating');
        return res.json();
    },

    // Get average rating
    async getAverage(blogId: string): Promise<ApiResponse<{ averageRating: number; totalRatings: number }>> {
        const res = await fetch(`${API_URL}/ratings/blog/${blogId}/average`);
        if (!res.ok) throw new Error('Failed to fetch average rating');
        return res.json();
    },
};
