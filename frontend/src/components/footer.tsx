export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white mt-auto">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">Blog Platform</h3>
                        <p className="text-gray-400">
                            Share your thoughts and read amazing stories from our community.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="/" className="text-gray-400 hover:text-white transition">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="/blogs" className="text-gray-400 hover:text-white transition">
                                    All Blogs
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                Twitter
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                GitHub
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                LinkedIn
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Blog Platform. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
