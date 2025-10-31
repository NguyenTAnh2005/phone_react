import { useState, version } from "react";
import { eg_account, list_cart_product, eg_hotline } from "../Data_Test/Data_Home_Test";
import { priceFormatter } from "../utils/utils";


export function Order({ account = eg_account, hotlineList = eg_hotline, list_product = list_cart_product }) {

    const [addressList, setAddressList] = useState(eg_hotline);

    // lấy address mặc định
    const [selectedAddress, setselectedAddress] = useState(() => {
        const found = addressList.find(a => a.hotline_default === true);
        // Nếu found tồn tại (truthy) → trả về found.
        // Nếu không có found → thử lấy phần tử đầu tiên của addressList (addressList?.[0]).
        // Dấu ?. để tránh lỗi nếu addressList bị null hoặc undefined.
        // Nếu cả hai đều không có → trả về null.
        return found || addressList?.[0] || null;
    });

    // danh sach cac chi tiet --- KHOI TAO BAN DAU MAC DINH count =1
    const initDetail = list_cart_product.map(p => ({
        variant_id: p.variant_id,
        count: 1,
        price: p.variant_ph_final_price,
        unit_price: p.variant_ph_final_price,
    }));

    // Form gui data tao Order
    const [formOrderData, setFormOrderData] = useState({
        id: "",
        hotline_id: selectedAddress.hotline_id,
        account_id: account.account_id,
        buy_time: "",
        rec_time: "",
        type_pay: "",
        state: "PREPARE",
        detail: initDetail,
        total_price: initDetail.reduce((acc, d) => acc + d.unit_price, 0),
    });

    // Xu ly thay doi so luong => thay doi count + gia tien 
    function handleChangeQuantity(variant_id, newcount) {
        setFormOrderData((prev) => {
            const newDetail = prev.detail.map(d => {
                const new_unit_price = d.price * newcount;
                if (d.variant_id === variant_id) {
                    return { ...d, count: newcount, unit_price: new_unit_price };
                }
                return d;
            });
            const new_total_price = newDetail.reduce((acc, d) => acc + d.unit_price, 0);
            return { ...prev, detail: newDetail, total_price: new_total_price }
        })
    }

    // Xu ly dat hang
    const handleSubmitOrder = (e) => {
        e.preventDefault();
        const timeNow = Date.now();
        const orderID = `${timeNow}--${account.account_id}--${selectedAddress.hotline_id}`
        // Tạo bản sao dữ liệu mới
        const newOrderData = {
            ...formOrderData,
            id: orderID,
            buy_time: new Date().toISOString(),
            rec_time: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        };

        setFormOrderData(newOrderData);
        console.log("🧾 ORDER SUBMITTED:", newOrderData);
    }

    return (
        <>
            <form onSubmit={handleSubmitOrder} className="p-4 border rounded space-y-3">
                <h2 className="font-bold text-lg">Chi tiết đơn hàng</h2>
                <div className=" border border-gray-300 p-3">
                    <table className="border-collapse text-sm">
                        <thead className="uppercase font-medium text-mainCL">
                            <tr className="">
                                <th className=" px-4 ">
                                    Tên hàng hóa
                                </th>
                                <th className=" px-4 ">
                                    Đơn giá
                                </th>
                                <th className=" px-4 ">
                                    Số lượng
                                </th>
                                <th className=" px-4 ">
                                    Thành tiền
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {list_product.map((p, i) => (
                                <OrderDetail
                                    key={p.product_id}
                                    product={p}
                                    value={formOrderData.detail[i].count}
                                    // value là lấy giá trị count của sp đó trongg initDetail cua formOrderData 
                                    onChange={handleChangeQuantity}
                                />
                            ))}
                        </tbody>
                    </table>
                    <div className="text-start font-semibold mt-2">
                        <span>
                            Tổng tiền:
                        </span>
                        <span className="text-mainCL ms-2">
                            {priceFormatter(formOrderData.total_price)} đ
                        </span>
                    </div>
                </div>
                <button
                    type="submit"
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Đặt hàng
                </button>
            </form>
        </>
    )

}

function OrderAddress() {

}
function OrderPrice() {

}
function OrderTypePay() {

}
function OrdeTime() {

}

function OrderDetail({ product, value, onChange }) {
    const price = product.variant_ph_final_price ? product.variant_ph_final_price : product.variant_ph_final_price;
    const handlePlus = () => {
        onChange(product.variant_id, value + 1);
    }
    const handleMinus = () => {
        if (value >= 1) {
            onChange(product.variant_id, value - 1);
        }
    }
    return (
        <tr className="">
            <td className="font-semibold px-4 py-2">
                {product.phone_name} {product.variant_ph_ram}GB/{product.variant_ph_rom} ({product.variant_ph_color})
            </td>
            <td className="px-4 py-2">
                {priceFormatter(price)}
            </td>
            {/* Số lượng */}
            <td className="px-4 py-2">
                <div className="flex font-semibold text-mainCL justify-between">
                    <i
                        onClick={handleMinus}
                        className="bi bi-dash-square"
                    >
                    </i>
                    <span className="font-semibold text-center">{value}</span>
                    <i
                        onClick={handlePlus}
                        className="bi bi-plus-square"
                    >
                    </i>
                </div>
            </td>
            {/* Tong tien  */}
            <td className=" text-end font-semibold">
                {priceFormatter(price * value)} đ
            </td>
        </tr>
    )
}




