import React from 'react';
import { useNavigate } from 'react-router-dom';

const PhotoCard = ({ photo, refProp }) => {
    const navigate = useNavigate();

    // Xử lý click để chuyển sang trang chi tiết [cite: 16]
    const handleClick = () => {
        navigate(`/photos/${photo.id}`);
    };

    return (
        <div
            ref={refProp} // Dùng cho Infinite Scroll
            onClick={handleClick}
            className="cursor-pointer bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
            {/* Tối ưu hóa ảnh thumbnail bằng cách resize qua URL của Picsum */}
            <img
                src={`https://picsum.photos/id/${photo.id}/400/300`}
                alt={photo.author}
                className="w-full h-48 object-cover"
                loading="lazy"
            />
            <div className="p-4">
                <h3 className="text-sm font-bold text-gray-700 truncate">{photo.author}</h3>
            </div>
        </div>
    );
};

export default PhotoCard;