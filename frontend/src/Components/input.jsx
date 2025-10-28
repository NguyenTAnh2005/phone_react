import { useState } from "react";


export function Input({ id_input, type, label, placeholder, cls_icon = "", disable = false, valueInput: defaultValue = "" }) {
    const [valueInput, setValueInput] = useState(defaultValue)
    function handleChangeValue(e) {
        setValueInput(e.target.value);
    }
    return (
        <div className=" flex flex-col">
            <label htmlFor={id_input} className="text-black font-semibold mb-1 capitalize -translate-x-2">{label}</label>
            <div className="flex relative">
                <input
                    type={type} id={id_input} name={id_input}
                    value={valueInput} placeholder={placeholder}
                    className="w-full border border-1 border-gray-400 rounded-md py-1 focus:outline-none indent-[40px] text-gray-600"
                    disabled={disable}
                    onChange={handleChangeValue}
                />
                <i className={`${cls_icon} absolute text-mainCL text-xl rounded-md top-0.5 left-0 translate-x-[50%] `}></i>
            </div>
        </div>
    )
}


export function InputPassword({ label_content, id_input }) {
    const [showPass, setShowPass] = useState(false);
    function changeModePass() {
        return setShowPass(!showPass);
    }
    return (
        <div className=" flex flex-col relative">
            <label htmlFor={id_input} className="text-black font-semibold capitalize mb-1 -translate-x-2">{label_content}</label>
            <div className="flex relative">
                <input type={showPass ? "text" : "password"}
                    id={id_input} name={id_input}
                    placeholder={`Enter your ${label_content}`}
                    className="w-[100%] border border-1 border-gray-400
                        rounded-md py-1 focus:outline-none indent-[40px] text-gray-600" />
                <i className="bi bi-lock absolute text-mainCL text-[20px] 
                    rounded-md top-0.5 left-0 translate-x-[50%] "></i>
            </div>
            <i onClick={changeModePass}
                className={` text-mainCL text-[18px] absolute top-[50%] right-[2%] 
                    bi ${showPass ? "bi-eye-fill" : "bi-eye-slash-fill"}`}></i>
        </div>
    )
}


export function Or() {
    return (
        <div className="relative mb-4 mt-4">
            <hr className="border-gray-300 border-1 mx-5" />
            <span className="absolute ml-[50%] px-3 text-mainCL font-medium bg-white top-0 left-0 -translate-x-[50%] -translate-y-[50%]">
                or
            </span>
        </div>
    )
}

export function TextArea({ type, label_content, id_input, cls_icon, placeholder }) {
    return (
        <div className=" flex flex-col">
            <label htmlFor={id_input} className="text-black font-semibold mb-1 capitalize -translate-x-2">{label_content}</label>
            <div className="flex relative">
                <textarea type={type} id={id_input} name={id_input}
                    placeholder={placeholder}
                    className="w-full border border-1 border-gray-400
                        rounded-md py-1 focus:outline-none indent-[40px] text-gray-600" />
                <i className={`${cls_icon} absolute text-mainCL text-[20px] 
                    rounded-md top-0.5 left-0 translate-x-[50%] `}></i>
            </div>
        </div>
    )
}
