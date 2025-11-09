interface ExploreMoreProps {
    title: string;
    description: string;
    image: string;
    buttonText?: string;
    onExplore?: () => void;
}

export default function ExploreMore({
    title,
    description,
    image,
    buttonText = "Explore more",
    onExplore
}: ExploreMoreProps) {
    return (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="relative h-48">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-semibold text-lg mb-1">{title}</h3>
                    <p className="text-white/90 text-sm">{description}</p>
                </div>
            </div>
            <div className="p-4">
                <button
                    onClick={onExplore}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
}
