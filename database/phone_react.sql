create database phone_react;
use phone_react
drop database phone_react;

-- Bảng Company
CREATE TABLE Company (
    company_id INT AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(100) NOT NULL,
    company_desc VARCHAR(1000) NOT NULL
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Bảng ProductP
CREATE TABLE ProductP (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    company_id INT,
    product_name VARCHAR(100) NOT NULL,
    product_desc TEXT NOT NULL,
    FOREIGN KEY (company_id) REFERENCES Company(company_id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Bảng Phone
CREATE TABLE Phone (
    product_id INT PRIMARY KEY,
    phone_chip VARCHAR(50) NOT NULL,
    phone_screen_size VARCHAR(30) NOT NULL,
    phone_front_cam VARCHAR(50) NOT NULL,
    phone_behind_cam VARCHAR(50) NOT NULL,
    phone_battery INT NOT NULL,
    phone_system VARCHAR(50) NOT NULL,
    phone_charging_port VARCHAR(50) NOT NULL,
    phone_sim_card TINYINT NOT NULL,
    phone_nfc TINYINT(1) NOT NULL,
    phone_ear_phone VARCHAR(50) NOT NULL,
    phone_memory_card TINYINT(1) NOT NULL,
    phone_desc TEXT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES ProductP(product_id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Bảng Variant_Phone
CREATE TABLE Variant_Phone (
    variant_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    variant_ph_ram INT NOT NULL,
    variant_ph_rom INT NOT NULL,
    variant_ph_color VARCHAR(50) NOT NULL,
    variant_ph_org_price BIGINT NOT NULL,
    variant_ph_new_price BIGINT NOT NULL,
    variant_ph_final_price BIGINT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES ProductP(product_id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Bảng Stock
CREATE TABLE Stock (
    variant_id INT PRIMARY KEY,
    stock_count INT NOT NULL CHECK (stock_count >= 0),
    FOREIGN KEY (variant_id) REFERENCES Variant_Phone(variant_id)
);

-- Bảng Account
CREATE TABLE Account (
    account_id INT AUTO_INCREMENT PRIMARY KEY,
    account_first_name VARCHAR(30) NOT NULL,
    account_last_name VARCHAR(30) NOT NULL,
    account_email VARCHAR(30) NOT NULL,
    account_gender TINYINT(1) NOT NULL,
    account_date DATETIME NOT NULL,
    account_password VARBINARY(100) NOT NULL,
    account_access VARCHAR(10) NOT NULL
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Bảng Hotline
CREATE TABLE Hotline (
    hotline_id INT AUTO_INCREMENT PRIMARY KEY,
    account_id INT,
    hotline_name VARCHAR(50) NOT NULL,
    hotline_address VARCHAR(255) NOT NULL,
    hotline_phonenumber BIGINT NOT NULL,
    hotline_default TINYINT(1) NOT NULL,
    FOREIGN KEY (account_id) REFERENCES Account(account_id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Bảng Cart
CREATE TABLE Cart (
    cart_id INT AUTO_INCREMENT PRIMARY KEY,
    account_id INT,
    variant_id INT,
    cart_count INT NOT NULL CHECK (cart_count >= 0),
    FOREIGN KEY (account_id) REFERENCES Account(account_id),
    FOREIGN KEY (variant_id) REFERENCES Variant_Phone(variant_id)
);

-- Bảng OrderP
CREATE TABLE OrderP (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    account_id INT,
    hotline_id INT,
    order_buy_time DATETIME NOT NULL,
    order_rec_time DATETIME NOT NULL,
    order_type_pay VARCHAR(30) NOT NULL,
    order_state VARCHAR(30) NOT NULL,
    order_total_price BIGINT NOT NULL,
    FOREIGN KEY (hotline_id) REFERENCES Hotline(hotline_id),
    FOREIGN KEY (account_id) REFERENCES Account(account_id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Bảng Detail
CREATE TABLE Detail (
    detail_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    variant_id INT,
    detail_name VARCHAR(255) NOT NULL,
    detail_count INT NOT NULL,
    detail_total_price BIGINT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES OrderP(order_id),
    FOREIGN KEY (variant_id) REFERENCES Variant_Phone(variant_id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Bảng Blog
CREATE TABLE Blog (
    blog_id INT AUTO_INCREMENT PRIMARY KEY,
    blog_name VARCHAR(255) NOT NULL,
    blog_author VARCHAR(255) NOT NULL,
    blog_link TEXT NOT NULL,
    blog_time DATETIME NOT NULL
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;