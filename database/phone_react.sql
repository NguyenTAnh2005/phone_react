CREATE DATABASE phone_react ;
USE phone_react;

drop database phone_react;

CREATE TABLE Company (
    company_id VARCHAR(10) PRIMARY KEY,
    company_name VARCHAR(100) CHARACTER SET utf8mb4 NOT NULL,
    company_desc VARCHAR(1000) CHARACTER SET utf8mb4 NOT NULL
);

CREATE TABLE Product (
    product_id VARCHAR(10) PRIMARY KEY,
    company_id VARCHAR(10),
    product_name VARCHAR(100) CHARACTER SET utf8mb4 NOT NULL,
    product_desc TEXT CHARACTER SET utf8mb4 NOT NULL,
    FOREIGN KEY (company_id) REFERENCES Company(company_id)
);

CREATE TABLE Phone (
    product_id VARCHAR(10) PRIMARY KEY,
    phone_chip VARCHAR(50) CHARACTER SET utf8mb4 NOT NULL,
    phone_screen_size VARCHAR(30) CHARACTER SET utf8mb4 NOT NULL,
    phone_front_cam VARCHAR(50) CHARACTER SET utf8mb4 NOT NULL,
    phone_behind_cam VARCHAR(50) CHARACTER SET utf8mb4 NOT NULL,
    phone_battery INT NOT NULL,
    phone_system VARCHAR(50) CHARACTER SET utf8mb4 NOT NULL,
    phone_charging_port VARCHAR(50) CHARACTER SET utf8mb4 NOT NULL,
    phone_sim_card TINYINT NOT NULL,
    phone_nfc TINYINT(1) NOT NULL,
    phone_ear_phone VARCHAR(50) CHARACTER SET utf8mb4 NOT NULL,
    phone_memory_card TINYINT(1) NOT NULL,
    phone_desc TEXT CHARACTER SET utf8mb4 NOT NULL,
    FOREIGN KEY (product_id) REFERENCES Product(product_id)
);

CREATE TABLE Variant_Phone (
    variant_id VARCHAR(10) PRIMARY KEY,
    product_id VARCHAR(10),
    variant_ph_ram INT NOT NULL,
    variant_ph_rom INT NOT NULL,
    variant_ph_color VARCHAR(50) CHARACTER SET utf8mb4 NOT NULL,
    variant_ph_org_price BIGINT NOT NULL,
    variant_ph_new_price BIGINT NOT NULL,
    variant_ph_final_price BIGINT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES Product(product_id)
);

CREATE TABLE Stock (
    variant_id VARCHAR(10) PRIMARY KEY,
    stock_count INT NOT NULL,
    FOREIGN KEY (variant_id) REFERENCES Variant_Phone(variant_id)
);

CREATE TABLE Account (
    account_id VARCHAR(10) PRIMARY KEY,
    account_first_name VARCHAR(30) CHARACTER SET utf8mb4 NOT NULL,
    account_last_name VARCHAR(30) CHARACTER SET utf8mb4 NOT NULL,
    account_email VARCHAR(30) NOT NULL,
    account_gender TINYINT(1) NOT NULL,
    account_date DATETIME NOT NULL,
    account_password VARBINARY(100) NOT NULL,
    account_access VARCHAR(10) CHARACTER SET utf8mb4 NOT NULL
);

CREATE TABLE Hotline (
    hotline_id VARCHAR(10) PRIMARY KEY,
    account_id VARCHAR(10) NOT NULL,
    hotline_name VARCHAR(50) CHARACTER SET utf8mb4 NOT NULL,
    hotline_address VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL,
    hotline_phonenumber BIGINT NOT NULL,
    hotline_default TINYINT(1) NOT NULL,
    FOREIGN KEY (account_id) REFERENCES Account(account_id)
);

CREATE TABLE Cart (
    account_id VARCHAR(10) PRIMARY KEY,
    product_id VARCHAR(10) NOT NULL,
    cart_count INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES Product(product_id)
);

CREATE TABLE `Order` (
    order_id VARCHAR(10) PRIMARY KEY,
    hotline_id VARCHAR(10) NOT NULL,
    order_buy_time DATETIME NOT NULL,
    order_rec_time DATETIME NOT NULL,
    order_type_pay VARCHAR(30) CHARACTER SET utf8mb4 NOT NULL,
    order_state VARCHAR(30) CHARACTER SET utf8mb4 NOT NULL,
    order_total_price BIGINT NOT NULL,
    FOREIGN KEY (hotline_id) REFERENCES Hotline(hotline_id)
);

CREATE TABLE Detail (
    detail_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id VARCHAR(10),
    product_id VARCHAR(10),
    variant_id VARCHAR(10),
    detail_name VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL,
    detail_count INT NOT NULL,
    detail_total_price BIGINT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES `Order`(order_id),
    FOREIGN KEY (product_id) REFERENCES Product(product_id),
    FOREIGN KEY (variant_id) REFERENCES Variant_Phone(variant_id)
);

CREATE TABLE Blog (
    blog_id VARCHAR(10) PRIMARY KEY,
    blog_name VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL,
    blog_author VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL,
    blog_link TEXT CHARACTER SET utf8mb4 NOT NULL,
    blog_time DATETIME NOT NULL
);
