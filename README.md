# 📸 Picsum Gallery

Ứng dụng web hiển thị danh sách ảnh từ [Picsum Photos API](https://picsum.photos/) với tính năng infinite scroll và xem chi tiết ảnh.

## 🌟 Giới Thiệu

**Picsum Gallery** là một ứng dụng React hiện đại giúp bạn:

- 📷 Duyệt qua hàng ngàn ảnh chất lượng cao từ Picsum Photos
- ♾️ Tải ảnh tự động khi cuộn xuống cuối trang (Infinite Scroll)
- 🔍 Xem chi tiết ảnh bao gồm thông tin tác giả, kích thước, v.v.
- 💫 Giao diện đẹp với hiệu ứng hover và animation mượt mà
- 📱 Thiết kế responsive hoạt động tốt trên mọi thiết bị

### Công Nghệ Sử Dụng

- **React 19** - Thư viện UI
- **Vite** - Build tool hiệu suất cao
- **Tailwind CSS** - Framework CSS utility-first
- **React Router DOM** - Quản lý routing
- **Picsum Photos API** - Nguồn cung cấp ảnh

## 🚀 Link Deploy

📌 **Truy cập ứng dụng tại**: https://picsum-gallery-flame.vercel.app/

Ứng dụng được host trên Vercel 

## 📥 Hướng Dẫn Cài Đặt

### Yêu Cầu Trước Khi Cài Đặt

Đảm bảo bạn đã cài đặt các công cụ sau trên máy tính:

- **Node.js** (v16 trở lên) - [Tải về](https://nodejs.org/)
- **npm** (đi kèm với Node.js) hoặc **yarn**

Kiểm tra phiên bản:
```bash
node --version
npm --version
```

### Bước 1: Clone Repository

```bash
git clone https://github.com/LCHLong/picsum-gallery.git
cd picsum-gallery
```

### Bước 2: Cài Đặt Dependencies

Cài đặt tất cả các package phụ thuộc:

```bash
npm install
```

### Bước 3: Chạy Ứng Dụng Ở Chế Độ Development

Khởi động máy chủ development với hot reload:

```bash
npm run dev
```

Mở trình duyệt và truy cập: **http://localhost:5173/**

### Bước 4: Build Cho Production

Để build ứng dụng cho môi trường production:

```bash
npm run build
```

## 📁 Cấu Trúc Thư Mục

```
picsum-gallery/
├── src/
│   ├── components/
│   │   ├── Loader.jsx           # Component hiển thị loading spinner
│   │   └── PhotoCard.jsx        # Component card hiển thị ảnh
│   ├── pages/
│   │   ├── PhotoList.jsx        # Trang danh sách ảnh (infinite scroll)
│   │   └── PhotoDetail.jsx      # Trang chi tiết ảnh
│   ├── services/
│   │   └── photoAPI.js          # Service gọi API Picsum Photos
│   ├── App.jsx                  # Component chính của app
│   ├── App.css                  # Styling
│   ├── index.css                # Global styles
│   └── main.jsx                 # Entry point
├── public/                      # Các file tĩnh
├── index.html                   # HTML template
├── vite.config.js               # Cấu hình Vite
├── tailwind.config.js           # Cấu hình Tailwind CSS
├── postcss.config.js            # Cấu hình PostCSS
├── eslint.config.js             # Cấu hình ESLint
├── package.json                 # Dependencies và scripts
└── README.md                    # File này
```

## 🎮 Các Lệnh Npm Sử Dụng

| Lệnh              | Mô Tả                                    |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Khởi động server development (port 5173) |
| `npm run build`   | Build ứng dụng cho production            |
| `npm run preview` | Xem preview build production             |
| `npm run lint`    | Kiểm tra code style với ESLint           |

