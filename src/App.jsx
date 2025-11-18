import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PhotoList from './pages/PhotoList';
import PhotoDetail from './pages/PhotoDetail';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-900 font-sans">
        <Routes>
          {/* Đường dẫn danh sách ảnh /photos  */}
          <Route path="/photos" element={<PhotoList />} />

          {/* Đường dẫn chi tiết ảnh /photos/:id  */}
          <Route path="/photos/:id" element={<PhotoDetail />} />

          {/* Mặc định chuyển hướng về /photos */}
          <Route path="/" element={<Navigate to="/photos" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;