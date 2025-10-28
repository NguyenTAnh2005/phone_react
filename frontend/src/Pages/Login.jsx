import { useState } from "react"
import { Link } from "react-router-dom";
import { Input, InputPassword, Or } from "../Components/input";

export function LogIn() {
    return (
        <div className="h-screen flex items-center animate__animated animate__fadeIn">
            <form action={"POST"} className="border border-gray-300 border-1 rounded-xl bg-white text-gray-500 w-full max-w-[400px] px-10 py-10 text-[16px] mx-auto ">
                <div className="text-center mb-7">
                    <p className="text-black text-[28px] font-bold">
                        Welcome Back!
                    </p>
                    <p>
                        Sign in to continue to your account
                    </p>
                </div>
                <div className="mb-4">
                    <Input type={"email"} label={"Email address"}
                        placeholder={"Enter your email address"} id={"li_ip1"} cls_icon={"bi bi-envelope"} />
                </div>
                <div className="mb-4">
                    <InputPassword label_content={"password"} id_input={"li_ip2"} />
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