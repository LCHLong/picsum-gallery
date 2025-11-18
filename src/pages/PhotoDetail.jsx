import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PhotoDetail = () => {
    const { id } = useParams(); // Lấy ID từ URL 
    const navigate = useNavigate();
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch thông tin chi tiết của 1 ảnh [cite: 27]
        fetch(`https://picsum.photos/id/${id}/info`)
            .then(res => {
                if (!res.ok) throw new Error('Image not found');
                return res.json();
            })
            .then(data => {
                setPhoto(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="text-center mt-10">Loading detail...</div>;
    if (!photo) return <div className="text-center mt-10">Photo not found!</div>;

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <button
                onClick={() => navigate('/photos')}
                className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-gray-800 transition"
            >
                &larr; Back to Gallery
            </button>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Hiển thị ảnh full size [cite: 18] */}
                <img
                    src={photo.download_url}
                    alt={photo.author}
                    className="w-full h-auto object-contain max-h-[80vh]"
                />

                <div className="p-6 space-y-4">
                    {/* Tiêu đề giả lập (Placeholder) do API không có [cite: 19] */}
                    <h1 className="text-3xl font-bold text-gray-900">
                        Beautiful Scenery #{photo.id}
                    </h1>

                    {/* Tên tác giả [cite: 20] */}
                    <p className="text-lg text-gray-600 font-medium">
                        Author: <span className="text-black">{photo.author}</span>
                    </p>

                    {/* Mô tả giả lập (Placeholder) [cite: 21] */}
                    <div className="text-gray-500 leading-relaxed">
                        <p>This is a placeholder description for the photo provided by Lorem Picsum.
                            Since the API does not provide specific titles or descriptions, this text serves
                            to demonstrate the layout of the detail view page.</p>
                    </div>

                    <div className="pt-4">
                        <a
                            href={photo.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-500 hover:underline"
                        >
                            View original source
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PhotoDetail;