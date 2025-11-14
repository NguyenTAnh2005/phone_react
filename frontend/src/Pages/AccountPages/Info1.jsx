import { useEffect, useState } from "react";
import { Input } from "../../Components/input.jsx";
import { getStringGender, getDate } from "../../utils/utils.jsx";

export function Info1({ prop, reFetchAPI }) {
    const [letChange, setLetChange] = useState(false);

    const [formData, setFormData] = useState({
        first_name: prop.account_first_name,
        last_name: prop.account_last_name,
        gender: prop.account_gender,
        birth: getDate(prop.account_date)
    });

    useEffect(() => {
        setFormData({
            first_name: prop.account_first_name,
            last_name: prop.account_last_name,
            gender: prop.account_gender,
            birth: getDate(prop.account_date)
        });
    }, [prop]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleCancel = () => {
        setLetChange(false);
        setFormData({
            first_name: prop.account_first_name,
            last_name: prop.account_last_name,
            gender: prop.account_gender,
            birth: getDate(prop.account_date)
        });
    }

    const postUpdate = async () => {
        console.log("Gửi dữ liệu cập nhật Info 1: ", formData);
        await new Promise(resolve => setTimeout(resolve, 500));
        alert("Da gui API PUT o F12");
    }
    const handleSave = async () => {
        await postUpdate();
        setLetChange(false);
        reFetchAPI();
    }
    return (
        <div className="p-5">
            <p className="text-center text-2xl md:text-3xl font-semibold text-mainCL uppercase mb-6">
                Thông tin khách hàng
            </p>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                    name={"first_name"}
                    id_input={"info1_ip1"} label={"First name"}
                    type={"text"} placeholder={"Nhập tên của bạn ..."}
                    disable={!letChange} cls_icon="bi bi-person-vcard"
                    value={formData.first_name}
                    onChange={handleChange}
                />
                <Input
                    name={"last_name"}
                    id_input={"info1_ip2"} label={"Last name"}
                    type={"text"} placeholder={"Nhập họ và tên dệm ...."}
                    disable={!letChange} cls_icon="bi bi-person-vcard"
                    value={formData.last_name} onChange={handleChange}
                />
                <SelectGender
                    name={"gender"}
                    id_input={"info1_ip3"} id_value1="prop_ip3_1"
                    value={formData.gender}
                    value1={true}
                    value2={false}
                    id_value2="info1_ip3_2" label={"Gender"}
                    disable={!letChange} onChange={handleChange}
                />
                <Input
                    name={"birth"}
                    id_input={"info1_ip4"} label={"Birth"}
                    type={"date"} placeholder={""}
                    disable={!letChange} cls_icon="bi bi-cake2"
                    value={formData.birth} onChange={handleChange}
                />
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6 col-span-full">
                    {!letChange ? (
                        <button
                            type="button"
                            className="px-6 py-2 rounded-md border-2 border-mainCL font-semibold text-mainCL hover:bg-mainCL hover:text-white transition-colors duration-200"
                            onClick={() => setLetChange(true)}
                        >
                            Change
                        </button>
                    ) : (
                        <div className="flex flex-col sm:flex-row gap-4 ">
                            <button
                                type="button"
                                onClick={handleSave}
                                className="px-6 py-2 bg-mainCL text-white rounded-md hover:bg-orange-600 transition-colors duration-200"
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
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

export function SelectGender({ name, id_input, value, value1, id_value1, value2, id_value2, placeholder, label, disable, onChange }) {
    return (
        <div className="flex flex-col w-full">
            <label htmlFor={id_input} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <select
                id={id_input} name={name}
                placeholder={placeholder}
                value={value}
                className="outline-none border border-gray-400 py-2 px-3 rounded-md focus:border-mainCL focus:ring-1 focus:ring-mainCL transition-colors duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                disabled={disable} onChange={onChange}
            >
                <option id={id_value1} value={value1}>{getStringGender(value1)}</option>
                <option id={id_value2} value={value2}>{getStringGender(value2)}</option>
            </select>
        </div>
    );
}



