import { Input, InputPassword, Or } from "../Components/input";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ButtonActiveLink } from "../Components/Button";
export function SignUp() {
    const [valueChecked, setValueChecked] = useState("");
    function changeValueChecked(id) {
        setValueChecked(id);
    }

    return (
        <div className="flex items-center animate__animated animate__fadeIn">
            <form action="" method="post" className="w-[55%] text-gray-500 min-w-[350px] px-5 py-5 my-10 rounded-xl border-gray-300 border-[1px] mx-auto bg-white">
                <div className="text-center mb-5">
                    <p className="text-[28px] font-bold text-black">Join us today!</p>
                    <p>Create your account to explore the best phone deals</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-2.5">
                    <Input label_content={"First name"} id_input={"su_ip1"} cls_icon={"bi bi-person-vcard"} type={"text"} />
                    <Input label_content={"Last name"} id_input={"su_ip2"} cls_icon={"bi bi-person-vcard"} type={"text"} />
                    <Input label_content={"Emal Address"} id_input={"su_ip3"} cls_icon={"bi bi-envelope"} type={"email"} />
                    <div className="mt-2 lg:row-start-4 lg:col-span-full">
                        <p className="text-black font-semibold mb-1 capitalize text-center"> Gender</p>
                        <div className=" flex justify-center gap-5 items-center">
                            <ValueInputRadio
                                name={"gender"} id_input={"su_ip7_1"} cls_icon={"bi bi-gender-male"} content={"Male"}
                                valueChecked={valueChecked} changeValueChecked={() => { changeValueChecked("su_ip7_1") }} />
                            <ValueInputRadio
                                name={"gender"} id_input={"su_ip7_2"} cls_icon={"bi bi-gender-female"} content={"Female"}
                                valueChecked={valueChecked} changeValueChecked={() => { changeValueChecked("su_ip7_2") }} />
                        </div>
                    </div>
                    <Input label_content={"Birth day"} id_input={"su_ip4"} cls_icon={"bi bi-cake2"} type={"date"} />
                    <InputPassword label_content={"Password"} id_input={"su_ip5"} />
                    <InputPassword label_content={"register password"} id_input={"su_ip6"} />

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

export function ValueInputRadio({ name, id_input, cls_icon, content, valueChecked, changeValueChecked }) {
    return (
        <div>
            <label
                htmlFor={id_input} className={`cursor-pointer px-2 py-1 rounded-lg border-2 transition-all duration-300 ease-linear flex
                    ${valueChecked === id_input ? "bg-mainCL text-white" : ""}`}>
                <i className={cls_icon}></i>
                <p className="ms-2">{content}</p>
            </label>
            <input type="radio" name={name} id={id_input} className="hidden" onChange={changeValueChecked} />
        </div>
    )
}
