import { useEffect, useState } from "react";
import { priceFormatter } from "../utils/utils";
import { Info1 } from "../Pages/AccountPages/Info1"
import { Info2 } from "../Pages/AccountPages/Info2"
import { Address } from "../Pages/AccountPages/Address"
import { Orders } from "../Pages/AccountPages/Orders"
import { scrollToTopSmooth } from "../utils/utils";
import { eg_all_data_account } from "../Data_Test/ACCOUNT";

export function Account() {
    const [activeTab, setActiveTab] = useState('info1');
    const [allData, setAllData] = useState(null);
    const [isFetchData, setIsFetchData] = useState(true);

    function fetchAPIData() {
        // get API từ data
        alert("Loading Data ALL");
        const response = { ...eg_all_data_account };
        console.log(response);
        setAllData(response);
        setIsFetchData(false);
    }

    useEffect(() => {
        fetchAPIData();
    }, []);

    function renderContent(key) {
        switch (key) {
            case "info1":
                return (<Info1 prop={allData.info1} reFetchAPI={fetchAPIData} />)
            case "info2":
                return (<Info2 prop={allData.info2} reFetchAPI={fetchAPIData} />)
            case "address":
                return (<Address prop={allData.hotlines} reFetchAPI={fetchAPIData} />)
            case "orders":
                // `Orders` cần CẢ 2: `orders` và `hotlines` (để lấy địa chỉ)
                return (<Orders
                    ordersProp={allData.orders}
                    addressProp={allData.hotlines}
                    reFetchAPI={fetchAPIData}
                />)
        }
    }

    return (
        <>
            {scrollToTopSmooth()}
            <div className="flex flex-col py-10">
                {!isFetchData &&
                    (
                        <div className="flex flex-col justify-evenly items-center md:flex-row gap-5 md:gap-10 mb-10 bg-white">
                            <UserProfileInfo prop={allData.head} />
                            <UserOrderStats prop={allData.head} />
                        </div>
                    )
                }
                <div className="grid grid-cols-4 md:gap-5 gap-y-5 px-5 md:px-10">
                    <div className=" col-span-full w-2/3 sm:w-1/2 mx-auto md:col-span-1 md:w-full md:m-0">
                        <Account_NavToggle setActiveTab={setActiveTab} activeTab={activeTab} />
                    </div>
                    {
                        !isFetchData && (
                            <div className="col-span-full w-[95%] mx-auto md:col-span-3 md:m-0 md:w-full border border-gray-300 shadow-md rounded-md">
                                {renderContent(activeTab)}
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}

function UserProfileInfo({ prop }) {
    return (
        <div className="flex items-center shadow-md rounded-md px-5 py-2 cursor-pointer border border-gray-300
        hover:scale-105 transition-transform duration-300 ease-in-out">
            <i className="bi bi-person-circle text-mainCL text-5xl bg-white p-2 rounded-full "></i>
            <div className="flex flex-col">
                <p className="text-lg font-bold">
                    {prop.account_last_name} {prop.account_first_name}</p>
                <p>{prop.account_email}</p>
            </div>
        </div>
    )
}

function UserOrderStats({ prop }) {
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
                        {prop.order_count}
                    </span>
                </div>
                <div className="flex">
                    <span>
                        So tien tich luy:
                    </span>
                    <span className="font-medium ms-2">
                        {priceFormatter(prop.money_count)} đ
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
