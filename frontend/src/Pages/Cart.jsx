import { useState } from "react";
import { cart_list_product } from "../Data_Test/Data_Home_Test"
import { CartProduct } from "../Components/product_card"
import { scrollToTopSmooth } from "../utils/utils";

export function Cart({ list_product = cart_list_product }) {
    const [listProduct, setListProduct] = useState(list_product);
    const [selectedProducts, setSelectedProducts] = useState([]); // State lưu danh sách sp đã chọn

    const handleSelect = (product) => {
        setSelectedProducts((prev) =>
            // hàm some check coi thử có ít nhất 1 ptu can tim o trong mảng hay ko
            // Ở đây kết hợp some => true là mảng có chứa => trả về mảng mới vois filter - lọc BỎ cái ptu đã tìm đó
            // else thì  [...prev, product]. Dấu ... gọi là spread operator trong JavaScript. Nó “trải” toàn bộ phần tử của mảng prev ra trong mảng mới.
            //  Sau đó bạn thêm phần tử product vào cuối.
            prev.some((p) => { p.product_id === product.product_id })
                ? prev.filter((id) => id !== product.product_id)
                : [...prev, product]
        );
    }

    const handleDelete = () => {
        alert("Đã xóa các sản phẩm dược chọn, xem thông tin bên console!");
        console.log("Cac sp duoc xoa: ", selectedProducts);
    }

    const handleCheckout = () => {
        alert("Bạn muôn mua ngay sản phẩm dược chọn, xem thông tin bên console!");
        console.log("Cac sp duoc chọn mua ngay: ", selectedProducts);
    }

    const base_link = "https://res.cloudinary.com/df5mtvzkn/image/upload/q_auto,f_auto/WEB_SELL_PHONE__PROJECT/TEST/Test_IMG/"

    const copy_arr = listProduct.map(p => {
        return (
            <CartProduct
                baselink={base_link}
                product={p}
                key={`${p.product_id}-${p.variant_id}`}
                checked={selectedProducts.includes(p)}
                onChange={() => { handleSelect(p) }}
            />)
    })
    return (
        <>
            {scrollToTopSmooth()}
            <div className="bg-slate-50 animate__animated animate_fadeIn py-5">
                <div className="text-center">
                    <div className="flex font-bold text-5xl text-mainCL gap-5 justify-center">
                        <i className="bi bi-cart-check"></i>
                        <p className="">
                            Giỏ hàng
                        </p>
                    </div>
                    <p className="text-slate-800 font-semibold text-xl mt-3">
                        Kiểm tra các mặt hàng đã chọn và sẵn sàng đặt mua.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 p-5 gap-5 bg-white w-[90%] mx-auto mt-5 rounded-lg shadow-lg overflow-hidden max-h-[400px] md:max-h-[300px] overflow-y-scroll">
                    {copy_arr}
                </div>
                <div className="w-[90%] mx-auto mt-5 flex justify-end gap-5 md:justify-center">
                    <button
                        onClick={handleDelete}
                        className="text-mainCL border border-mainCL px-2 py-1 rounded-md font-semibold">
                        Xóa
                    </button>
                    <button
                        onClick={handleCheckout}
                        className="text-white bg-mainCL px-2 py-1 rounded-md font-semibold">
                        Mua ngay
                    </button>
                </div>
            </div>
        </>
    );
}

