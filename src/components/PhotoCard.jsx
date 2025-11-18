// src/components/PhotoCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Component card hiển thị thông tin ảnh
const PhotoCard = ({ photo, refProp }) => {
    const navigate = useNavigate();

    // Điều hướng đến trang chi tiết ảnh khi nhấp vào card
    const handleClick = () => {
        navigate(`/photos/${photo.id}`);
    };

    return (
        <div
            ref={refProp}
            onClick={handleClick}
            // Giao diện đẹp hơn
            className="cursor-pointer bg-white rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 overflow-hidden group"
        >
            <img
                // Resize ảnh về 400x300px để tải nhanh hơn
                src={`https://picsum.photos/id/${photo.id}/400/300`}
                alt={photo.author}
                // Tải lười để tối ưu hóa hiệu suất
                className="w-full h-48 object-cover group-hover:opacity-90 transition duration-300"
                loading="lazy"
            />
            <div className="p-4 bg-gray-50 border-t border-gray-100">
                <h3 className="text-base font-semibold text-indigo-700 truncate">{photo.author}</h3>
            </div>
        </div>
    );
};

export default PhotoCard;