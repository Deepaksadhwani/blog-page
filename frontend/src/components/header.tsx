import Link from 'next/link';

export default function Header() {
    return (
        <header className="bg-white shadow-sm border-b">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition">
                        Blog Platform
                    </Link>

                    <div className="flex items-center space-x-6">
                        <Link
                            href="/"
                            className="text-gray-700 hover:text-blue-600 font-medium transition"
                        >
                            Home
                        </Link>
                        <Link
                            href="/blogs"
                            className="text-gray-700 hover:text-blue-600 font-medium transition"
                        >
                            All Blogs
                        </Link>
                        <Link
                            href="/create"
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium transition"
                        >
                            Create Blog
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}
