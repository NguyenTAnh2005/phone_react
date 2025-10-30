import { list_category, list_hotline, list_support } from "./StaticData/footer_data"

export function Footer() {
    return (
        <div className="flex flex-col bg-gray-900 text-white">
            <SubscribleForm />
            <div className="flex flex-col lg:flex-row lg:gap-8">
                <Present />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                    <List_info title="Support" list={list_support} />
                    <List_info title="Category" list={list_category} />
                    <List_info title="Hotline" list={list_hotline} />
                </div>
            </div>
            <CopyLeft />
        </div>
    )
}
export function SubscribleForm() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 py-5 lg:py-12 bg-mainCL text-white px-10 lg:px-0">
            <div className="flex flex-col items-center lg:my-auto">
                <span className="lg:text-4xl text-3xl text-center font-sans font-bold">Theo dõi chúng tôi</span>
                <span className="lg:text-lg text-base text-center mt-2">Nhận thông báo để cập nhật các thông tin mới nhất!</span>
            </div>
            <div className="flex flex-col items-center gap-5 mt-5 lg:flex-row lg:gap-10 lg:mt-0">
                <input type="email" placeholder="Nhập email của bạn"
                    className="border border-gray-300 rounded-lg  w-72 sm:w-80 lg:w-96 py-2.5 pl-2.5 text-black focus:outline-none" />
                <button className="hover:bg-white hover:text-mainCL rounded-xl text-xl xl:text-2xl px-6 py-2 font-medium
                 bg-mainCL text-white outline outline-1 outline-white transition-all ease-linear duration-300">
                    Theo dõi
                </button>
            </div>
        </div>
    )
}
function Present() {
    return (
        <div className=" flex flex-col items-center px-5 lg:px-0 lg:items-start w-[90%] mx-auto outline-1 lg:w-1/3 lg:m-0 lg:ml-3 mt-5 text-center lg:text-start">
            <span className="text-[40px] font-extrabold">
                <i className="bi bi-phone mr-2"></i>
                Phone React
            </span>
            <p className="text-[20px] text-gray-400">
                Điểm đến đáng tin cậy cho điện thoại thông minh của bạn. Sản phẩm chất lượng, giá cả hợp lý và luôn đặt khách hàng lên hàng đầu.
            </p>
            <ul className="list-none flex text-2xl gap-3 mt-5">
                <Hotline_item link="https://www.facebook.com/share/16gujfbgwE/" cls_icon="bi bi-facebook" />
                <Hotline_item link="https://youtube.com/@n_t_anh?si=-9eMmF6Scpz04ukz" cls_icon="bi bi-youtube" />
                <Hotline_item link="" cls_icon="bi bi-instagram" />
            </ul>
        </div>
    )
}
function Hotline_item({ link, cls_icon }) {
    return (
        <li className="bg-gray-700 px-2.5 py-1.5 rounded-full text-white transition-all ease-linear duration-300
         hover:bg-white hover:text-mainCL hover:-translate-y-1"
        >
            <a href={`${link}`}>
                <i className={`${cls_icon}`}></i>
            </a>
        </li>
    )
}

function List_info({ list, title }) {
    const copy_list = list.map(i => (
        <li key={i.id} className="capitalize text-gray-400 text-[15px] cursor-pointer hover:text-white transition-colors ease-linear duration-300">
            <a>{i.name}</a>
        </li>
    ));

    return (
        <div className="mt-5 px-5 lg:px-0">
            <span className=" text-[30px]">
                {title}
            </span>
            <ul className="list-none mt-2 flex flex-col gap-2 ml-3">
                {copy_list}
            </ul>
        </div>
    )
}
function CopyLeft() {
    return (
        <div className="mt-10 pb-10">
            <p className="text-gray-400 text-center">
                Oct 10<sup>th</sup> 2025 @Copyright by student from Binh Duong University - 23050118
                <i className="ri-reactjs-line ms-3 me-1 text-xl"></i>
                <i className="ri-tailwind-css-line mx-1 text-xl"></i>
                <i className="ri-openai-fill text-xl"></i>
            </p>
        </div>
    )
}