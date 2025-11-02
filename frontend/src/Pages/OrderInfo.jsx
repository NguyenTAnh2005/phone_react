import React from "react";
import { priceFormatter } from "../utils/utils";
import { order, orderAddress } from "../Data_Test/Data_Home_Test";

// Hàm đổi trạng thái cho dễ đọc
const getStateText = (state) => {
    switch (state) {
        case "PREPARE":
            return "Chuẩn bị hàng";
        case "SHIPPING":
            return "Đang giao";
        case "DONE":
            return "Hoàn tất";
        default:
            return state;
    }
};

export default function OrderInfo({ orderInfo = order, orderAddressInfo = orderAddress }) {

    return (
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6 space-y-5">
            <h1 className="text-2xl font-bold text-center text-mainCL mb-3">

                Thông tin đơn hàng
            </h1>

            {/* Thông tin chung */}
            <div className="border border-gray-300 rounded-lg p-4 space-y-1">
                <h2 className="text-lg font-semibold mb-2 text-gray-700">
                    <i className="bi bi-file-earmark-text me-2"></i>
                    Thông tin hóa đơn
                </h2>
                <p>
                    <span className="font-semibold">Mã đơn hàng:</span> {orderInfo.id}
                </p>
                <p>
                </p>
                <p>
                    <span className="font-semibold">Ngày đặt hàng:</span> {orderInfo.buy_time}
                </p>
                <p>
                    <span className="font-semibold">Ngày nhận dự kiến:</span>{" "}
                    {orderInfo.rec_time}
                </p>
                <p>
                    <span className="font-semibold">Hình thức thanh toán:</span>{" "}
                    {orderInfo.type_pay === "Online"
                        ? "Thanh toán Online"
                        : "Thanh toán khi nhận hàng"}
                </p>
                <p>
                    <span className="font-semibold">Trạng thái:</span>{" "}
                    {getStateText(orderInfo.state)}
                </p>
            </div>

            {/* Địa chỉ giao hàng */}
            <div className="border border-gray-300 rounded-lg p-4 space-y-1">
                <h2 className="text-lg font-semibold mb-2 text-gray-700">
                    <i className="bi bi-pin-map-fill me-2"></i>
                    Địa chỉ giao hàng
                </h2>
                <p>
                    <span className="font-semibold">Tên người nhận:</span>{" "}
                    {orderAddressInfo.hotline_name}
                </p>
                <p>
                    <span className="font-semibold">Số điện thoại:</span>{" "}
                    {orderAddressInfo.hotline_phonenumber}
                </p>
                <p>
                    <span className="font-semibold">Địa chỉ:</span>{" "}
                    {orderAddressInfo.hotline_address}
                </p>
                {orderAddressInfo.hotline_default && (
                    <p className="text-sm italic text-green-600">(Địa chỉ mặc định)</p>
                )}
            </div>

            {/* Chi tiết sản phẩm */}
            <div className="border border-gray-300 rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-2 text-gray-700">
                    <i className="bi bi-list-task me-2"></i>
                    Danh sách sản phẩm
                </h2>
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                    <table className="w-full text-sm ">
                        <thead>
                            <tr className="bg-mainCL text-white">
                                <th className="py-2 px-3 text-left rounded-tl-lg">Mã sản phẩm</th>
                                <th className="py-2 px-3 text-center">Số lượng</th>
                                <th className="py-2 px-3 text-right">Đơn giá</th>
                                <th className="py-2 px-3 text-right rounded-tr-lg">Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderInfo.detail.map((item) => (
                                <tr
                                    key={item.variant_id}
                                    className="border-b last:border-0 hover:bg-gray-50"
                                >
                                    <td className="py-2 px-3 font-medium">{item.detail_name}</td>
                                    <td className="py-2 px-3 text-center">{item.count}</td>
                                    <td className="py-2 px-3 text-right">
                                        {priceFormatter(item.price)} đ
                                    </td>
                                    <td className="py-2 px-3 text-right text-mainCL font-semibold">
                                        {priceFormatter(item.unit_price)} đ
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>

            {/* Tổng cộng */}
            <div className="text-right font-bold text-lg">
                Tổng tiền:{" "}
                <span className="text-mainCL">{priceFormatter(orderInfo.total_price)} đ</span>
            </div>
        </div>
    );
}
