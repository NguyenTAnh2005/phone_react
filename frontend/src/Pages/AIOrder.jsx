import { useState } from "react";
import { eg_account, list_cart_product, eg_hotline } from "../Data_Test/Data_Home_Test";


export function AIOrder({
    account = eg_account,
    hotlineList = eg_hotline,
    list_product = list_cart_product,
}) {
    const [addressList, setAddressList] = useState(hotlineList);

    // Lấy address mặc định
    const [defaultAddress, setDefaultAddress] = useState(() => {
        const found = addressList.find((a) => a.hotline_default === true);
        return found || addressList?.[0] || null;
    });

    // Form dữ liệu đơn hàng
    const [formOrderData, setFormOrderData] = useState({
        id: "",
        hotline_id: defaultAddress?.hotline_id || "",
        account_id: account.account_id,
        buy_time: "",
        rec_time: "",
        type_pay: "",
        state: "PREPARE",
        detail: [],
        total_price: 0,
    });

    // Tính tổng tiền
    const totalPrice = list_product.reduce(
        (sum, item) => sum + item.variant_ph_new_price,
        0
    );

    // Xử lý đặt hàng
    const handleSubmit = (e) => {
        e.preventDefault();

        const timeNow = Date.now();
        const orderId = `${timeNow}_${account.account_id}_${formOrderData.hotline_id}`;

        const orderData = {
            ...formOrderData,
            id: orderId,
            buy_time: new Date().toLocaleString(),
            detail: list_product.map((p) => ({
                product_id: p.product_id,
                detail_count: 1,
                detail_unit_price: p.variant_ph_new_price,
                detail_total_price: p.variant_ph_new_price,
            })),
            total_price: totalPrice,
        };

        console.log("Đơn hàng gửi đi:", orderData);
        alert("Đơn hàng đã được tạo!\n" + JSON.stringify(orderData, null, 2));
    };

    return (
        <div className="p-6 max-w-3xl mx-auto border rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Tạo đơn hàng</h2>

            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Thông tin địa chỉ */}
                <div className="border p-3 rounded-lg">
                    <h3 className="font-semibold mb-2">Địa chỉ giao hàng</h3>
                    <select
                        value={formOrderData.hotline_id}
                        onChange={(e) =>
                            setFormOrderData({ ...formOrderData, hotline_id: e.target.value })
                        }
                        className="border p-2 rounded w-full"
                    >
                        {addressList.map((a) => (
                            <option key={a.hotline_id} value={a.hotline_id}>
                                {a.hotline_name} - {a.hotline_address}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Danh sách sản phẩm */}
                <div className="border p-3 rounded-lg">
                    <h3 className="font-semibold mb-2">Sản phẩm thanh toán</h3>
                    {list_product.map((item, index) => (
                        <div
                            key={item.product_id}
                            className="flex justify-between border-b py-2 text-sm"
                        >
                            <span>
                                {index + 1}. {item.phone_name} ({item.variant_ph_rom}GB /{" "}
                                {item.variant_ph_color})
                            </span>
                            <span>{item.variant_ph_new_price.toLocaleString()} đ</span>
                        </div>
                    ))}
                    <div className="font-bold text-right mt-2">
                        Tổng: {totalPrice.toLocaleString()} đ
                    </div>
                </div>

                {/* Hình thức thanh toán */}
                <div className="border p-3 rounded-lg">
                    <h3 className="font-semibold mb-2">Hình thức thanh toán</h3>
                    <select
                        value={formOrderData.type_pay}
                        onChange={(e) =>
                            setFormOrderData({ ...formOrderData, type_pay: e.target.value })
                        }
                        className="border p-2 rounded w-full"
                    >
                        <option value="">-- Chọn hình thức thanh toán --</option>
                        <option value="CASH">Tiền mặt (COD)</option>
                        <option value="CARD">Thẻ tín dụng / Ghi nợ</option>
                        <option value="BANK">Chuyển khoản ngân hàng</option>
                    </select>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600"
                >
                    Xác nhận đặt hàng
                </button>
            </form>
        </div>
    );
}