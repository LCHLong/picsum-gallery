import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { fetchPhotoDetails } from '../services/photoAPI'; // API Service

const PhotoDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        fetchPhotoDetails(id)
            .then(data => {
                setPhoto(data);
            })
            .catch(err => {
                setError("Could not load photo details. Please check the photo ID.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="text-center mt-20">
                <Loader size="large" />
                <p className="mt-4 text-xl text-gray-600">Fetching photo details...</p>
            </div>
        );
    }

    if (error || !photo) {
        return (
            <div className="container mx-auto p-8 max-w-4xl text-center mt-20">
                <p className="text-2xl text-red-600 font-bold">{error || "Photo not found!"}</p>
                <button
                    onClick={() => navigate('/photos')}
                    className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                    &larr; Back to Gallery
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 md:p-8 max-w-7xl">
            <button
                onClick={() => navigate('/photos')}
                className="mb-6 inline-flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition shadow-md"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                <span>Back to Gallery</span>
            </button>

            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden p-6 md:p-10">

                {/* 1. KHUNG ẢNH (Có chức năng Fullsize khi click vào ảnh) */}
                <div className="mb-8 relative group">
                    <a
                        href={photo.download_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block cursor-pointer"
                        title="Click to view full size image in new tab"
                    >
                        <img
                            src={photo.download_url}
                            alt={`Photo by ${photo.author}`}
                            className="block max-w-full mx-auto max-h-[90vh] object-contain rounded-xl border-4 border-gray-100 shadow-xl transition-opacity duration-300 group-hover:opacity-90"
                        />
                        {/* Icon Fullsize overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl">
                            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4M4 20l5-5m11 5v-4m0 4h-4m4 0l-5-5"></path></svg>
                        </div>
                    </a>
                </div>

                {/* 2. KHUNG THÔNG TIN (Đặt dưới ảnh) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8 border-t border-gray-200">

                    {/* Cột 1: Tiêu đề và Tác giả */}
                    <div className="lg:col-span-1 border-b lg:border-b-0 lg:border-r pr-8 pb-4 lg:pb-0">
                        <h1 className="text-3xl lg:text-4xl font-extrabold text-indigo-700 mb-2 break-words">
                            A Scenic View #{photo.id}
                        </h1>

                        <p className="text-xl text-gray-500">
                            by <span className="font-semibold text-gray-800">{photo.author}</span>
                        </p>
                    </div>

                    {/* Cột 2: Mô tả và Thông tin phụ */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-gray-700">Description</h3>

                            <p className="text-gray-600 leading-relaxed bg-indigo-50 p-4 rounded-lg border border-indigo-200 italic">
                                This API does not provide a specific description. This text is displayed to fulfill the requirement of showing placeholder content for the photo description.
                            </p>
                        </div>

                        <div className="pt-4 border-t space-y-4">
                            <p className="text-sm text-gray-500 mb-2">Original Dimensions: {photo.width} x {photo.height}</p>

                            <a
                                href={photo.download_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-indigo-500 hover:text-indigo-600 font-medium transition flex items-center space-x-1 justify-center"
                                title="Opens full resolution image in a new tab"
                            >
                                <span>View Fullsize</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4m-4-7l7 7m0 0H14m3-3v3"></path></svg>
                            </a>

                            <a
                                href={photo.url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-indigo-500 hover:text-indigo-600 font-medium transition flex items-center space-x-1 justify-center mt-2"
                            >
                                <span>View Source Website</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4m-4-7l7 7m0 0H14m3-3v3"></path></svg>
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default PhotoDetail;