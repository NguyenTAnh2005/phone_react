import { useState } from "react";
import { eg_account, eg_order_stats } from "../Data_Test/Data_Home_Test";
import { priceFormatter } from "../utils/utils";
import { Info1 } from "../Pages/AccountPages/Info1"
import { Info2 } from "../Pages/AccountPages/Info2"
import { Address } from "../Pages/AccountPages/Address"
import { Orders } from "../Pages/AccountPages/Orders"
import { scrollToTopSmooth } from "../utils/utils";

const tabComponents = {
    'info1': Info1,
    'info2': Info2,
    'address': Address,
    'orders': Orders
};

export function Account() {
    const [activeTab, setActiveTab] = useState('info1');

    function renderContent(key) {
        const CurrentTab = tabComponents[key]
        return (
            <CurrentTab />
        )
    }

    return (
        <>
            {scrollToTopSmooth()}
            <div className="flex flex-col py-10">
                <div className="flex flex-col justify-evenly items-center md:flex-row md:gap-10 mb-10 bg-white">
                    <UserProfileInfo account={eg_account} />
                    <UserOrderStats order_stats={eg_order_stats} />
                </div>

                <div className="grid grid-cols-4 md:gap-5 gap-y-5 px-5 md:px-10">
                    <div className=" col-span-full w-2/3 sm:w-1/2 mx-auto md:col-span-1 md:w-full md:m-0">
                        <Account_NavToggle setActiveTab={setActiveTab} activeTab={activeTab} />
                    </div>
                    <div className="col-span-full w-[95%] mx-auto md:col-span-3 md:m-0 md:w-full border border-gray-300 shadow-md rounded-md">
                        {renderContent(activeTab)}
                    </div>
                </div>
            </div>
        </>
    )
}

function UserProfileInfo({ account }) {
    return (
        <div className="flex items-center shadow-md rounded-md px-5 py-2 cursor-pointer border border-gray-300
        hover:scale-105 transition-transform duration-300 ease-in-out">
            <i className="bi bi-person-circle text-mainCL text-5xl bg-white p-2 rounded-full "></i>
            <div className="flex flex-col">
                <p className="text-lg font-bold">
                    {account.account_last_name} {account.account_first_name}</p>
                <p>{account.account_email}</p>
            </div>
        </div>
    )
}

function UserOrderStats({ order_stats }) {
    return (
        <div className="flex items-center shadow-md rounded-md px-5 py-2 cursor-pointer   border border-gray-300
        hover:scale-105 transition-transform duration-300 ease-in-out">
            <i className="bi bi-cart-check text-mainCL text-5xl bg-white p-2 rounded-full"></i>
            <div className="flex flex-col">
                <div className="flex">
                    <span>
                        So don hang da mua:
                    </span>
                    <span className="font-semibold ms-2">
                        {order_stats.order_count}
                    </span>
                </div>
                <div className="flex">
                    <span>
                        So tien tich luy:
                    </span>
                    <span className="font-medium ms-2">
                        {priceFormatter(order_stats.money_count)} đ
                    </span>
                </div>
            </div>
        </div>
    )
}
function Account_NavToggle({ activeTab, setActiveTab }) {
    function handleClickAccountNav(key) {
        setActiveTab(key);
    }

    // Tạo mảng các tab để dễ dàng lặp
    const tabs = [
        { key: 'info1', label: 'Thông tin cá nhân' },
        { key: 'info2', label: 'Thông tin bảo mật' },
        { key: 'address', label: 'Sổ địa chỉ' },
        { key: 'orders', label: "Đơn hàng" }
        // ...
    ];

    return (
        <div className="flex flex-col p-3 border border-gray-300 shadow-md rounded-md">
            {tabs.map((tab) => (
                <button
                    key={tab.key}
                    className={`p-2 text-sm w-full text-start 
                        ${activeTab === tab.key
                            ? 'font-bold border-l-4 border-mainCL'
                            : 'text-gray-600'
                        }`}
                    onClick={() => handleClickAccountNav(tab.key)}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}


export const list_cart_product = [
    {
        product_id: "ph_1",
        phone_name: "Iphone X",
        variant_id: "ph_1__v1",
        variant_ph_ram: 3,
        variant_ph_rom: 64,
        variant_ph_color: "White",
        variant_ph_final_price: 9320000,
        variant_img: "eg_phone"
    },
    {
        product_id: "ph_2",
        phone_name: "Iphone X",
        variant_id: "ph_2__v1",
        variant_ph_ram: 3,
        variant_ph_rom: 64,
        variant_ph_color: "White",
        variant_ph_final_price: 9320000,
        variant_img: "eg_phone"
    },
    {
        product_id: "ph_3",
        phone_name: "Iphone X",
        variant_id: "ph_3__v1",
        variant_ph_ram: 3,
        variant_ph_rom: 64,
        variant_ph_color: "White",
        variant_ph_final_price: 9320000,
        variant_img: "eg_phone"
    },
]