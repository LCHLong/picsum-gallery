// src/services/photoAPI.js

const BASE_URL = 'https://picsum.photos';
const LIMIT = 20;

/**
 * Lấy danh sách ảnh có phân trang
 * @param {number} page - Số trang cần lấy
 * @returns {Promise<Array>} Danh sách ảnh
 */
export const fetchPhotos = async (page) => {
    try {
        const response = await fetch(`${BASE_URL}/v2/list?page=${page}&limit=${LIMIT}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching photos:", error);
        throw error;
    }
};

/**
 * Lấy thông tin chi tiết của một ảnh
 * @param {string} id - ID của ảnh
 * @returns {Promise<Object>} Thông tin chi tiết ảnh
 */
export const fetchPhotoDetails = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/id/${id}/info`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching photo details for ID ${id}:`, error);
        throw error;
    }
};