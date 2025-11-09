from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

# Import tất cả "linh kiện" chúng ta đã tạo
import model
from database import engine, SessionLocal  # <-- Import "Người Thu Ngân"

# --- Dòng "Thần Kỳ" ---
# (Vẫn giữ lại để tạo bảng khi khởi động)
model.Base.metadata.create_all(bind=engine)

# --- Khởi tạo FastAPI ---
app = FastAPI()

# --- 1. "Hệ thống Bơm" (Dependency Injection) ---
# Nó sẽ tự động tạo "cái ly" (session) MỚI cho mỗi API gọi đến
def get_db():
    db = SessionLocal() # Tạo "cái ly" MỚI
    try:
        yield db  # Đưa "cái ly" cho API dùng
    finally:
        db.close() # Vứt "cái ly" đi sau khi API dùng xong

@app.get("/")
async def read_root():
    return {"Hello": "World"}

# db: Session = Depends(get_db) <-- "Bơm" cái ly mới vào đây
@app.get("/getProduct/")
def get_product(db: Session = Depends(get_db)):
    products = db.query(model.Product).all()
    return dict(products=products)

@app.get("/getCompany/")
def get_company(db: Session = Depends(get_db)):
    companies = db.query(model.Company).all()
    return dict(companies=companies)

@app.get("/getAccount/")
def get_account(db: Session = Depends(get_db)):
    accounts = db.query(model.Account).all()
    return dict(accounts=accounts)

@app.get("/getFavorite/")
def get_favorite(db: Session = Depends(get_db)):
    favorites = db.query(model.Favorite).all()
    return dict(favorites=favorites)