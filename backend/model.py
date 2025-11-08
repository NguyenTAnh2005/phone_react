from sqlalchemy import Column, Integer, String,Text,ForeignKey
from database import Base
from sqlalchemy.orm import relationship


# 1. Dịch bảng 'company'
class Company(Base):
    __tablename__ = "company"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    description = Column(Text)

    product = relationship("Product", back_populates="company")

# --- GIẢI THÍCH (Ghi chú để học) ---
#   - class Company(Base): 
#       Giống như 'CREATE TABLE company...'. 
#       Chúng ta kế thừa từ 'Base' (trong file database.py).
#
#   - __tablename__ = "company": 
#       Báo cho SQLAlchemy biết Class này tương ứng với 
#       bảng (table) tên là "company" trong MySQL.
#
#   - id = Column(Integer, ...): 
#       Giống như 'id INT AUTO_INCREMENT...'
#
#   - ForeignKey("company.id"): 
#       Đây là cách định nghĩa khoá ngoại, giống như 
#       'FOREIGN KEY (company_id) REFERENCES company(id)'
#
# 💡 "Phép thuật" (Mối quan hệ - relationship):
#
#   - Dòng 'ForeignKey' -> chỉ liên kết trong CSDL (SQL).
#   - Dòng 'relationship' -> liên kết trong code (Python).
#
#   Ví dụ:
#   company = relationship("Company", back_populates="products")
#
#   Dòng này cho phép bạn làm một việc rất tuyệt:
#   Khi bạn lấy được một 'product' (sản phẩm), bạn có thể chỉ cần gõ
#   'product.company' và SQLAlchemy sẽ tự động lấy thông tin 
#   hãng (company) của sản phẩm đó cho bạn.

# 2. Dịch bảng 'product'
class Product(Base):
    __tablename__= "product"

    id=Column(Integer, primary_key=True, index=True)
    name=Column(String(100), nullable=False)
    description=Column(Text)
    company_id=Column(Integer, ForeignKey("company.id"))
    #1 CTy co nhieu sp
    company= relationship("Company", back_populates="product")

    favorite=relationship("Favorite", back_populates="product")

# 3 Bang Account 
class Account (Base):
    __tablename__= "account"
    id=Column(Integer, primary_key=True, index=True)
    name=Column(String(100), nullable=False)
    email=Column(String(150), nullable=False, unique=True)

    favorite=relationship("Favorite", back_populates="account")

# 4 Bang Favorite
class Favorite (Base):
    __tablename__= "favorite"
    id=Column(Integer, primary_key=True, index=True, autoincrement=True)
    account_id=Column(Integer, ForeignKey("account.id"))
    product_id=Column(Integer, ForeignKey("product.id"))

    account=relationship("Account", back_populates="favorite")
    product=relationship("Product", back_populates="favorite")