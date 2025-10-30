// cần lưu ý:  với modal này thì cần có logic
// isOpen? ra nd modal : null
// onClose mục đích là đóng modal thông qua gọi hàm và
// set giá trị isOpen = No tại ptu cha (thong qua 1 state rieng cua cha)
// handleYes,No thực thi hàm khi nhấn vào nút yes, no

// const name =()=>{} la function name (){}

export function Modal({ isOpen, onClose, title, jsxContent }) {

    if (!isOpen) {
        return null;
    }
    return (
        <>
            <div className="bg-black opacity-40 fixed inset-0"></div>
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm mx-4">
                    <div className="w-[95%] mx-auto  text-xl flex justify-between border-b-[1px] border-gray-300 items-start pb-2 text-mainCL mb-5">
                        <span className=" font-semibold">
                            {title}
                        </span>
                        <i className="bi bi-x-lg" onClick={onClose}></i>
                    </div>
                    <div className="mb-6">
                        {jsxContent}
                    </div>
                </div>
            </div>
        </>
    )
}