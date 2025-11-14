import { useEffect, useState } from "react";
import { Input, InputPassword } from "../../Components/input";

export function Info2({ prop, reFetchAPI }) {
    const [access, setAccess] = useState(false);
    const [letChange2, setLetChange2] = useState(false);
    const [testPassword, setTestPassword] = useState("");
    //Form thay đổi 
    const [formData, setFormData] = useState({
        email: prop.account_email,
        password: prop.account_password
    });
    // Set lại form data mỗi khi có sự thay đổi từ PROP
    useEffect(() => {
        setFormData({
            email: prop.account_email,
            password: prop.account_password
        });
    }, [prop])
    // Hàm kiểm tra mk
    const handleVerify = () => {
        const result = testPassword == prop.account_password;
        if (result) {
            alert("Mật khẩu chính xác, bạn có thê xem thông tin bảo mật của mình!");
            setAccess(true);
            return
        }
        alert("Mật khẩu chưa chính xác!! 1 đến 9 ");
    }
    // Thay đổi test password dựa theo value Input
    const handleChangeVerify = (e) => { setTestPassword(e.target.value); }
    // Sửa Form Data theo sự thay đổi của Value
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }
    // Khi cancel thì set lại value theo gốc của prop truyền vào 
    const handleCancel = () => {
        setFormData({
            email: prop.account_email,
            password: prop.account_password
        });
        setLetChange2(false);
    }
    // Hàm gửi POST PUT - API cập nhật thông tin => đang giả lập 
    const updateInfo2 = async () => {
        alert("Da gui API PUT");
        console.log("Form DATA thay doi mk, email: ", formData);
    }
    // Khi lưu thì post API PUT - promise, sau khi promise Oke thì chạy reFetchAPI 
    const handleSave = async () => {
        await updateInfo2();
        reFetchAPI();
        setLetChange2(false);
    }

    return (
        <div className="p-5">
            {!access ? (
                <div>
                    <p className="text-xl font-semibold text-center text-mainCL mb-5">Make sure you are in!</p>
                    <div>
                        <div className="w-full">
                            <InputPassword
                                name={"password"}
                                id_input={"info_2_access_password"}
                                label={"Password"}
                                placeholder={"Nhập mật khẩu xác nhận danh tính ..."}
                                onChange={handleChangeVerify}
                                value={testPassword}
                            />
                        </div>
                        <div className="flex">
                            <button
                                onClick={handleVerify}
                                type="button"
                                className="px-6 mx-auto mt-5 py-2 rounded-md border-2 border-mainCL font-semibold text-mainCL hover:bg-mainCL hover:text-white transition-colors duration-200">
                                View Info
                            </button>
                        </div>
                    </div>

                </div>
            ) : (
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        name={"email"} type={"email"} label={"Email"} id_input={"info2_ip1"}
                        placeholder={"Nhập email ..."} disable={!letChange2} cls_icon="bi bi-envelope"
                        value={formData.email} onChange={handleChange}
                    />
                    <InputPassword
                        name="password" type={"text"} label={"Password"} id_input={"info2_ip2"}
                        placeholder={"Nhập mật khẩu ..."} disable={!letChange2}
                        value={formData.password} onChange={handleChange}
                    />
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6 col-span-full">
                        {!letChange2 ? (
                            <button
                                onClick={() => { setLetChange2(true) }}
                                className="px-6 py-2 rounded-md border-2 border-mainCL font-semibold text-mainCL hover:bg-mainCL hover:text-white transition-colors duration-200"
                            >
                                Change
                            </button>
                        ) : (
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={handleSave}
                                    type="button"
                                    className="px-6 py-2 bg-mainCL text-white rounded-md hover:bg-orange-600 transition-colors duration-200"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors duration-200"
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>
                </form>
            )}
        </div>
    )
}



