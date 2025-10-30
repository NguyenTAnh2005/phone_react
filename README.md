# 📱 Dự án Website Bán Điện Thoại Cũ

## 🌐 Demo
👉 [Truy cập website tại đây](https://phone-react-nine.vercel.app/)

---

## 🧩 Giới thiệu

Website bán điện thoại cũ cho phép người dùng xem danh sách sản phẩm, xem chi tiết từng điện thoại và thêm vào giỏ hàng hoặc danh sách yêu thích.  
Dự án được xây dựng với **ReactJS** kết hợp **Tailwind CSS** để tạo giao diện hiện đại, tối ưu và dễ mở rộng.

---

## 🚀 Công nghệ sử dụng
+ Html, Css, JavaScript 
+ Thư viện, FrameWork: Tailwind CSS, React JS

| Công nghệ | Mục đích sử dụng |
|------------|------------------|
| **HTML** | Xây dựng cấu trúc trang web |
| **Tailwind CSS** | Thiết kế giao diện |
| **ReactJS** | ,Xử lý logic và tương tác người dùng, xây dựng giao diện theo component, quản lý trạng thái |
| **Vercel** | Deploy website online |

---

## ⚙️ Tính năng chính
Chưa có dữ liệu chính thức và chính xác

---

## 📂 Cấu trúc thư mục
```bash
📦 frontend
├── 📁 public                  # File tĩnh (index.html, favicon, ảnh, v.v.)
├── 📁 src                     # Mã nguồn chính của ứng dụng
│   ├── 📁 assets              # Hình ảnh, icon, dữ liệu tĩnh
│   ├── 📁 Components          # Các component tái sử dụng (Button, Modal, Input, v.v.)
│   ├── 📁 Data_Test           # Dữ liệu mẫu dùng để hiển thị sản phẩm (JSON)
│   ├── 📁 Layout              # Cấu trúc bố cục chung (Header, Footer, Navbar)
│   ├── 📁 Pages               # Các trang chính của website (Home, ProductDetail, Cart, v.v.)
│   ├── 📁 utils               # Hàm tiện ích (xử lý logic, định dạng dữ liệu, v.v.)
│   │   └── utils.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
├── vercel.json
├── vite.config.js
└── README.md

---
```

# React App Setup Guide

Chào mừng bạn! Đây là hướng dẫn chi tiết để chạy ứng dụng React trên máy bạn.

---

## Yêu cầu

* **Node.js**: Cài đặt trước khi bắt đầu.

## Tạo App React với Vite

1. Tải project của tôi về máy bạn.

2. Mở **cmd** và cd vào thư mục bạn muốn tạo app React mới.

3. Chạy lệnh:

   ```bash
   npm create vite@latest
   ```

4. Thực hiện các bước theo hướng dẫn:

   * Đặt tên project.
   * Chọn **React**.
   * Chọn **JavaScript**.
   * **Use rolldown-vite (Experimental)?** Chọn **No**.
   * **Install with npm and start now?** Chọn **Yes**.

5. Chờ app chạy.

6. Mở project trong **VS Code**.

7. Mở **cmd** trong VS Code để thao tác tiện hơn.

## Cài đặt các thư viện cần thiết

### React Router

```bash
npm install react-router-dom@6
```

### Tailwind CSS

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

> Lệnh trên sẽ tạo ra 2 file cấu hình:
>
> * `tailwind.config.js`
> * `postcss.config.js`

8. Cấu hình các file trên theo project gốc.
9. Cấu hình `index.css` và `app.css` như trong project của tôi để đảm bảo tất cả tài nguyên đều hoạt động.

## Sao chép mã nguồn

10. Copy toàn bộ thư mục **src** từ project gốc và paste vào thư mục **src** của bạn.
11. Mở **cmd** tại gốc dự án và chạy:

```bash
npm run dev
```

12. Ứng dụng React sẽ chạy thành công và bạn có thể bắt đầu phát triển.

---

✨ Chúc bạn cài đặt thành công và có trải nghiệm phát triển tuyệt vời!



