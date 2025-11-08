from fastapi import FastAPI
from database import engine,SessionLocal
import model

# --- 3. Dòng "Thần Kỳ" ---
# Dòng này ra lệnh cho SQLAlchemy:
# "Hãy nhìn vào tất cả các Class kế thừa từ Base (trong file models.py)
# và TẠO TẤT CẢ các bảng đó trong CSDL (sử dụng 'engine' để kết nối)"

model.Base.metadata.create_all(bind=engine)

# --- Tạo ứng dụng FastAPI cơ bản ---
app = FastAPI()

db=SessionLocal()

@app.get("/")
async def read_root():
    return {"Hello": "World"}

@app.get("/getProduct/")
async def get_product():
    products=db.query(model.Product).all()
    return dict(products=products)
@app.get("/getCompany/")
async def get_company():
    companies=db.query(model.Company).all()
    return dict(companies=companies)
@app.get("/getAccount/")
async def get_account():
    accounts=db.query(model.Account).all()
    return dict(accounts=accounts)
@app.get("/getFavorite/")
async def get_favorite():
    favorites=db.query(model.Favorite).all()
    return dict(favorites=favorites)