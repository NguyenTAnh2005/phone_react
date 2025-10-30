import { useState } from "react";
import { ProductCard } from "../Components/product_card"
import { DealCard } from "../Components/deal_card";
import { ArticleCard } from "../Components/article_card"
import banner_img from "../assets/chess.png"
import { Link } from "react-router-dom"
import { scrollToTopSmooth } from "../utils/utils";
import { eg_phone, eg_deal, eg_article } from "../Data_Test/Data_Home_Test"
import { ButtonActiveLink } from "../Components/Button";
import { data_service } from "./StaticData/Home_data";

export function Home() {

    const base_link = "https://res.cloudinary.com/df5mtvzkn/image/upload/q_auto,f_auto/WEB_SELL_PHONE__PROJECT/TEST/Test_IMG/"
    const copy__products = [];
    const copy__deals = [];
    const copy__articles = [];
    // populate sample product cards
    for (let i = 0; i < 6; i++) {
        copy__products.push(<ProductCard key={"p" + i} product={eg_phone} baselink={base_link} />)
        copy__deals.push(<DealCard baselink={base_link} key={"d" + i} p_sale={eg_deal} />)
        copy__articles.push(<ArticleCard article={eg_article} key={"a" + i} baselink={base_link} />)
    }
    //

    return (
        <>
            {scrollToTopSmooth}
            <div className="animate__animated animate__fadeIn">
                <div className="px-3 py-5 md:px-5 md:py-10  bg-gray-50">
                    <Home_Banner services={data_service} />
                </div>
                <div className="flex flex-col items-center bg-gray-50 p-5 md:p-10 xl:p-20">
                    <p className="text-black text-[40px] font-semibold capitalize text-center">
                        Các điện thoại nổi bật
                    </p>
                    <p className="text-[20px] text-gray-600 text-center">
                        Khám phá những chiếc điện thoại bán chạy nhất của chúng tôi
                    </p>
                    <div className="mt-10 px-5 grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-x-4 gap-y-4">
                        {copy__products}
                    </div>
                    <ButtonActiveLink
                        content={"Xem tất cả điện thoại"} link={"/Phones"}
                        classTail={"mt-10 capitalize text-mainCL font-semibold text-2xl rounded-xl px-3 py-1 border border-mainCL"}
                    />
                </div>
                <div className="flex flex-col items-center bg-black  p-5 md:p-10 xl:p-20">
                    <p className="text-white text-[40px] font-semibold capitalize mt-10 text-center">
                        Giảm giá đặc biệt
                    </p>
                    <p className="text-[20px] text-white text-center">
                        Số lượng có hạn!! - Đừng bỏ lỡ
                    </p>
                    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-2">
                        {copy__deals}
                    </div>
                    <ButtonActiveLink
                        content={"Xem tất cả"} link={"/Deals"}
                        classTail={"mt-10 capitalize text-mainCL font-semibold text-2xl rounded-xl px-3 py-1 border border-mainCL"}
                    />
                </div>
                <div className="flex flex-col items-center bg-white pt-5 pb-10 px-5">
                    <p className="text-black text-[40px] font-semibold capitalize mt-10 text-center">
                        Các bài viết mới nhất
                    </p>
                    <p className="text-[20px] text-gray-600 text-center">
                        Cập nhật tin tức và đánh giá công nghệ
                    </p>
                    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-7">
                        {copy__articles}
                    </div>
                    <ButtonActiveLink
                        content={"Xem tất cả"} link={"/Articles"}
                        classTail={"mt-10 capitalize text-mainCL font-semibold text-2xl rounded-xl px-3 py-1 border border-mainCL"}
                    />
                </div>
            </div>
        </>
    )
}

function Home_Banner({ services }) {
    const copy_services = services.map(s => {
        return <Service_Item service={s} key={s.id} />
    })
    return (
        <div className="flex flex-col lg:flex-row md:items-center">
            <div className="flex flex-col w-full lg:w-[60%]">
                <p className="text-black text-center text-4xl font-medium mb-1">
                    Khám phá điện thoại hoàn hảo của bạn
                </p>
                <p className="text-gray-600 text-center text-[16px] mb-10">
                    Sở hữu những chiếc điện thoại thông minh mới nhất với ưu đãi độc quyền và giao hàng nhanh chóng. Chất lượng cao cấp với mức giá cạnh tranh nhất.
                </p>
                <div className=" grid gap-5 mx-5 grid-cols-2 md:grid-cols-4">
                    {copy_services}
                </div>
            </div>
            <div className="w-full lg:w-[40%] rounded-2xl">
                <img src={banner_img} className="w-[80%] mx-auto mt-10 lg:mt-0 shadow-2xl rounded-2xl" loading="lazy" alt="BANNER" />
            </div>
        </div>
    )
}

function Service_Item({ service }) {
    return (
        <div className="flex flex-col bg-white items-center p-2 rounded-xl border border-gray-300 hover:shadow-mainCL hover:shadow-md hover:border-mainCL  hover:-translate-y-1 transition-all duration-300 ease-linear">
            <i className={`${service.cls_icon} text-2xl text-mainCL`}></i>
            <p className="text-base font-semibold text-center">{service.title}</p>
            <p className="text-gray-600 text-xs text-center">{service.desc}</p>
        </div>
    )
}
