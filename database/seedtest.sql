
GRANT ALL PRIVILEGES ON testFastAPI.* TO 'phone_app'@'localhost';

-- Thêm công ty
INSERT INTO company (name, description) VALUES
('Apple', 'Công ty công nghệ nổi tiếng'),
('Samsung', 'Công ty điện tử Hàn Quốc');

-- Thêm sản phẩm
INSERT INTO product (name, description, company_id) VALUES
('iPhone X', 'Điện thoại Apple', 1),
('Galaxy S21', 'Điện thoại Samsung', 2);

-- Thêm account
INSERT INTO account (name, email) VALUES
('Nguyen Van A', 'a@gmail.com'),
('Tran Thi B', 'b@gmail.com');

-- Thêm favorite
INSERT INTO favorite (product_id, user_id) VALUES
(1, 1),
(2, 2);