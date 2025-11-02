# ==== STAGE 1: BUILD STAGE (Giai đoạn xây dựng) ====
# Sử dụng một image Node.js đầy đủ để cài đặt dependencies và build project.
FROM node:20-alpine AS build

# Đặt thư mục làm việc trong container
WORKDIR /app

# Copy các file cần thiết cho việc cài đặt dependencies
COPY package.json package-lock.json ./

# Cài đặt dependencies
# Nếu bạn dùng yarn, thay bằng RUN yarn install
RUN npm install

# Copy toàn bộ source code vào thư mục làm việc
COPY . .

# Chạy lệnh build (lệnh này sẽ tạo ra thư mục 'dist' hoặc 'build')
# Giả định lệnh build là 'npm run build' và output là thư mục 'dist'
RUN npm run build


# ==== STAGE 2: PRODUCTION STAGE (Giai đoạn phục vụ bằng Nginx) ====
# Sử dụng Nginx siêu nhẹ (chỉ khoảng 20MB) để phục vụ các file tĩnh (HTML/CSS/JS)
FROM nginx:stable-alpine AS production

# Copy thư mục build từ Stage 1 sang thư mục phục vụ của Nginx
# Thay thế 'dist' bằng thư mục output thực tế của bạn (ví dụ: 'build' cho React)
COPY --from=build /app/dist /usr/share/nginx/html

# (TÙY CHỌN) Copy cấu hình Nginx tùy chỉnh nếu cần
# Nếu không có file cấu hình tùy chỉnh, Nginx sẽ dùng default (thường là ok)
# COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Port mặc định mà Nginx sẽ lắng nghe (thường là 80)
EXPOSE 80

# Chạy Nginx (đây là lệnh mặc định của image nginx)
CMD ["nginx", "-g", "daemon off;"]

