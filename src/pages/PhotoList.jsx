import React, { useState, useEffect, useRef, useCallback } from 'react';
import PhotoCard from '../components/PhotoCard';
import Loader from '../components/Loader';
import { fetchPhotos } from '../services/photoAPI'; // <-- Tách logic API

// Component trang danh sách ảnh với infinite scroll
const PhotoList = () => {
    // State lưu trữ danh sách ảnh
    const [photos, setPhotos] = useState([]);
    // State theo dõi trang hiện tại
    const [page, setPage] = useState(1);
    // State theo dõi trạng thái loading khi tải thêm ảnh
    const [loading, setLoading] = useState(false);
    // State kiểm tra còn ảnh để tải không
    const [hasMore, setHasMore] = useState(true);
    // State theo dõi lần tải đầu tiên
    const [initialLoading, setInitialLoading] = useState(true);

    // Ref để theo dõi phần tử cuối cùng cho Intersection Observer
    const observer = useRef();

    // Callback để thiết lập Intersection Observer cho ảnh cuối cùng
    const lastPhotoElementRef = useCallback(node => {
        // Nếu đang loading thì thoát ra
        if (loading) return;
        // Hủy observer cũ nếu có
        if (observer.current) observer.current.disconnect();

        // Tạo observer mới để theo dõi khi user cuộn tới cuối danh sách
        observer.current = new IntersectionObserver(entries => {
            // Nếu ảnh cuối cùng hiện trong viewport và còn ảnh để tải, tăng trang
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        }, {
            // Bắt đầu tải sớm khi còn cách 50px so với cuối trang
            rootMargin: '50px'
        });

        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    // Effect để tải ảnh khi trang (page) thay đổi
    useEffect(() => {
        // Hàm async để gọi API và cập nhật state
        const loadPhotos = async () => {
            setLoading(true);
            try {
                // Gọi API service để lấy danh sách ảnh
                const data = await fetchPhotos(page); // <-- Dùng API service

                // Nếu không có ảnh, đánh dấu không còn ảnh để tải
                if (data.length === 0) {
                    setHasMore(false);
                } else {
                    // Thêm ảnh mới vào danh sách
                    setPhotos(prevPhotos => {
                        // Loại bỏ ảnh trùng lặp bằng cách kiểm tra ID
                        const newPhotoIds = new Set(data.map(p => p.id));
                        const filteredPrevPhotos = prevPhotos.filter(p => !newPhotoIds.has(p.id));
                        return [...filteredPrevPhotos, ...data];
                    });
                }
            } catch (error) {
                // Xử lý lỗi - đánh dấu không còn ảnh để tải
                setHasMore(false);
            }
            setLoading(false);
            setInitialLoading(false);
        };

        // Gọi hàm tải ảnh
        loadPhotos();
    }, [page]);

    if (initialLoading) {
        return (
            <div className="container mx-auto p-4 text-center min-h-screen flex flex-col justify-center">
                <Loader size="large" />
                <p className="mt-4 text-xl text-gray-600">Loading gallery...</p>
            </div>
        );
    }

    return (
        // ĐÃ CẢI THIỆN 1: Thêm background gradient và đảm bảo chiều cao tối thiểu
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100">
            <div className="container mx-auto p-4 md:p-8">

                {/* ĐÃ CẢI THIỆN 2: Header Typography và Gradient Text */}
                <header className="text-center pt-12 pb-10">
                    <h1 className="text-5xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-purple-600">
                        Lorem Picsum Gallery
                    </h1>
                    <p className="text-xl text-gray-600 mt-3 font-light">Scroll down to explore a vast collection of high-quality photos.</p>
                </header>

                {/* ĐÃ CẢI THIỆN 3: Bố cục Grid - Loại bỏ khung trắng lớn, tăng gap */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                    {photos.map((photo, index) => {
                        const isLastElement = photos.length === index + 1;
                        return (
                            <PhotoCard
                                refProp={isLastElement ? lastPhotoElementRef : null}
                                key={photo.id + index}
                                photo={photo}
                            />
                        );
                    })}
                </div>

                {/* Loading Indicator cho Infinite Scroll */}
                {loading && <Loader />}

                {!hasMore && !loading && photos.length > 0 && (
                    <p className="text-center mt-16 pb-12 text-lg font-medium text-gray-500">
                        You have reached the end of the collection.
                    </p>
                )}

                {photos.length === 0 && !loading && (
                    <p className="text-center mt-8 text-lg font-medium text-red-500">
                        No photos found.
                    </p>
                )}
            </div>
        </div>
    );
};

export default PhotoList;