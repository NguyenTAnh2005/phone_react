import { useState } from "react";
import { Input, InputPassword } from "../../Components/input";
import { eg_account } from "../../Data_Test/Data_Home_Test";

export function Info2({ account = eg_account }) {
    const [access, setAccess] = useState(false);
    const [letChange2, setLetChange2] = useState(false);

    //Form xác nhận danh tính 
    const [verifyData, setVerifyData] = useState({
        password: ""
    });
    const handleChangeVerify = (e) => {
        const { name, value } = e.target;
        setVerifyData((prev) => ({ ...prev, [name]: value }));
    }
    const handleVerifySubmit = async (e) => {
        e.preventDefault();
        if (verifyData.password != account.account_password) {
            alert("Sai mật khẩu !!");
        }
        else {
            setAccess(true);
            console.log("Form Xac nhan danh tinh bang mk: ", verifyData);
            alert("Xem thông tin input của form khi được gửi ở F12 nhé em! Chưa có Backend á!");
        }
    }

    //Form thay đổi 
    const [formData, setFormData] = useState({
        email: account.account_email,
        password: account.account_password
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form DATA thay doi mk, email: ", formData);
        alert("Xem thông tin input của form khi được gửi ở F12 nhé em! Chưa có Backend á!");
    }

    return (
        <div className="p-5">
            {!access ? (
                <div>
                    <p className="text-xl font-semibold text-center text-mainCL mb-5">Make sure you are in!</p>
                    <form onSubmit={handleVerifySubmit}>
                        <div className="w-full">
                            <InputPassword
                                name={"password"}
                                id_input={"info_2_access_password"}
                                label={"Password"}
                                placeholder={"Nhập mật khẩu xác nhận danh tính ..."}
                                onChange={handleChangeVerify}
                            />
                        </div>
                        <div className="flex">
                            <button
                                className="px-6 mx-auto mt-5 py-2 rounded-md border-2 border-mainCL font-semibold text-mainCL hover:bg-mainCL hover:text-white transition-colors duration-200">
                                View Info
                            </button>
                        </div>
                    </form>

                </div>
            ) : (
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
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
                                    className="px-6 py-2 bg-mainCL text-white rounded-md hover:bg-orange-600 transition-colors duration-200"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => setLetChange2(false)}
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



