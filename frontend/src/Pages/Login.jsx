import { useState } from "react"
import { Link } from "react-router-dom";
import { Input, InputPassword, Or } from "../Components/input";

export function LogIn() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    // e	Là sự kiện (Event).	Khi bạn gõ phím, e mang theo thông tin về hành động đó.
    // e.target	Là ô input vừa bị thay đổi.	Cho biết chính xác ô nào người dùng vừa gõ vào (Email hay Password).
    // const { name, value } = e.target;	Lấy 2 thứ từ ô input đó: Tên (key) và Giá trị mới (value).	Giúp xác định: "Tên trường này" cần được cập nhật bằng "Giá trị mới này" trong state.
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form DATA LOG IN: ", formData);
        alert("Xem thông tin input của form khi được gửi ở F12 nhé em! Chưa có Backend á!")
    }
    return (
        <div className="h-screen flex items-center animate__animated animate__fadeIn">
            <form
                onSubmit={handleSubmit}
                className="border border-gray-300 border-1 rounded-xl bg-white text-gray-500 w-full max-w-[400px] px-10 py-10 text-base mx-auto ">
                <div className="text-center mb-7">
                    <p className="text-black text-3xl font-bold">
                        Welcome Back!
                    </p>
                    <p> Sign in to continue to your account </p>
                </div>
                <div className="mb-4">
                    <Input
                        name={"email"}
                        type={"email"}
                        label={"Email address"}
                        placeholder={"Nôn email ra đây ..."}
                        id={"li_ip1"}
                        cls_icon={"bi bi-envelope"}
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <InputPassword
                        name={"password"}
                        label={"password"}
                        placeholder={"Nhập mật khẩu ...."}
                        id_input={"li_ip2"}
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>

                <div className="text-xs font-semibold text-mainCL text-end capitalize">
                    <Link to="/forgot-password">forgot password?</Link>
                </div>
                <button type="submit" className="bg-mainCL w-full rounded-lg mt-5 text-white text-[20px] font-semibold items-center py-1 mb-2">
                    Log In
                </button>
                <Or />
                <div className="flex justify-center">
                    <span>Dont have an account?</span>
                    <span className="text-mainCL font-bold ms-2">
                        <Link to="/sign-up">Sign Up</Link>
                    </span>
                </div>
                <div className="flex mt-4">
                    <Link to="/Home" className="text-xs mx-auto text-mainCL">
                        Continue without account?
                    </Link>
                </div>
            </form>
        </div>
    )
}
