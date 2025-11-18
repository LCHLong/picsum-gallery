import React, { useState, useEffect, useRef, useCallback } from 'react';
import PhotoCard from '../components/PhotoCard';
import Loader from '../components/Loader';
import { fetchPhotos } from '../services/photoAPI'; // <-- Tách logic API

const PhotoList = () => {
    const [photos, setPhotos] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [initialLoading, setInitialLoading] = useState(true);

    const observer = useRef();

    const lastPhotoElementRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        }, {
            // Tải sớm hơn khi còn cách 50px so với cuối trang
            rootMargin: '50px'
        });

        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    useEffect(() => {
        const loadPhotos = async () => {
            setLoading(true);
            try {
                const data = await fetchPhotos(page); // <-- Dùng API service

                if (data.length === 0) {
                    setHasMore(false);
                } else {
                    setPhotos(prevPhotos => {
                        // Đảm bảo không trùng lặp khi fetch (chủ yếu là cho lần đầu)
                        const newPhotoIds = new Set(data.map(p => p.id));
                        const filteredPrevPhotos = prevPhotos.filter(p => !newPhotoIds.has(p.id));
                        return [...filteredPrevPhotos, ...data];
                    });
                }
            } catch (error) {
                // Handle error (optional: show error message to user)
                setHasMore(false);
            }
            setLoading(false);
            setInitialLoading(false);
        };

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