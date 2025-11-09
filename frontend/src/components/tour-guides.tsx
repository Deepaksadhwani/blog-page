interface TourGuide {
    name: string;
    location: string;
    rating: number;
    reviews: number;
    image?: string;
}

interface TourGuidesProps {
    guides?: TourGuide[];
}

export default function TourGuides({ guides }: TourGuidesProps) {
    // Default tour guides data
    const defaultGuides: TourGuide[] = [
        {
            name: 'Amanda Rachel',
            location: 'Windhoek, Omaheke',
            rating: 4.5,
            reviews: 28
        },
        {
            name: 'Danielle Marsh',
            location: 'Wirnecombe, Java timur',
            rating: 4.0,
            reviews: 24
        },
        {
            name: 'Kang Haerin',
            location: 'Bangkok, Jena lebar',
            rating: 5.0,
            reviews: 26
        }
    ];

    const displayGuides = guides || defaultGuides;

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Tour Guides</h3>
            <div className="space-y-4">
                {displayGuides.map((guide, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
                            {guide.image ? (
                                <img src={guide.image} alt={guide.name} className="w-full h-full rounded-full object-cover" />
                            ) : (
                                guide.name.charAt(0)
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-gray-900 truncate">{guide.name}</h4>
                            <p className="text-xs text-gray-500 flex items-center mt-1">
                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {guide.location}
                            </p>
                            <div className="flex items-center mt-2">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`w-3 h-3 ${i < Math.floor(guide.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="ml-1 text-xs text-gray-600">({guide.reviews})</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
