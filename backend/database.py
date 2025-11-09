from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

# 1. "Địa chỉ" CSDL 
DB_URL=os.getenv("DB_URL","mysql+mysqldb://user1:mysqluser1@localhost/test")
# Bị lỗi ở đoạn khai báo biến môi trường và import vào ko đc biến

# 2. Tạo engine kết nối tới CSDL
engine=create_engine(DB_URL, pool_pre_ping=True)

# 3. Tạo session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 4. Tạo lớp cơ sở để định nghĩa các mô hình (models)
Base = declarative_base()


