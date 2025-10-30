import { Input, InputPassword, Or } from "../Components/input";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ButtonActiveLink } from "../Components/Button";
import { getDate } from "../utils/utils";
export function SignUp() {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        gender: null,
        birth: "",
        password: "",
        register_password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form DATA SIGN UP: ", formData);
        alert("Xem thông tin input của form khi được gửi ở F12 nhé em! Chưa có Backend á!")
    }

    return (
        <div className="flex items-center animate__animated animate__fadeIn">
            <form onSubmit={handleSubmit} className="w-[55%] text-gray-500 min-w-[350px] px-5 py-5 my-10 rounded-xl border-gray-300 border-[1px] mx-auto bg-white">
                <div className="text-center mb-5">
                    <p className="text-[28px] font-bold text-black">Join us today!</p>
                    <p>Create your account to explore the best phone deals</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-2.5">
                    <Input
                        name="first_name" label="First name"
                        placeholder={"Nhập tên của bạn ..."}
                        id_input="su_ip1" cls_icon="bi bi-person-vcard"
                        type="text" value={formData.first_name}
                        onChange={handleChange}
                    />
                    <Input
                        name="last_name" label="Last name"
                        placeholder={"Nhập họ và tên đệm ..."}
                        id_input="su_ip2" cls_icon="bi bi-person-vcard"
                        type="text" value={formData.last_name}
                        onChange={handleChange}
                    />

                    <Input
                        name="email" label="Email Address"
                        placeholder={"Nhập email của bạn ..."}
                        id_input="su_ip3" cls_icon="bi bi-envelope"
                        type="email" value={formData.email}
                        onChange={handleChange}
                    />

                    <Input
                        name="birth" label="Birth day"
                        placeholder={""}
                        id_input="su_ip4" cls_icon="bi bi-cake2"
                        type="date" value={formData.birth}
                        onChange={handleChange}
                    />

                    <div className="mt-2 lg:row-start-4 lg:col-span-full">
                        <p className="text-black font-semibold mb-1 capitalize text-center"> Gender</p>
                        <div className=" flex justify-center gap-5 items-center">
                            <ValueInputRadio
                                name="gender" id_input="su_ip7_1"
                                cls_icon="bi bi-gender-male"
                                content="Male"
                                value={true}
                                checked={formData.gender == "true"}
                                onChange={handleChange}
                            />

                            <ValueInputRadio
                                name="gender" id_input="su_ip7_2"
                                cls_icon="bi bi-gender-female"
                                content="Female"
                                value={false}
                                checked={formData.gender == "false"}
                                onChange={handleChange}
                            />

                        </div>
                    </div>
                    <InputPassword
                        name="password" label="Password"
                        placeholder={"Nhập mật khẩu ..."}
                        id_input="su_ip5" value={formData.password}
                        onChange={handleChange}
                    />

                    <InputPassword
                        name="register_password" label="Register password"
                        placeholder={"Xác nhận mật khẩu ..."}
                        id_input="su_ip6" value={formData.register_password}
                        onChange={handleChange}
                    />


                </div>
                <ButtonActiveLink
                    link={""} type="button" content={"Sign Up"}
                    classTail={"bg-mainCL font-semibold w-full lg:w-[50%] lg:ml-[25%] rounded-lg py-1 mt-10 text-white"}
                />
                <Or />
                <div className="flex justify-center gap-2">
                    <p>Already have an account?</p>
                    <Link to="/log-in"
                        className="text-mainCL font-bold">
                        Log In
                    </Link>
                </div>

            </form>
        </div>
    )
}

export function ValueInputRadio({ name, id_input, cls_icon, content, value, onChange, checked }) {
    return (
        <div>
            <label
                htmlFor={id_input}
                className={`cursor-pointer px-2 py-1 rounded-lg border-2 
                    transition-all duration-300 ease-linear flex
                    ${checked ? "bg-mainCL text-white" : ""}`}>
                <i className={cls_icon}></i>
                <p className="ms-2">{content}</p>
            </label>
            <input
                type="radio"
                name={name}
                id={id_input}
                value={value}
                onChange={onChange}
                className="hidden"
            />
        </div>
    )
}
