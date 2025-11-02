import { eg_phone, list_img } from "../Data_Test/Data_Home_Test";
import { useState } from "react";
import { priceFormatter, scrollToTopSmooth } from "../utils/utils";
import { Link } from "react-router-dom";

// Check thêm ktra trong kho xem còn hàng ko 

export function ProductDetails({ product = eg_phone, status = true, listIMG = list_img }) {

    return (
        <div className="animate__animated animate__fadeIn">
            {scrollToTopSmooth()}
            <div className="grid grid-cols-1 md:grid-cols-2 bg-white pt-5">
                <div className="p-5">
                    <SlideIMG arr_Img={listIMG} product={product} />
                </div>
                <div className="p-5" >
                    <InfoTop product={product} status={status} />
                </div>
                <div className="col-span-full">
                    <InfoBottom product={product} status={status} />
                </div>
            </div>
        </div>
    )
}
function SlideIMG({ arr_Img }) {
    const [imgLink, setImgLink] = useState(arr_Img[0].link);
    function handleSetImgLink(link) {
        setImgLink(link)
    }
    const arr = arr_Img.map(i => {
        return (<img src={i.link} alt="" onClick={() => { handleSetImgLink(i.link) }} key={i.id}
            className={`aspect-[16/9] w-1/6 border border-gray-200 rounded-md transition-all ease-linear duration-300
            ${(imgLink == i.link) ? "scale-105 border-mainCL" : ""}`} />)
    })
    return (
        <div>
            <div>
                <img src={imgLink} alt="" className="aspect-[16/9] w-[90%] rounded-xl mx-auto" />

            </div>
            <div className="flex gap-3 py-3 justify-center">
                {arr}
            </div>
        </div>
    )
}
function InfoTop({ product, status }) {
    return (
        <div>
            <p className="text-2xl font-bold mb-5">
                {product.phone_name} {product.variant_ph_ram}GB/{product.variant_ph_rom}GB
            </p>
            <div className="flex font-semibold items-end gap-5 mb-5">
                <span className="text-gray-400 text-base line-through">{priceFormatter(product.variant_ph_org_price)}₫</span>
                <span className="text-2xl font-bold text-mainCL">{priceFormatter(product.variant_ph_new_price)}₫</span>
            </div>
            <div className="mb-3">
                <span className="font-semibold">Status: </span>
                {status
                    ? (<span className="text-green-600 font-semibold"> Còn hàng </span>)
                    : (<span className="text-red-600 font-semibold"> Hết hàng </span>)
                }
            </div>
            <div className="mb-3 text-justify text-sm md:text-base">
                <span className="font-semibold">Desc: </span>
                {product.phone_desc}
            </div>
            <div className="mb-3 text-justify text-sm md:text-base">
                <span className="font-semibold">Tinh trang may:  </span>
                {product.variant_state}
            </div>
        </div>
    )
}
function InfoBottomItems({ cls_icon, clr_icon, title, content }) {
    return (
        <div className="flex items-center p-3 bg-white rounded-lg shadow-sm">
            <i className={`${cls_icon} text-2xl mr-3`} style={{ color: clr_icon }}></i>
            <div>
                <p className="font-semibold text-sm text-gray-600">{title}</p>
                <p className="font-bold">{content}</p>
            </div>
        </div>
    )
}

function InfoBottom({ product, status }) {
    return (
        <div className="rounded-lg w-[95%] mx-auto overflow-hidden">
            <p className="text-center text-3xl font-semibold  bg-mainCL text-white py-3">
                Chi tiet san pham
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 p-6 bg-slate-100 rounded-lg">
                <InfoBottomItems content={product.phone_chip} title={"Chip"} cls_icon="bi bi-cpu" clr_icon="#2563eb" />
                <InfoBottomItems content={`${product.phone_battery} mAh`} title={"Pin"} cls_icon="bi bi-battery-full" clr_icon="#16a34a" />
                <InfoBottomItems content={product.phone_system} title={"Hệ điều hành"} cls_icon="bi bi-android" clr_icon="#22c55e" />
                <InfoBottomItems content={product.phone_screen_size} title={"Màn hình"} cls_icon="bi bi-phone" clr_icon="#9333ea" />
                <InfoBottomItems content={product.phone_front_cam} title={"Camera trước"} cls_icon="bi bi-camera" clr_icon="#dc2626" />
                <InfoBottomItems content={product.phone_behind_cam} title={"Camera sau"} cls_icon="bi bi-camera-fill" clr_icon="#b91c1c" />
                <InfoBottomItems content={product.phone_charging_port} title={"Cổng sạc"} cls_icon="bi bi-earbuds" clr_icon="#4f46e5" />
                <InfoBottomItems content={`${product.phone_sim_card} sim`} title={"Sim"} cls_icon="fa-solid fa-sim-card" clr_icon="#eab308" />
                <InfoBottomItems content={product.phone_nfc ? "Có" : "Không"} title={"NFC"} cls_icon="fa-brands fa-nfc-symbol" clr_icon="#3b82f6" />
                <InfoBottomItems content={`${product.variant_ph_ram} GB`} title={"RAM"} cls_icon="fa-solid fa-memory" clr_icon="#ea580c" />
                <InfoBottomItems content={`${product.variant_ph_rom} GB ${product.phone_memory_card ? "(có thẻ nhớ)" : ""}`} title={"ROM"} cls_icon="fa-solid fa-database" clr_icon="#14b8a6" />
                <InfoBottomItems content={product.variant_ph_color} title={"Màu"} cls_icon="bi bi-palette" clr_icon="#ec4899" />
                <InfoBottomItems content={product.phone_release_year} title={"Năm phát hành"} cls_icon="bi bi-calendar" clr_icon="#0891b2" />
                <InfoBottomItems content={product.phone_ear_phone} title={"Tai nghe"} cls_icon="bi bi-headphones" clr_icon="#8b5cf6" />
            </div>

            <div className="flex justify-evenly py-5">
                <button className="text-xl font-semibold bg-[#FFEF00] px-2 py-1 rounded-md">
                    <i className="bi bi-cart-plus me-2"></i>
                    Add To Cart
                </button>
                {status && (
                    <Link to="/Order" className="text-xl font-semibold bg-[#39FF14] px-2 py-1 rounded-md">
                        <i className="fa-regular fa-credit-card me-2"></i>
                        Buy now
                    </Link>
                )}
            </div>
        </div>
    )
}