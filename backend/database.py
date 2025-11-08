from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv
load_dotenv()

# 1. "Địa chỉ" CSDL 
#    Định dạng là: "mysql+DRIVER://USER:PASSWORD@HOST/DATABASE"
SQLALCHEMY_DATABASE_URL=os.getenv("SQLALCHEMY_DATABASE_URL")

# 2. Tạo engine kết nối tới CSDL
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# 3. Tạo session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 4. Tạo lớp cơ sở để định nghĩa các mô hình (models)
Base = declarative_base()


