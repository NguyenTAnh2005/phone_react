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

    // Xử lý thay đổi form data khi thay đổi địa chỉ 
    function handleChangeAddressSelected(address) {
        setselectedAddress(address);
        setFormOrderData((prev) => {
            return { ...prev, hotline_id: address.hotline_id }
        })
    }

    // danh sach cac chi tiet --- KHOI TAO BAN DAU MAC DINH count =1
    const initDetail = list_cart_product.map(p => ({
        variant_id: p.variant_id,
        count: 1,
        price: p.variant_ph_final_price,
        unit_price: p.variant_ph_final_price,
    }));

    // Hàm tính tiền ship 0 || >5 trieu thi pho ri else 50k 
    const calculateShippingFee = (price) => {
        if (price == 0 || price > 5000000) {
            return 0;
        }
        return 50000;
    }


    // Form gui data tao Order
    const total_price_first = initDetail.reduce((acc, d) => acc + d.unit_price, 0);
    const [formOrderData, setFormOrderData] = useState({
        id: "",
        hotline_id: selectedAddress?.hotline_id || "",
        account_id: account.account_id,
        buy_time: "",
        rec_time: "",
        type_pay: "",
        state: "PREPARE",
        detail: initDetail,
        total_price: total_price_first + calculateShippingFee(total_price_first),
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
            const shippingFee = calculateShippingFee(new_total_price);
            const final_price = new_total_price + shippingFee;
            return { ...prev, detail: newDetail, total_price: final_price }
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

        alert(`Đặt hàng thành công! Xem request tại Dev Tools!!!`);
        console.log("🧾 ORDER SUBMITTED:", newOrderData);
    }

    return (
        <>
            <form onSubmit={handleSubmitOrder} className="p-4 border rounded space-y-3 animate__animated animate__fadeIn">
                <h2 className="font-bold text-lg text-center">Thanh toán - mua hàng</h2>
                <div className="grid grid-cols-10 gap-3">
                    <div className="col-span-full md:col-span-5">
                        <OrderAddress
                            account={account}
                            handleChangeQuantity={handleChangeQuantity}
                            handleChangeAddressSelected={handleChangeAddressSelected}
                            selectedAddress={selectedAddress}
                            addressList={addressList}
                        />
                    </div>
                    <div className="col-span-full md:col-span-5">
                        <OrderPrice
                            formOrderData={formOrderData}
                            list_product={list_product}
                            calculateShippingFee={calculateShippingFee}
                            handleChangeQuantity={handleChangeQuantity}
                        />
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
// Thông tin giao hàng
function OrderAddress({ account, selectedAddress, handleChangeAddressSelected, addressList }) {

    const handlechangeValue = (e) => {
        const selected = addressList.find((addr) => {
            return addr.hotline_id === e.target.value;
        });
        handleChangeAddressSelected(selected);
    }
    return (
        <div className="border border-gray-300 rounded-lg overflow-hidden pb-5">
            <p className="bg-mainCL text-white text-lg font-semibold uppercase text-center">
                1. Thông tin giao hàng
            </p>
            <div className="px-3 mb-4 font-semibold">
                <p className="">
                    Tên tài khoản:
                </p>
                <p className="uppercase">
                    {account.account_last_name} {account.account_first_name}
                </p>
            </div>
            <div className="px-3">
                <p className="font-semibold">Địa chỉ: </p>
                <select
                    className="border border-gray-300 outline-none py-2 px-2 rounded-md font-semibold text-xs w-full"
                    name="address" id="order_ip1"
                    value={selectedAddress?.hotline_id || ""}
                    onChange={handlechangeValue}
                >
                    {
                        addressList.map(p => (
                            <option
                                className="text-xs"
                                value={p.hotline_id}
                                key={p.hotline_id}
                            >
                                {p.hotline_default && "(Mặc định) "}
                                {p.hotline_name} | {p.hotline_phonenumber} | {p.hotline_address}
                            </option>
                        ))
                    }
                </select>
            </div>
        </div>
    )
}

// Thông tin thanh toán 
function OrderPrice({ list_product, formOrderData, handleChangeQuantity, calculateShippingFee }) {

    // Tính tổng tiền hàng (Sub Total) để xác định phí giao hàng
    const subTotal = formOrderData.detail.reduce((acc, d) => acc + d.unit_price, 0);
    const shippingFee = calculateShippingFee(subTotal); // Sử dụng hàm tính phí ship
    return (
        <div className="border border-gray-300 rounded-lg overflow-hidden pb-5">
            <p className="bg-mainCL text-white text-lg font-semibold uppercase text-center">
                2. Tóm tắt đơn hàng
            </p>
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
            <div className="px-5 font-semibold mt-5 border-t border-gray-300 ">
                <div className="flex justify-between">
                    <span>
                        Tổng giá trị sản phẩm:
                    </span>
                    <span className="text-mainCL ms-2">
                        {priceFormatter(formOrderData.total_price - shippingFee)} đ
                    </span>
                </div>
                <div className="flex justify-between">
                    <span>
                        Phí giao hàng:
                    </span>
                    <span className="ms-2">
                        {shippingFee == 0 ? "Miễn Phí" : priceFormatter(shippingFee) + " đ"}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span>
                        Tổng tiền cuối cùng:
                    </span>
                    <span className="text-mainCL ms-2">
                        {priceFormatter(formOrderData.total_price)} đ
                    </span>
                </div>
                <p className=" text-sm font-light italic text-center">
                    Phí ship mặc định 50.000 đ, với đơn hàng lớn hơn 5.000.000 Đ thì miễn phí giao hàng!
                </p>
            </div>
        </div>
    )
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




