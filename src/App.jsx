import React from 'react';
// CHÚ Ý: Đã thay thế BrowserRouter bằng HashRouter
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

import PhotoList from './pages/PhotoList';
import PhotoDetail from './pages/PhotoDetail';

const App = () => {
  return (
    // Sử dụng HashRouter để đảm bảo routing hoạt động trên mọi hosting tĩnh
    <HashRouter>
      <Routes>
        {/* Redirect từ root '/' tới '/photos' */}
        <Route path="/" element={<Navigate to="/photos" replace />} />

        {/* Route cho trang danh sách ảnh */}
        <Route path="/photos" element={<PhotoList />} />

        {/* Route cho trang chi tiết ảnh (dùng tham số :id) */}
        <Route path="/photos/:id" element={<PhotoDetail />} />

        {/* Xử lý 404 hoặc đường dẫn không hợp lệ */}
        <Route path="*" element={<p className="text-center mt-20 text-2xl text-red-600">404 - Page Not Found</p>} />
      </Routes>
    </HashRouter>
  );
};

export default App;