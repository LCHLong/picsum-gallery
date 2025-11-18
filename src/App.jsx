import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

import PhotoList from './pages/PhotoList';
import PhotoDetail from './pages/PhotoDetail';

const App = () => {
  return (
    // HashRouter đảm bảo routing hoạt động trên tất cả các hosting tĩnh (GitHub Pages, Vercel, v.v.)
    <HashRouter>
      <Routes>
        {/* Điều hướng từ trang chủ '/' sang trang danh sách '/photos' */}
        <Route path="/" element={<Navigate to="/photos" replace />} />

        {/* Route trang danh sách ảnh - hiển thị toàn bộ ảnh với infinite scroll */}
        <Route path="/photos" element={<PhotoList />} />

        {/* Route trang chi tiết ảnh - :id là tham số động lấy ID từ URL */}
        <Route path="/photos/:id" element={<PhotoDetail />} />

        {/* Xử lý lỗi 404 - nếu route không khớp với bất kỳ route nào ở trên */}
        <Route path="*" element={<p className="text-center mt-20 text-2xl text-red-600">404 - Không tìm thấy trang</p>} />
      </Routes>
    </HashRouter>
  );
};

export default App;