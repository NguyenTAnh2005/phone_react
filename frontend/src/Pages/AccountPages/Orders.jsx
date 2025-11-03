import React, { useState, useMemo } from "react";
import { list_orders, eg_hotline } from "../../Data_Test/Data_Home_Test";
import { priceFormatter, getStateText } from "../../utils/utils";
// Import component OrderInfo bạn đã tạo
import OrderInfo from "../OrderInfo";

// Định nghĩa các tab lọc
let List_Tag_Filter = [
    { key: "ALL", label: "Tất cả" },
    { key: "PREPARE", label: "Chuẩn bị hàng" },
    { key: "SHIPPING", label: "Đang giao" },
    { key: "DONE", label: "Hoàn tất" },
];

export function Orders() {
    //State lưu dữ DL càn thiết (VD đã res xng từ API) 
    // Danh sách địa chhir của user, danh sách hóa đơn của user
    const [userAddress] = useState(eg_hotline);
    const [listOrder, setListOrder] = useState(list_orders);

    //State lưu đơn hàng để xem chi tiết  cần lưu 2 tham số, orderInfo + address từ hotline_id
    const [orderSelected, setOrderSelected] = useState(null);

    // trạng thái của hóa đơn 
    const [activeFilter, setActiveFilter] = useState("ALL");
    const handleChangeTabFilter = (value) => {
        setActiveFilter(value);
    }
    // Lọc danh sách hóa đơn dựa trên tag 
    const FilterdOrders = useMemo(() => {
        if (activeFilter === "ALL") {
            return listOrder;
        }
        return listOrder.filter(order => order.state === activeFilter);
    }, [listOrder, activeFilter]);

    // Xử lý khi chọn xem  chi tiết

    const handleViewInfo = (order) => {
        const address = userAddress.find(address => address.hotline_id === order.hotline_id);
        setOrderSelected({
            orderInfo: order,
            addressInfo: address || null
        });
    }

    // Xử lý khi nhấn "Quay lại" từ chi tiết đơn hàng
    const handleBackToList = () => {
        setOrderSelected(null);
    }

    ////RENDER 

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

// UI cho tag lọc hóa đơn 
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

// UI cho hóa đơn

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