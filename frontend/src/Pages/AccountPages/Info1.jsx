import { useState } from "react";
import { Input } from "../../Components/input.jsx";

export function Info1() {
    const [letChange, setLetChange] = useState(false);

    return (
        <div className="p-5">
            <p className="text-center text-2xl md:text-3xl font-semibold text-mainCL uppercase mb-6">
                Thông tin khách hàng
            </p>
            <form action="" method="POST" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input id_input={"info1_ip1"} label={"First name"} type={"text"}
                    placeholder={""} disable={!letChange} cls_icon="bi bi-person-vcard"
                />
                <Input id_input={"info1_ip2"} label={"Last name"} type={"text"}
                    placeholder={""} disable={!letChange} cls_icon="bi bi-person-vcard"
                />
                <SelectGender id_input={"info1_ip3"} value1="Male" id_value1="info1_ip3_1"
                    value2="Female" id_value2="info1_ip3_2" label={"Gender"} disable={!letChange}
                />
                <Input id_input={"info1_ip4"} label={"Birth"} type={"date"}
                    placeholder={""} disable={!letChange} cls_icon="bi bi-cake2"
                />
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6 col-span-full">
                    {!letChange ? (
                        <button
                            className="px-6 py-2 rounded-md border-2 border-mainCL font-semibold text-mainCL hover:bg-mainCL hover:text-white transition-colors duration-200"
                            onClick={() => setLetChange(true)}
                        >
                            Change
                        </button>
                    ) : (
                        <div className="flex flex-col sm:flex-row gap-4 ">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-mainCL text-white rounded-md hover:bg-orange-600 transition-colors duration-200"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setLetChange(false)}
                                className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors duration-200"
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
}

export function SelectGender({ id_input, value1, id_value1, value2, id_value2, placeholder, label, disable }) {
    return (
        <div className="flex flex-col w-full">
            <label htmlFor={id_input} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <select
                name={id_input}
                id={id_input}
                placeholder={placeholder}
                className="outline-none border border-gray-400 py-2 px-3 rounded-md focus:border-mainCL focus:ring-1 focus:ring-mainCL transition-colors duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                disabled={disable}
            >
                <option value={id_value1}>{value1}</option>
                <option value={id_value2}>{value2}</option>
            </select>
        </div>
    );
}



