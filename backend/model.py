from sqlalchemy import Column, Integer, String, Text, ForeignKey, Boolean, DateTime, BigInteger, LargeBinary
from database import Base
from sqlalchemy.orm import relationship


# ------------------- COMPANY -------------------
class Company(Base):
    __tablename__ = "Company"
    company_id = Column(Integer, primary_key=True, autoincrement=True)
    company_name = Column(String(100), nullable=False)
    company_desc = Column(String(1000), nullable=False)

    # 1 Company có nhiều Product
    products = relationship("Product", back_populates="company")


# ------------------- PRODUCT -------------------
class Product(Base):
    __tablename__ = "Product"
    product_id = Column(Integer, primary_key=True, autoincrement=True)
    company_id = Column(Integer, ForeignKey("Company.company_id"))
    product_name = Column(String(100), nullable=False)
    product_desc = Column(Text, nullable=False)

    # Nhiều Product thuộc 1 Company
    company = relationship("Company", back_populates="products")
    # 1 Product có 1 Phone (1-1)
    phone = relationship("Phone", uselist=False, back_populates="product")
    # 1 Product có nhiều Variant
    variants = relationship("Variant_Phone", back_populates="product")

    # === THÊM MỚI QUAN HỆ NÀY ===
    # 1 Product có nhiều Product_Image (Thư viện ảnh)
    # cascade="all, delete-orphan" sẽ xóa tất cả ảnh nếu Product bị xóa
    images = relationship(
        "Product_Image", 
        back_populates="product", 
        cascade="all, delete-orphan"
    )
# ------------------- PRODUCT IMAGE (Thư viện ảnh) -------------------
class Product_Image(Base):
    __tablename__ = "Product_Image"
    image_id = Column(Integer, primary_key=True, autoincrement=True)
    product_id = Column(Integer, ForeignKey("Product.product_id"), nullable=False)
    image_url = Column(String(255), nullable=False) # Đường dẫn (URL) tới ảnh

    # Nhiều Product_Image thuộc về 1 Product
    product = relationship("Product", back_populates="images")

# ------------------- PHONE -------------------
class Phone(Base):
    __tablename__ = "Phone"
    product_id = Column(Integer, ForeignKey("Product.product_id"), primary_key=True)
    phone_chip = Column(String(50), nullable=False)
    phone_screen_size = Column(String(30), nullable=False)
    phone_front_cam = Column(String(50), nullable=False)
    phone_behind_cam = Column(String(50), nullable=False)
    phone_battery = Column(Integer, nullable=False)
    phone_system = Column(String(50), nullable=False)
    phone_charging_port = Column(String(50), nullable=False)
    phone_sim_card = Column(Integer, nullable=False)
    phone_nfc = Column(Boolean, nullable=False)
    phone_ear_phone = Column(String(50), nullable=False)
    phone_memory_card = Column(Boolean, nullable=False)
    phone_desc = Column(Text, nullable=False)

    # 1 Phone thuộc 1 Product (1-1)
    product = relationship("Product", back_populates="phone")


# ------------------- VARIANT PHONE -------------------
class Variant_Phone(Base):
    __tablename__ = "Variant_Phone"
    variant_id = Column(Integer, primary_key=True, autoincrement=True)
    product_id = Column(Integer, ForeignKey("Product.product_id"))
    variant_ph_ram = Column(Integer, nullable=False)
    variant_ph_rom = Column(Integer, nullable=False)
    variant_ph_color = Column(String(50), nullable=False)
    variant_ph_org_price = Column(BigInteger, nullable=False)
    variant_ph_new_price = Column(BigInteger, nullable=False)
    variant_ph_final_price = Column(BigInteger, nullable=False)
    variant_ph_img = Column(String(255), nullable=True)
    # Nhiều Variant thuộc 1 Product
    product = relationship("Product", back_populates="variants")
    
    # 1 Variant có 1 Stock
    stock = relationship("Stock", uselist=False, back_populates="variant")
    
    # 1 Variant có thể nằm trong nhiều Detail
    details = relationship("Detail", back_populates="variant")
    
    # 1 Variant có thể nằm trong nhiều Cart (item)
    cart_items = relationship("Cart", back_populates="variant")


# ------------------- STOCK -------------------
class Stock(Base):
    __tablename__ = "Stock"
    variant_id = Column(Integer, ForeignKey("Variant_Phone.variant_id"), primary_key=True)
    stock_count = Column(Integer, nullable=False)

    # Logic 1-1 (Đã thống nhất): 1 Stock thuộc 1 Variant
    variant = relationship("Variant_Phone", back_populates="stock")


