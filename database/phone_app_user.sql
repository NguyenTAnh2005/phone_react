CREATE USER 'phone_app'@'localhost' IDENTIFIED BY 'PhoneApp1';
GRANT ALL PRIVILEGES ON phone_react.* TO 'phone_app'@'localhost';
FLUSH PRIVILEGES;