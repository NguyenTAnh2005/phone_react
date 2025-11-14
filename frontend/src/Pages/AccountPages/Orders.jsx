import React, { useState, useMemo, useEffect } from "react"; // Thêm useEffect
// import { list_orders, eg_hotline } from "../../Data_Test/Data_Home_Test"; // <-- Sửa 1: Bỏ data import
import { priceFormatter, getStateText } from "../../utils/utils";
import OrderInfo from "../OrderInfo";

let List_Tag_Filter = [
    { key: "ALL", label: "Tất cả" },
    { key: "PREPARE", label: "Chuẩn bị hàng" },
    { key: "SHIPPING", label: "Đang giao" },
    { key: "DONE", label: "Hoàn tất" },
];

// --- Sửa 2: Nhận ordersProp, addressProp, và reFetchAPI ---
// (reFetchAPI có thể không dùng, nhưng truyền vào là 1 thói quen tốt)
export function Orders({ ordersProp, addressProp, reFetchAPI }) {

    // --- Sửa 3: Dùng state để lưu data từ prop ---
    const [userAddress, setUserAddress] = useState(addressProp);
    const [listOrder, setListOrder] = useState(ordersProp);
    // --- Hết Sửa 3 ---

    // --- Sửa 4: Đồng bộ state khi prop thay đổi (Giống Info2) ---
    useEffect(() => {
        setUserAddress(addressProp);
    }, [addressProp]);

    useEffect(() => {
        setListOrder(ordersProp);
    }, [ordersProp]);
    // --- Hết Sửa 4 ---

    const [orderSelected, setOrderSelected] = useState(null);
    const [activeFilter, setActiveFilter] = useState("ALL");

    const handleChangeTabFilter = (value) => {
        setActiveFilter(value);
    }

    // (Không cần sửa useMemo, nó sẽ tự chạy lại khi listOrder thay đổi)
    const FilterdOrders = useMemo(() => {
        if (activeFilter === "ALL") {
            return listOrder;
        }
        return listOrder.filter(order => order.state === activeFilter);
    }, [listOrder, activeFilter]);

    // (Không cần sửa các hàm handler, chúng đang dùng state nội bộ)
    const handleViewInfo = (order) => {
        const address = userAddress.find(address => address.hotline_id === order.hotline_id);
        setOrderSelected({
            orderInfo: order,
            addressInfo: address || null
        });
    }

    const handleBackToList = () => {
        setOrderSelected(null);
    }

    // (Toàn bộ phần RENDER giữ nguyên)
    if (orderSelected != null) {
        return (
            <div className="max-h-[300px] overflow-y-scroll relative">
                <button
                    onClick={handleBackToList}
                    className="px-4 py-2 bg-gray-400 text-white font-semibold rounded-md sticky top-3 left-3"
                >
                    Quay lại
                </button>
                <OrderInfo orderInfo={orderSelected.orderInfo} orderAddressInfo={orderSelected.addressInfo} />
            </div>
        )
    }
    return (
        <div className="p-3">
            <div className="flex justify-evenly">
                {
                    List_Tag_Filter.map(tag => (
                        <FilterTab
                            key={tag.key}
                            tag={tag}
                            activeFilter={activeFilter}
                            onChangeTabFilter={handleChangeTabFilter} />
                    ))
                }
            </div>
            <div className="p-2 space-y-4 max-h-[250px] overflow-y-scroll">
                {
                    FilterdOrders.map(order => (
                        <OrderSummary
                            key={order.id}
                            order={order}
                            onHandleViewInfo={handleViewInfo}
                        />
                    ))
                }
                {
                    FilterdOrders.length == 0 &&
                    <p className="font-semibold text-center mt-5 text-mainCL">
                        Không có đơn hàng nào đang ở trạng thái này!
                        <i className="bi bi-emoji-frown ms-2 text-xl"></i>
                    </p>
                }
            </div>
        </div>
    )
}

// ... (Các component FilterTab, OrderSummary giữ nguyên) ...

export function FilterTab({ tag, activeFilter, onChangeTabFilter }) {
    const active = tag.key === activeFilter;
    return (
        <button
            onClick={() => { onChangeTabFilter(tag.key) }}
            className={`py-2 font-bold text-sm ${active ? "text-mainCL border-b-2 border-mainCL" : "text-gray-400"}`}
        >
            {tag.label}
        </button>
    )
}

export function OrderSummary({ order, onHandleViewInfo }) {
    return (
        <div className="border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col lg:flex-row justify-between lg:items-center space-y-2 lg:space-y-0">
                <div>
                    <p className="font-semibold text-gray-800">
                        Mã đơn hàng:{" "}
                        <span className="font-normal text-sm">{order.id}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                        Ngày đặt: {order.buy_time}
                    </p>
                    <p className="text-sm text-gray-600">
                        Ngày nhận: {order.rec_time}
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
                    onClick={() => { onHandleViewInfo(order) }}
                    className="px-3 py-1 bg-mainCL text-white rounded text-sm hover:bg-opacity-90"
                >
                    Xem chi tiết
                </button>
            </div>
        </div>
    )
}