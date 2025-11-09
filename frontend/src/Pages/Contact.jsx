import { TextArea, Input } from "../Components/input"
import { useState } from "react"

export function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form DATA CONTACT US: ", formData);
        alert("Xem thông tin input của form khi được gửi ở F12 nhé em! Chưa có Backend á!")
    }

    return (
        <div className="animate__animated animate__fadeIn flex flex-col items-center justify-center px-[5%] bg-gray-50">
            <p className="text-[50px] font-semibold text-mainCL mb-10">Contacs Us</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-10 xl:gap-16 mb-10 px-3 content-between w-full">
                <InfoUs cls_icon={"bi bi-envelope-at"} title={"Email Us"} content_1={"23050118@student.bdu.edu.vn"} content_2={"aovFF@garena.com"} />
                <InfoUs cls_icon={"bi bi-telephone-plus"} title={"Call Us"} content_1={"+84 328884320"} content_2={"Open 24/7"} />
                <InfoUs cls_icon={"bi bi-geo-alt"} title={"Visit Us"} content_1={"504 Binh Duong Street"} content_2={"Hiep Thanh, Ho Chi Minh City"} />
                <div className="col-span-full">
                    <AboutUs />
                </div>
            </div>
            <div className=" w-full mx-auto py-10">
                <SendUs formData={formData} onChange={handleChange} handleSubmit={handleSubmit} />
            </div>
        </div>

    )
}

function InfoUs({ cls_icon, title, content_1, content_2 }) {
    return (
        <div className="bg-white flex flex-col p-5 rounded-md border border-gray-100 shadow-md w-full min-w-[240px]">
            <div className="mb-5">
                <i className={`${cls_icon} px-2 rounded-md text-3xl bg-orange-100 text-mainCL`}></i>
            </div>
            <span className="text-xl font-bold mb-3">{title}</span>
            <span className="text-base font-light">{content_1}</span>
            <span className="text-base font-light">{content_2}</span>

        </div>
    )
}

function AboutUs() {
    return (
        <div className="bg-white flex flex-col p-5 rounded-md border border-gray-100 shadow-md w-full">
            <div className="mb-5">
                <i className={`bi bi-people px-2 rounded-md text-3xl bg-orange-100 text-mainCL`}></i>
            </div>
            <span className="text-xl font-bold mb-3">About Us</span>
            <span className="text-base font-light">Binh Duong University</span>
            <span className="text-base font-light">Faculity Of Infomation, Robotics, and Artificial Intelligence</span>
            <p className="mt-3 font-semibold">Member Of Group (2023-2027)</p>
            <ul className="list-none text-xs font-thin">
                <li>Nguyen Tuan Anh</li>
                <li>Le Ngoc Sang</li>
                <li>Nguyen Manh Phat</li>
                <li>Le Dinh Tuyen</li>
            </ul>
        </div>
    )
}
function SendUs({ formData, onChange, handleSubmit }) {
    return (
        <form className="bg-white px-10 rounded-xl shadow-xl py-10" onSubmit={handleSubmit}>
            <div className="text-center text-5xl capitalize text-mainCL font-semibold mb-10">Send us Message</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input
                    name={"name"}
                    type={"text"} label_content={"Your Name"}
                    placeholder={"Enter Your Name"} id_input={"ct_ip1"}
                    cls_icon={"bi bi-person-vcard"}
                    value={formData.name}
                    onChange={onChange}
                />
                <Input
                    name={"email"}
                    type={"email"} label_content={"Email Address"}
                    placeholder={"Your Email Address"} id_input={"ct_ip2"}
                    cls_icon={"bi bi-envelope-at"}
                    value={formData.email}
                    onChange={onChange}
                />
                <div className="col-span-full">
                    <Input
                        name={"subject"}
                        type={"text"} label_content={"Subject"}
                        placeholder={"How can we help?"} id_input={"ct_ip3"}
                        cls_icon={"bi bi-person-vcard"}
                        value={formData.subject}
                        onChange={onChange}
                    />
                </div>
                <div className="col-span-full">
                    <TextArea
                        name={"message"}
                        type={"text"} label_content={"Message"}
                        placeholder={"Tell us about your problem..... :D"} id_input={"ct_ip4"}
                        cls_icon={"bi bi-chat-dots"}
                        value={formData.message}
                        onChange={onChange}
                    />
                </div>
            </div>
            <button type="submit" className="bg-mainCL text-white text-2xl py-2 px-4 rounded-md mt-10">
                <i className="bi bi-send-arrow-up"></i>
                <span className="ms-2">Send Message</span>
            </button>
        </form>
    )
}