# ------------------- ACCOUNT -------------------
class Account(Base):
    __tablename__ = "Account"
    account_id = Column(Integer, primary_key=True, autoincrement=True)
    account_first_name = Column(String(30), nullable=False)
    account_last_name = Column(String(30), nullable=False)
    account_email = Column(String(30), nullable=False, unique=True)
    account_gender = Column(Boolean, nullable=False)
    account_date = Column(DateTime, nullable=False)
    account_password = Column(String(255), nullable=False) # Đổi sang String để lưu hash
    account_access = Column(String(10), nullable=False)

    # 1 Account có nhiều Hotline
    hotlines = relationship("Hotline", back_populates="account")
    
    #  1 Account có nhiều Cart (item)
    cart_items = relationship("Cart", back_populates="account")
    
    # 1 Account có nhiều Order_ (khớp tên class Order_)
    orders_ = relationship("Order_", back_populates="account")


# ------------------- HOTLINE (Địa chỉ giao hàng) -------------------
class Hotline(Base):
    __tablename__ = "Hotline"
    hotline_id = Column(Integer, primary_key=True, autoincrement=True)
    account_id = Column(Integer, ForeignKey("Account.account_id"))
    hotline_name = Column(String(50), nullable=False)
    hotline_address = Column(String(255), nullable=False)
    hotline_phonenumber = Column(BigInteger, nullable=False)
    hotline_default = Column(Boolean, nullable=False)

    # Nhiều Hotline thuộc 1 Account
    account = relationship("Account", back_populates="hotlines")
    
    # 1 Hotline có thể dùng cho nhiều Order_
    orders_ = relationship("Order_", back_populates="hotline")


# ------------------- CART -------------------
class Cart(Base):
    __tablename__ = "Cart"
    cart_id = Column(Integer, primary_key=True, autoincrement=True)
    account_id = Column(Integer, ForeignKey("Account.account_id"))
    variant_id = Column(Integer, ForeignKey("Variant_Phone.variant_id"))
    cart_count = Column(Integer, nullable=False, default=1) # Thêm cột count (có trong SQL)

    # Nhiều Cart (item) thuộc 1 Account
    account = relationship("Account", back_populates="cart_items")
    
    # Nhiều Cart (item) trỏ đến 1 Variant
    variant = relationship("Variant_Phone", back_populates="cart_items")


# ------------------- ORDERS -------------------
# Giữ nguyên tên class Order_ và table Order_ theo yêu cầu của bạn
class Order_(Base): 
    __tablename__ = "Order_" # Tên bảng
    order_id = Column(Integer, primary_key=True, autoincrement=True)
    account_id = Column(Integer, ForeignKey("Account.account_id"))
    hotline_id = Column(Integer, ForeignKey("Hotline.hotline_id"))
    order_buy_time = Column(DateTime, nullable=False)
    order_rec_time = Column(DateTime, nullable=False)
    order_type_pay = Column(String(30), nullable=False)
    order_state = Column(String(30), nullable=False)
    order_total_price = Column(BigInteger, nullable=False)

    # Nhiều Order_ thuộc 1 Account
    account = relationship("Account", back_populates="orders_")
    
    # Nhiều Order_ dùng 1 Hotline
    hotline = relationship("Hotline", back_populates="orders_")
    
    # 1 Order_ có nhiều Detail
    details = relationship("Detail", back_populates="order_")


# ------------------- DETAIL -------------------
class Detail(Base):
    __tablename__ = "Detail"
    detail_id = Column(Integer, primary_key=True, autoincrement=True)
    order_id = Column(Integer, ForeignKey("Order_.order_id")) # Khớp tên bảng Order_
    variant_id = Column(Integer, ForeignKey("Variant_Phone.variant_id"))
    detail_name = Column(String(255), nullable=False)
    detail_count = Column(Integer, nullable=False)
    detail_total_price = Column(BigInteger, nullable=False)

    # Nhiều Detail thuộc 1 Order_
    order_ = relationship("Order_", back_populates="details")
    
    # Nhiều Detail trỏ đến 1 Variant
    variant = relationship("Variant_Phone", back_populates="details")


# ------------------- BLOG -------------------
class Blog(Base):
    __tablename__ = "Blog"
    blog_id = Column(Integer, primary_key=True, autoincrement=True)
    blog_name = Column(String(255), nullable=False)
    blog_author = Column(String(255), nullable=False)
    blog_link = Column(Text, nullable=False)
    blog_time = Column(DateTime, nullable=False)
    blog_img = Column(String(255), nullable=True)