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
Cách 1: Tụ tải 1 số thư viện, gói thủ công (nếu như máy bạn ko chạy docker được )
Cách 2: bên dươi cách 1 
---

## Cách 1
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

-----

# Hướng Dẫn Khởi Động Ứng Dụng Frontend (Docker) 🐳

Chào mừng đến với project Frontend\! Bạn có thể khởi động ứng dụng này một cách dễ dàng và nhất quán bằng Docker.

## Yêu Cầu Bắt Buộc

1.  Đã cài đặt **Docker Desktop** và đang chạy trên máy của bạn.

-----

## Các Bước Khởi Động 🚀

Bạn chỉ cần thực hiện 3 bước sau đây trong Terminal:

### Bước 1: Chuẩn bị Môi trường

1.  Tải toàn bộ project về máy tính của bạn.
2.  Mở project trong VS Code và mở **Terminal** (chọn **CMD** hoặc **Bash**).
3.  Di chuyển vào thư mục Frontend chứa file `Dockerfile`:
    ```bash
    cd frontend
    ```

### Bước 2: Build Docker Image (Tạo Bản Mẫu)

Chạy lệnh sau để Docker tự động build ứng dụng của bạn và tạo ra một Image.

```bash
docker build -t <TÊN_APP_CỦA_BẠN>:latest .
```

  * Thay thế `<TÊN_APP_CỦA_BẠN>` bằng một tên tùy ý (ví dụ: `my-order-fe`).

**Ví dụ log thành công:**

```
...
build 5/6 COPY . .
build 6/6 RUN npm run build
...
=> naming to docker.io/library/<TÊN_APP_CỦA_BẠN>:latest
...
```

Sau bước này, Image đã được tạo thành công trên máy của bạn.

### Bước 3: Chạy Container (Khởi động Ứng dụng)

Sử dụng lệnh `docker run` để khởi động Image vừa tạo thành Container đang chạy:

```bash
docker run -d -p 8080:80 <TÊN_APP_CỦA_BẠN>:latest
```

  * **Lưu ý:** `<TÊN_APP_CỦA_BẠN>` phải **trùng khớp** với tên bạn đã dùng ở Bước 2.
  * **Port:**
      * **`80`** là cổng mặc định mà Nginx bên trong Container đang lắng nghe (nên giữ nguyên).
      * **`8080`** là cổng trên máy Host (máy của bạn). Bạn có thể thay đổi cổng này nếu 8080 bị chiếm dụng.

### Bước 4: Truy cập Ứng dụng

Mở trình duyệt và truy cập vào địa chỉ:

```
http://localhost:8080
```


-----

## 5\. Tắt Ứng Dụng và Dọn dẹp (Cleanup) 🧹

Khi không sử dụng ứng dụng nữa, bạn nên tắt và xóa Container để giải phóng tài nguyên hệ thống.

### Cách 1: Dùng Docker Desktop App (Dễ nhất)

1.  **Mở Docker Desktop:** Chuyển sang giao diện của ứng dụng Docker Desktop.
2.  **Dừng:** Tìm Container có tên Image là `<TÊN_APP_CỦA_BẠN>:latest` hoặc tên ngẫu nhiên Docker đặt cho nó (ví dụ: `keen_sammet`).
3.  Nhấn nút **Stop (hình vuông)** để dừng Container.
4.  Nhấn nút **Remove (hình thùng rác)** để xóa Container đã dừng.

### Cách 2: Dùng Lệnh Terminal (Nhanh chóng)

1.  **Tìm ID Container đang chạy:**
```bash
docker ps
```
2.  **Dừng Container:** Sử dụng `CONTAINER ID` (ví dụ: `a3e1f5c`) hoặc `NAMES` (ví dụ: `keen_sammet`) tìm được ở bước 1.
```bash
docker stop <ID_HOẶC_TÊN_CONTAINER>
```
3.  **Xóa Container (Tùy chọn):** Sau khi dừng, nếu bạn muốn xóa hẳn Container để giải phóng dung lượng:
```bash
docker rm <ID_HOẶC_TÊN_CONTAINER>
```

**Lưu ý:** Việc xóa Container (`docker rm`) **không xóa Image** (bản mẫu). Bạn có thể chạy lại ứng dụng bất cứ lúc nào bằng lệnh `docker run` mà không cần build lại.

-----

nội dung được soạn thảo bởi tôi và được chỉnh style + nội dung  bởi Chat GPT! 
-----

✨ Chúc bạn cài đặt thành công và có trải nghiệm phát triển tuyệt vời\!




