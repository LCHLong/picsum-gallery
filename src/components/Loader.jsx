// src/components/Loader.jsx
import React from 'react';

const Loader = ({ size = 'medium' }) => {
    let styleClasses = 'w-8 h-8';
    if (size === 'large') {
        styleClasses = 'w-12 h-12';
    } else if (size === 'small') {
        styleClasses = 'w-6 h-6';
    }

    return (
        <div className="flex justify-center items-center py-8">
            {/* Vòng tròn xoay (Spinner) dùng animation của Tailwind */}
            <div
                className={`border-4 border-t-4 border-t-indigo-500 border-gray-200 rounded-full animate-spin ${styleClasses}`}
                role="status"
                aria-label="loading"
            >
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};

export default Loader;