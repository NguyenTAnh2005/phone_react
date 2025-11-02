import React, { useState, useMemo } from "react";
import { list_orders, eg_hotline } from "../../Data_Test/Data_Home_Test";
import { priceFormatter } from "../../utils/utils";
// Import component OrderInfo bạn đã tạo
import OrderInfo from "../OrderInfo";

// Sao chép hàm này từ OrderInfo.jsx để dùng,
// hoặc bạn có thể chuyển nó vào utils.jsx và export ra
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

// Định nghĩa các tab lọc
const filterTabs = [
    { key: "ALL", label: "Tất cả" },
    { key: "PREPARE", label: "Chuẩn bị hàng" },
    { key: "SHIPPING", label: "Đang giao" },
    { key: "DONE", label: "Hoàn tất" },
];

export function Orders() {
    const [allOrders] = useState(list_orders);
    const [allAddresses] = useState(eg_hotline);
    const [activeFilter, setActiveFilter] = useState("ALL");

    // State để lưu đơn hàng đang được chọn xem chi tiết
    const [selectedOrder, setSelectedOrder] = useState(null);

    // Lọc danh sách đơn hàng dựa trên tab đang hoạt động
    const filteredOrders = useMemo(() => {
        if (activeFilter === "ALL") {
            return allOrders;
        }
        return allOrders.filter((order) => order.state === activeFilter);
    }, [activeFilter, allOrders]);

    // Hàm xử lý khi nhấn "Xem chi tiết"
    const handleViewDetails = (order) => {
        // Tìm địa chỉ tương ứng với đơn hàng
        const addressInfo = allAddresses.find(
            (addr) => addr.hotline_id === order.hotline_id
        );
        setSelectedOrder({
            orderInfo: order,
            orderAddressInfo: addressInfo || null, // Truyền địa chỉ tìm được
        });
    };

    // Hàm xử lý khi nhấn "Quay lại" từ chi tiết đơn hàng
    const handleBackToList = () => {
        setSelectedOrder(null);
    };

    // --- RENDER ---

    // Nếu có đơn hàng được chọn, hiển thị OrderInfo
    if (selectedOrder) {
        return (
            <div className="p-4">
                <button
                    onClick={handleBackToList}
                    className="mb-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                >
                    <i className="bi bi-arrow-left me-2"></i>
                    Quay lại danh sách
                </button>
                <OrderInfo
                    orderInfo={selectedOrder.orderInfo}
                    orderAddressInfo={selectedOrder.orderAddressInfo}
                />
            </div>
        );
    }

    // Nếu không, hiển thị danh sách đơn hàng và các tab lọc
    return (
        <div className="p-4 space-y-4">
            {/* Thanh Tab Lọc */}
            <div className="flex border-b border-gray-300">
                {filterTabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveFilter(tab.key)}
                        className={`py-2 px-4 text-sm font-medium
                            ${activeFilter === tab.key
                                ? "border-b-2 border-mainCL text-mainCL"
                                : "text-gray-500 hover:text-gray-700"
                            }
                        `}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Danh sách đơn hàng */}
            <div className="space-y-3">
                {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                        <OrderItemSummary
                            key={order.id}
                            order={order}
                            onViewDetails={() => handleViewDetails(order)}
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-500 p-5">
                        Không có đơn hàng nào trong mục này.
                    </p>
                )}
            </div>
        </div>
    );
}

// Component con để hiển thị tóm tắt một đơn hàng
function OrderItemSummary({ order, onViewDetails }) {
    return (
        <div className="border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row justify-between md:items-center space-y-2 md:space-y-0">
                <div>
                    <p className="font-semibold text-gray-800">
                        Mã đơn hàng:{" "}
                        <span className="font-normal text-sm">{order.id}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                        Ngày đặt: {order.buy_time}
                    </p>
                </div>
                <div className="text-sm text-gray-600">
                    Trạng thái:{" "}
                    <span className="font-semibold text-blue-600">
                        {getStateText(order.state)}
                    </span>
                </div>
                <div className="font-semibold text-gray-800">
                    Tổng tiền:{" "}
                    <span className="text-mainCL">
                        {priceFormatter(order.total_price)} đ
                    </span>
                </div>
                <button
                    onClick={onViewDetails}
                    className="px-3 py-1 bg-mainCL text-white rounded text-sm hover:bg-opacity-90"
                >
                    Xem chi tiết
                </button>
            </div>
        </div>
    );
}