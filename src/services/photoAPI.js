// src/services/photoAPI.js

// URL cơ sở của Picsum Photos API
const BASE_URL = 'https://picsum.photos';
const LIMIT = 20;

/**
 * Lấy danh sách ảnh có phân trang
 * @param {number} page - Số trang cần lấy (bắt đầu từ 1)
 * @returns {Promise<Array>} Danh sách ảnh từ API
 */
export const fetchPhotos = async (page) => {
    try {
        // Gọi API lấy danh sách ảnh với phân trang
        const response = await fetch(`${BASE_URL}/v2/list?page=${page}&limit=${LIMIT}`);
        // Kiểm tra phản hồi có thành công không
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Trả về dữ liệu JSON
        return await response.json();
    } catch (error) {
        // Log lỗi và ném ra để component xử lý
        console.error("Error fetching photos:", error);
        throw error;
    }
};

/**
 * Lấy thông tin chi tiết của một ảnh bằng ID
 * @param {string} id - ID của ảnh cần lấy thông tin
 * @returns {Promise<Object>} Thông tin chi tiết ảnh (tác giả, kích thước, v.v.)
 */
export const fetchPhotoDetails = async (id) => {
    try {
        // Gọi API lấy thông tin chi tiết ảnh theo ID
        const response = await fetch(`${BASE_URL}/id/${id}/info`);
        // Kiểm tra phản hồi có thành công không
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Trả về dữ liệu JSON của ảnh
        return await response.json();
    } catch (error) {
        // Log lỗi chi tiết kèm ID ảnh
        console.error(`Error fetching photo details for ID ${id}:`, error);
        throw error;
    }
};