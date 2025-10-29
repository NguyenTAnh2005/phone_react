import { useState } from "react";
import { Input, TextArea } from "../../Components/input";
import { ModalYesNo } from "../../Components/modal";
import { eg_hotline } from "../../Data_Test/Data_Home_Test";

export function Address() {
    const [openAdd, setOpenAdd] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    // Biến lưu địa chỉ được chọn khi sửa TT để render ND lên input trước
    const [addressSelect, setAddressSelect] = useState(null);
    const [isDefault, setIsDefault] = useState(false);

    const handleOpenAdd = () => setOpenAdd(true);
    const handleOpenUpdate = (address) => {
        setAddressSelect(address);
        setOpenUpdate(true);
    }
    const handleCloseModal = () => {
        setOpenAdd(false);
        setOpenUpdate(false);
    };

    const arr_copy_address = eg_hotline.map(hl => {
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

                <ModalYesNo
                    isOpen={openAdd}
                    title={"Thêm địa chỉ mới"}
                    onClose={handleCloseModal}
                    jsxContent={<AddAddress />}
                    func_yes={() => { }}
                />
                <ModalYesNo
                    isOpen={openUpdate}
                    title={"Chỉnh sửa địa chỉ"}
                    onClose={handleCloseModal}
                    jsxContent={<UpdateAddress address={addressSelect} />}
                    func_yes={() => { }}
                />
            </div>
        </>

    );
}
function InputAddress({ ip_input, label, placeholder, value: defaultValue = "" }) {

}

function AddAddress() {
    return (
        <>
            <div className="mx-auto space-y-4">
                <Input
                    id_input={"address_ip1"} label={"Tên người nhận"}
                    placeholder={"Nhập tên người nhận"} type={"text"}
                    cls_icon="bi bi-person-vcard-fill"
                />
                <Input
                    id_input={"address_ip2"} label={"Số điện thoại "}
                    placeholder={"0328884320"} type={"text"}
                    cls_icon="bi bi-telephone-plus-fill"
                />
                <TextArea
                    id_input={"address_ip3"} label_content={"Địa chỉ"}
                    placeholder={"Tổ 6, thôn 7, xã Cẩm Xuyên, tỉnh Hà Tĩnh"} type={"text"}
                    cls_icon="bi bi-house-add-fill"
                />

            </div>
        </>
    )
}

function UpdateAddress({ address }) {
    return (
        <>
            <div className="mx-auto space-y-4">
                <Input
                    id_input={"address_ip1"} label={"Tên người nhận"}
                    placeholder={"Nhập tên người nhận"} type={"text"}
                    cls_icon="bi bi-person-vcard-fill" value={address.hotline_name}
                />
                <Input
                    id_input={"address_ip2"} label={"Số điện thoại "}
                    placeholder={"0328884320"} type={"text"}
                    cls_icon="bi bi-telephone-plus-fill" value={address.hotline_phonenumber}
                />
                <TextArea
                    id_input={"address_ip3"} label_content={"Địa chỉ"}
                    placeholder={"Tổ 6, thôn 7, xã Cẩm Xuyên, tỉnh Hà Tĩnh"} type={"text"}
                    cls_icon="bi bi-house-add-fill" value={address.hotline_address}
                />

            </div>
        </>
    )
}


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
        <div className=" p-3 border border-gray-300 rounded-lg shadow-md cursor-pointer relative">
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
                {!isDefault && (
                    <button className="font-medium text-gray-500">
                        Đặt làm mặc định
                    </button>
                )}
            </div>
            {isDefault &&
                (<div className="absolute top-3 right-3 bg-mainCL text-sm text-white px-2 py-0.5 rounded-full">
                    Default
                </div>)}
        </div>
    )
}

