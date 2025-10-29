import { useState } from "react";
import { Input, InputPassword } from "../../Components/input";

export function Info2() {
    const [access, setAccess] = useState(false);
    const [letChange2, setLetChange2] = useState(false)
    return (
        <div className="p-5">
            {!access ? (
                <div>
                    <p className="text-xl font-semibold text-center text-mainCL mb-5">Make sure you are in!</p>
                    <div className="w-full">
                        <InputPassword id_input={"info_2_access_password"} label_content={"Password"} />
                    </div>
                    <div className="flex">
                        <button onClick={() => { setAccess(true) }}
                            className="px-6 mx-auto mt-5 py-2 rounded-md border-2 border-mainCL font-semibold text-mainCL hover:bg-mainCL hover:text-white transition-colors duration-200">
                            View Info
                        </button>
                    </div>
                </div>
            ) : (
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input type={"email"} label={"Email"} id_input={"info2_ip1"} placeholder={""} disable={!letChange2} cls_icon="bi bi-envelope" />
                    <InputPassword type={"text"} label_content={"Password"} id_input={"info2_ip2"} placeholder={""} disable={!letChange2} />
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6 col-span-full">
                        {!letChange2 ? (
                            <button
                                className="px-6 py-2 rounded-md border-2 border-mainCL font-semibold text-mainCL hover:bg-mainCL hover:text-white transition-colors duration-200"
                                onClick={() => setLetChange2(true)}
                            >
                                Change
                            </button>
                        ) : (
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    type="submit"
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



