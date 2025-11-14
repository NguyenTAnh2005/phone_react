import { useState, useEffect } from "react"; // Thêm useEffect
import { Input, TextArea } from "../../Components/input";
import { Modal } from "../../Components/modal";
// import { eg_hotline } from "../../Data_Test/Data_Home_Test"; // <-- Sửa 1: Bỏ data import

// --- Sửa 2: Nhận prop và reFetchAPI từ Cha ---
export function Address({ prop, reFetchAPI }) {
    const [openAdd, setOpenAdd] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [addressSelect, setAddressSelect] = useState(null);

    // --- Sửa 3: Dùng state để lưu data từ prop, và đồng bộ nó ---
    const [hotlines, setHotlines] = useState(prop);
    useEffect(() => {
        setHotlines(prop);
    }, [prop]);
    // --- Hết Sửa 3 ---

    const handleOpenAdd = () => setOpenAdd(true);
    const handleOpenUpdate = (address) => {
        setAddressSelect(address);
        setOpenUpdate(true);
    }
    const handleCloseModal = () => {
        setOpenAdd(false);
        setOpenUpdate(false);
    };

    // --- Sửa 4: Dùng state `hotlines` (đã nhận từ prop) thay vì `eg_hotline` ---
    const arr_copy_address = hotlines.map(hl => {
        return <AddressItem isDefault={hl.hotline_default} address={hl} key={hl.hotline_id} handleOpenUpdate={() => { handleOpenUpdate(hl) }} />
    })

    return (
        <>
            <div className="bg-white p-5">
                <h2 className="text-2xl font-bold mb-4">Sổ địa chỉ</h2>
                <div>
                    <ButtonAddAddress clickFunc={handleOpenAdd} />
                </div>
                <div className="py-5 mt-5 space-y-5 max-h-[400px] overflow-y-scroll">
                    {arr_copy_address}
                </div>

                {/* --- Sửa 5: Truyền reFetchAPI xuống Modal/AddressForm --- */}
                <Modal
                    isOpen={openAdd}
                    title={"Thêm địa chỉ mới"}
                    onClose={handleCloseModal}
                    jsxContent={<AddressForm mode="add" handleCloseModal={handleCloseModal} reFetchAPI={reFetchAPI} />}
                />
                <Modal
                    isOpen={openUpdate}
                    title={"Chỉnh sửa địa chỉ"}
                    onClose={handleCloseModal}
                    jsxContent={<AddressForm defaultAddress={addressSelect} handleCloseModal={handleCloseModal} reFetchAPI={reFetchAPI} />}
                />
                {/* --- Hết Sửa 5 --- */}
            </div>
        </>
    );
}

// --- Sửa 6: Nhận `reFetchAPI` trong AddressForm ---
function AddressForm({ mode, defaultAddress, handleCloseModal, reFetchAPI }) {
    const [formAddress, setFormAddress] = useState({
        hl_name: (defaultAddress) ? defaultAddress.hotline_name : "",
        hl_phonenumber: defaultAddress ? defaultAddress.hotline_phonenumber : "",
        hl_address: defaultAddress ? defaultAddress.hotline_address : "",
        hl_default: defaultAddress ? defaultAddress.hotline_default : false,
    });

    const handleChangeForm = (e) => {
        const { name, value, type, checked } = e.target;
        setFormAddress((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    }

    // --- Sửa 7: Áp dụng logic "Shipper 1 (POST) -> Shipper 2 (GET)" ---
    const handleSubmitForm = async (e) => {
        e.preventDefault();

        // 1. Giả lập gọi API POST/PUT (Shipper 1)
        console.log("Form Address Data (Shipper 1 - POST): ", formAddress);
        if (mode === "add") {
            alert("Đang (giả lập) THÊM địa chỉ...");
        } else {
            alert("Đang (giả lập) CẬP NHẬT địa chỉ...");
        }
        await new Promise(resolve => setTimeout(resolve, 500)); // Giả lập chờ 0.5s
        alert("Đã (giả lập) cập nhật xong!");

        // 2. Gọi reFetchAPI (Shipper 2 - GET)
        reFetchAPI();

        // 3. Đóng Modal
        handleCloseModal();
    }
    // --- Hết Sửa 7 ---

    return (
        <>
            <form onSubmit={handleSubmitForm} className="mx-auto space-y-4">
                <Input
                    name={"hl_name"} id_input={"address_ip1"} type={"text"}
                    label={"Tên người nhận"} placeholder={"Nhập tên người nhận"}
                    cls_icon="bi bi-person-vcard-fill" value={formAddress.hl_name}
                    onChange={handleChangeForm}
                />
                <Input
                    name={"hl_phonenumber"} id_input={"address_ip2"} type={"text"}
                    label={"Số điện thoại "} placeholder={"0328884320"}
                    cls_icon="bi bi-telephone-plus-fill" value={formAddress.hl_phonenumber}
                    onChange={handleChangeForm}
                />
                <TextArea
                    name={"hl_address"} id_input={"address_ip3"} type={"text"}
                    label_content={"Địa chỉ"} placeholder={"Tổ 6, thôn 7, xã Cẩm Xuyên, tỉnh Hà Tĩnh"}
                    cls_icon="bi bi-house-add-fill" value={formAddress.hl_address}
                    onChange={handleChangeForm}
                />
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="hl_default"
                        id="address_ip4"
                        className="bg-mainCL"
                        checked={formAddress.hl_default}
                        onChange={handleChangeForm}
                    />
                    <label htmlFor="address_ip4" className="ms-2">
                        Đặt làm địa chỉ mặc định
                    </label>
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-mainCL px-4 py-2 rounded-md text-white"
                    >
                        {mode === "add" ? "Thêm mới" : "Lưu thay đổi"}
                    </button>
                </div>
            </form>
        </>
    )
}

// ... (Các component ButtonAddAddress, AddressItem giữ nguyên) ...

function ButtonAddAddress({ clickFunc }) {
    return (
        <button
            onClick={clickFunc}
            className="bg-mainCL px-2 py-1 rounded-md text-white"
        >
            <i className="bi bi-house-add text-lg me-2"></i>
            <span>Add new address</span>
        </button>
    )
}

function AddressItem({ isDefault, address, handleOpenUpdate }) {
    return (
        <div className={`p-3 border border-gray-300 rounded-lg shadow-md cursor-pointer relative 
            hover:scale-[99%] hover:shadow-lg hover:shadow-mainCL transition-all duration-300 ease-in-out
        ${isDefault ? "border-mainCL" : ""}`}>
            <p className="text-lg font-bold">
                {address.hotline_name}
            </p>
            <p className="text-gray-600 ">
                SĐT: {address.hotline_phonenumber}
            </p>
            <p className="font-semibold">
                {address.hotline_address}
            </p>
            <div className="flex font-bold justify-end gap-5 py-1 border-t-[1px] border-gray-200 mt-5">
                <button type="button" className="text-[#FFBF00]" onClick={handleOpenUpdate} >
                    Sửa
                </button>
                <button type="button" className="text-[#FF0800]">
                    Xóa
                </button>
            </div>
            {isDefault &&
                (<div className="absolute top-3 right-3 bg-mainCL text-sm text-white px-2 py-0.5 rounded-full">
                    Default
                </div>)}
        </div>
    )
}