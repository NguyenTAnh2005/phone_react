import { Input } from "../Components/input";
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom";
export function ForgotPassword() {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    // Đóng modal khi nhấn "X"
    function closeModal() {
        setShowModal(false);
        navigate("/log-in");
    }
    return (
        <div className="h-screen flex items-center animate__animated animate__fadeIn">
            <div method="post" className="w-full text-gray-500 max-w-[350px] rounded-xl p-10 border-gray-300 border-[1px] mx-auto bg-white">
                <div className="text-center mb-5">
                    <p className="text-[24px] font-bold text-black">Having Trouble Log In?</p>
                    <p>No worries, let’s reset your password.</p>
                </div>
                <Input id_input={"fp_ip1"} type={"email"} label={"Email"} placeholder={"Input your current Email"} cls_icon={"bi bi-envelope"} />
                <p className="my-2 text-center text-xs">Input your Email. We'll send new password to your email!</p>
                <button type=""
                    onClick={() => { setShowModal(true) }}
                    className="mt-2 bg-mainCL w-full text-white text-[18px] font-semibold rounded-lg">
                    Send
                </button>
                <div className="text-xs mt-4 text-mainCL">
                    <Link to="/log-in" >
                        <i className="bi bi-arrow-left me-1"></i>
                        Back to Log In
                    </Link>
                </div>
            </div>
            {
                showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-45 flex items-center justify-center">
                        <div className="bg-white rounded-lg flex flex-col relative pt-2.5 p-5">
                            <p className="text-mainCL font-semibold mb-2 text-[20px]">Done</p>
                            <p className="text-xs">We have sent new password to your emai. Let's go!</p>
                            <i className="bi bi-x absolute right-5 top-2.5 text-[20px]" onClick={closeModal}></i>
                        </div>
                    </div>
                )
            }
        </div>
    )
}