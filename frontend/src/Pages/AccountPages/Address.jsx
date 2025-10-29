import { useState } from "react";
import { Input, TextArea } from "../../Components/input";
import { ModalYesNo } from "../../Components/modal";
import { eg_hotline } from "../../Data_Test/Data_Home_Test";

export function Address() {
    const [openAdd, setOpenAdd] = useState(false);
    const [isDefault, setIsDefault] = useState(false);
    const handleOpenModal = () => {
        setOpenAdd(true)
    }
    const handleCloseModal = () => {
        setOpenAdd(false)
    }
    const arr_copy_address = eg_hotline.map(hl => {
        return <AddressItem isDefault={hl.hotline_default} address={hl} key={hl.hotline_id} />
    })

    return (
        <>
            <div className="bg-white p-5">
                <h2 className="text-2xl font-bold mb-4">Sổ địa chỉ</h2>
                <div>
                    <ButtonAddAddress clickFunc={handleOpenModal} />
                </div>
                <ModalYesNo
                    isOpen={openAdd}
                    title={"Thêm địa chỉ mới"}
                    onClose={handleCloseModal}
                    jsxContent={<AddAddress />}
                    func_yes={() => { }}
                />

                <div className="py-5 mt-5 space-y-5 max-h-[400px] overflow-y-scroll">
                    {arr_copy_address}
                </div>
            </div>
        </>

    );
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

function AddressItem({ isDefault, address }) {
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
                <button type="button" className="text-[#FFBF00]">
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

// // --- Mock Data ---
// const initialAddresses = [
//     {
//         id: 1,
//         name: "Nguyễn Văn A",
//         phone: "0901 234 567",
//         fullAddress: "123 Đường Láng, Phường A, Quận B, TP. Hà Nội",
//         isDefault: true,
//     },
//     {
//         id: 2,
//         name: "Trần Thị B",
//         phone: "0911 987 654",
//         fullAddress: "456 Đường CMT8, Phường C, Quận D, TP. Hồ Chí Minh",
//         isDefault: false,
//     },
// ];
// // -----------------


// // --- Component Phụ (Giả lập Input đơn giản) ---
// const InputSimple = ({ label, type = "text", value, onChange, placeholder = "" }) => (
//     <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
//         <input
//             type={type}
//             value={value}
//             onChange={onChange}
//             placeholder={placeholder}
//             className="w-full border border-gray-300 p-2 rounded-md focus:ring-mainCL focus:border-mainCL"
//         />
//     </div>
// );

// // --- Component Modal ---
// const Modal = ({ isOpen, onClose, title, children }) => {
//     if (!isOpen) return null;
//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
//             <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-md mx-4">
//                 <div className="flex justify-between items-center mb-4 border-b pb-2">
//                     <h3 className="text-xl font-semibold text-mainCL">{title}</h3>
//                     <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
//                 </div>
//                 {children}
//             </div>
//         </div>
//     );
// };
// // -----------------


// // --- Component Thẻ Địa Chỉ ---
// const AddressCard = ({ address, onEdit, onDelete, onSetDefault, isMainCL = "orange" }) => {
//     const defaultColor = `bg-${isMainCL}-500 hover:bg-${isMainCL}-600`;
//     const outlineColor = `text-${isMainCL}-500 border border-${isMainCL}-500 hover:bg-${isMainCL}-50 hover:text-${isMainCL}-600`;

//     return (
//         <div className={`p-4 rounded-lg shadow-lg transition-shadow duration-300 mb-4 ${address.isDefault ? 'border-2 border-mainCL' : 'border border-gray-300'}`}>
//             <div className="flex justify-between items-start mb-2">
//                 <span className="font-bold text-lg">{address.name}</span>
//                 {address.isDefault && (
//                     <span className={`bg-mainCL text-white text-xs font-semibold px-2 py-1 rounded-full`}>MẶC ĐỊNH</span>
//                 )}
//             </div>
//             <p className="text-sm text-gray-600">SĐT: {address.phone}</p>
//             <p className="text-sm mt-1">{address.fullAddress}</p>

//             <div className="flex justify-end space-x-3 mt-4 pt-3 border-t border-gray-100">
//                 <button
//                     onClick={() => onEdit(address)}
//                     className="text-blue-500 hover:text-blue-700 text-sm font-medium"
//                 >
//                     Sửa
//                 </button>
//                 <button
//                     onClick={() => onDelete(address.id)}
//                     className="text-red-500 hover:text-red-700 text-sm font-medium"
//                 >
//                     Xóa
//                 </button>
//                 {!address.isDefault && (
//                     <button
//                         onClick={() => onSetDefault(address.id)}
//                         className={`px-3 py-1 text-sm rounded-md font-medium ${outlineColor}`}
//                     >
//                         Đặt làm Mặc định
//                     </button>
//                 )}
//             </div>
//         </div>
//     );
// };


// // --- Component Chính: Sổ Địa Chỉ ---
// export function Address() {
//     const [addresses, setAddresses] = useState(initialAddresses);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [currentAddress, setCurrentAddress] = useState(null); // Dùng cho Sửa
//     const [formState, setFormState] = useState({
//         name: '',
//         phone: '',
//         fullAddress: '',
//         isDefault: false
//     });

//     // Giả định màu chính (mainCL) là cam (orange-500)
//     const mainCL = "orange";

//     // Mở Modal (Cho Thêm hoặc Sửa)
//     const handleOpenModal = (address = null) => {
//         if (address) {
//             setCurrentAddress(address);
//             setFormState({ ...address });
//         } else {
//             setCurrentAddress(null);
//             setFormState({ name: '', phone: '', fullAddress: '', isDefault: false });
//         }
//         setIsModalOpen(true);
//     };

//     // Đóng Modal
//     const handleCloseModal = () => {
//         setIsModalOpen(false);
//         setCurrentAddress(null);
//     };

//     // Xử lý thay đổi form
//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setFormState(prev => ({
//             ...prev,
//             [name]: type === 'checkbox' ? checked : value,
//         }));
//     };

//     // Xử lý Lưu/Cập nhật
//     const handleSave = (e) => {
//         e.preventDefault();

//         // Logic UI: Cập nhật trạng thái Mặc định của các địa chỉ khác
//         const newAddresses = addresses.map(addr => ({
//             ...addr,
//             isDefault: formState.isDefault ? false : addr.isDefault
//         }));

//         if (currentAddress) {
//             // SỬA
//             setAddresses(newAddresses.map(addr =>
//                 addr.id === currentAddress.id
//                     ? { ...formState, id: currentAddress.id }
//                     : addr
//             ));
//         } else {
//             // THÊM MỚI
//             const newId = Math.max(...addresses.map(a => a.id), 0) + 1;
//             setAddresses([
//                 ...newAddresses,
//                 { ...formState, id: newId },
//             ]);
//         }

//         handleCloseModal();
//     };

//     // Xử lý Đặt làm Mặc định
//     const handleSetDefault = (idToSet) => {
//         setAddresses(addresses.map(addr => ({
//             ...addr,
//             isDefault: addr.id === idToSet,
//         })));
//     };

//     // Xử lý Xóa
//     const handleDelete = (idToDelete) => {
//         if (window.confirm("Bạn có chắc chắn muốn xóa địa chỉ này?")) {
//             const updatedAddresses = addresses.filter(addr => addr.id !== idToDelete);

//             // Logic UI: Nếu địa chỉ mặc định bị xóa, đặt địa chỉ đầu tiên còn lại làm mặc định
//             if (addresses.find(a => a.id === idToDelete)?.isDefault && updatedAddresses.length > 0) {
//                 updatedAddresses[0].isDefault = true;
//             }

//             setAddresses(updatedAddresses);
//         }
//     };


//     return (
//         <div className="p-6 bg-white rounded-xl shadow-lg w-full">
//             <h2 className="text-2xl md:text-3xl font-bold text-mainCL uppercase mb-6">Sổ Địa Chỉ</h2>

//             <button
//                 onClick={() => handleOpenModal(null)}
//                 className={`mb-6 px-6 py-2 rounded-lg font-semibold text-white ${mainCL === "orange" ? "bg-orange-500 hover:bg-orange-600" : `bg-${mainCL}-500 hover:bg-${mainCL}-600`} transition-colors duration-200`}
//             >
//                 + Thêm Địa Chỉ Mới
//             </button>

//             <div className="space-y-4">
//                 {addresses.length === 0 ? (
//                     <p className="text-gray-500 italic">Bạn chưa có địa chỉ nào được lưu.</p>
//                 ) : (
//                     addresses.map(addr => (
//                         <AddressCard
//                             key={addr.id}
//                             address={addr}
//                             onEdit={handleOpenModal}
//                             onDelete={handleDelete}
//                             onSetDefault={handleSetDefault}
//                             isMainCL={mainCL}
//                         />
//                     ))
//                 )}
//             </div>

//             {/* Modal Form */}
//             <Modal
//                 isOpen={isModalOpen}
//                 onClose={handleCloseModal}
//                 title={currentAddress ? "Cập Nhật Địa Chỉ" : "Thêm Địa Chỉ Mới"}
//             >
//                 <form onSubmit={handleSave}>
//                     <InputSimple
//                         label="Tên Người Nhận"
//                         name="name"
//                         value={formState.name}
//                         onChange={handleChange}
//                         placeholder="Nguyễn Văn A"
//                     />
//                     <InputSimple
//                         label="Số Điện Thoại"
//                         name="phone"
//                         type="tel"
//                         value={formState.phone}
//                         onChange={handleChange}
//                         placeholder="09xx xxx xxx"
//                     />
//                     <div className="mb-4">
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ chi tiết</label>
//                         <textarea
//                             name="fullAddress"
//                             rows="3"
//                             value={formState.fullAddress}
//                             onChange={handleChange}
//                             placeholder="Số nhà, tên đường, Phường/Xã, Quận/Huyện, Tỉnh/Thành phố"
//                             className="w-full border border-gray-300 p-2 rounded-md focus:ring-mainCL focus:border-mainCL"
//                         />
//                     </div>

//                     <div className="flex items-center mb-6">
//                         <input
//                             id="isDefault"
//                             name="isDefault"
//                             type="checkbox"
//                             checked={formState.isDefault}
//                             onChange={handleChange}
//                             className="h-4 w-4 text-mainCL border-gray-300 rounded"
//                         />
//                         <label htmlFor="isDefault" className="ml-2 block text-sm text-gray-900">
//                             Đặt làm địa chỉ mặc định
//                         </label>
//                     </div>

//                     <div className="flex justify-end space-x-3">
//                         <button
//                             type="button"
//                             onClick={handleCloseModal}
//                             className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100"
//                         >
//                             Hủy
//                         </button>
//                         <button
//                             type="submit"
//                             className={`px-4 py-2 text-white rounded-md font-semibold bg-mainCL hover:bg-orange-600`}
//                         >
//                             {currentAddress ? "Cập Nhật" : "Lưu Địa Chỉ"}
//                         </button>
//                     </div>
//                 </form>
//             </Modal>
//         </div>
//     );
// }