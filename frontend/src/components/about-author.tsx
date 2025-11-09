interface AboutAuthorProps {
    name: string;
    bio: string;
    image?: string;
}

export default function AboutAuthor({ name, bio, image }: AboutAuthorProps) {
    return (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 border border-blue-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">About {name}</h3>
            <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold mb-4 shadow-lg">
                    {image ? (
                        <img src={image} alt={name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                        name.charAt(0)
                    )}
                </div>
                <p className="text-gray-700 leading-relaxed max-w-2xl">
                    {bio}
                </p>
            </div>
        </div>
    );
}
