import React, { useState, useEffect, useRef, useCallback } from 'react';
import PhotoCard from '../components/PhotoCard';

const PhotoList = () => {
    const [photos, setPhotos] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef();

    // Xử lý Infinite Scroll bằng IntersectionObserver 
    const lastPhotoElementRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1); // Tăng trang khi cuộn xuống cuối [cite: 12]
            }
        });

        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    // Hàm fetch dữ liệu từ API
    useEffect(() => {
        const fetchPhotos = async () => {
            setLoading(true);
            try {
                // Lấy danh sách ảnh, phân trang [cite: 7, 12]
                const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=20`);
                const data = await response.json();

                if (data.length === 0) {
                    setHasMore(false); // Xử lý khi hết ảnh [cite: 14]
                } else {
                    // Gom ảnh mới vào danh sách cũ, lọc trùng lặp nếu cần
                    setPhotos(prevPhotos => [...prevPhotos, ...data]);
                }
            } catch (error) {
                console.error("Error fetching photos:", error);
            }
            setLoading(false);
        };

        fetchPhotos();
    }, [page]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Lorem Picsum Gallery</h1>

            {/* Responsive Grid: 1 cột mobile, 3 cột tablet, 4 cột desktop [cite: 8, 30] */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {photos.map((photo, index) => {
                    if (photos.length === index + 1) {
                        // Gắn ref vào phần tử cuối cùng để kích hoạt load more
                        return <PhotoCard refProp={lastPhotoElementRef} key={`${photo.id}-${index}`} photo={photo} />;
                    } else {
                        return <PhotoCard key={`${photo.id}-${index}`} photo={photo} />;
                    }
                })}
            </div>

            {/* Loading Indicator [cite: 13] */}
            {loading && (
                <div className="text-center py-4">
                    <p className="text-xl text-blue-600 font-semibold">Loading more photos...</p>
                </div>
            )}

            {!hasMore && <p className="text-center mt-4">No more photos to load.</p>}
        </div>
    );
};

export default PhotoList;