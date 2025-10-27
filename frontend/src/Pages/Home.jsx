import { useState } from "react";
import { ProductCard } from "../Components/product_card"
import { DealCard } from "../Components/deal_card";
import { ArticleCard } from "../Components/article_card"
import banner_img from "../assets/chess.png"
import { Link } from "react-router-dom"
import { scrollToTopSmooth } from "../utils/utils";
import { eg_phone, eg_deal, eg_article } from "../Data_Test/Data_Home_Test"
import { ButtonActiveLink } from "../Components/Button";

export function Home() {
    //Data co dinh 
    const data_service = [
        { id: "ser_1", cls_icon: "bi bi-patch-check", title: "Honest Service", desc: "We value transparency and trust" },
        { id: "ser_2", cls_icon: "bi bi-truck", title: "Free Delivery", desc: "On orders over 5.000.000 đ" },
        { id: "ser_3", cls_icon: "bi bi-shield-check", title: "Security Payment", desc: "100% secure transaction" },
        { id: "ser_4", cls_icon: "bi bi-headset", title: "24/7 Support", desc: "Dedicated support team" },
    ]
    const base_link = "https://res.cloudinary.com/df5mtvzkn/image/upload/q_auto,f_auto/WEB_SELL_PHONE__PROJECT/TEST/Test_IMG/"
    const copy__products = [];
    const copy__deals = [];
    const copy__articles = [];
    // populate sample product cards
    for (let i = 0; i < 6; i++) {
        copy__products.push(<ProductCard key={"p" + i} product={eg_phone[0]} baselink={base_link} />)
        copy__deals.push(<DealCard baselink={base_link} key={"d" + i} p_sale={eg_deal[0]} />)
        copy__articles.push(<ArticleCard article={eg_article[0]} key={"a" + i} baselink={base_link} />)
    }
    //

    return (
        <div className="animate__animated animate__fadeIn">
            <div className="p-5 md:p-10  bg-slate-100">
                <Home_Banner services={data_service} />
            </div>
            <div className="flex flex-col items-center bg-white p-5 md:p-10 xl:p-20">
                <p className="text-black text-[40px] font-semibold capitalize text-center">
                    Popular Phones
                </p>
                <p className="text-[20px] text-gray-600 text-center">
                    Discover our best-selling phones
                </p>
                <div className="mt-10 px-5 grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-x-4 gap-y-4">
                    {copy__products}
                </div>
                <ButtonActiveLink
                    content={"View All Phones"} link={"/Phones"}
                    classTail={"mt-10 capitalize text-mainCL font-semibold text-2xl rounded-xl px-3 py-1 border border-mainCL"}
                />
            </div>
            <div className="flex flex-col items-center bg-black pt-5 pb-10 px-5">
                <p className="text-white text-[40px] font-semibold capitalize mt-10 text-center">
                    Special Deals
                </p>
                <p className="text-[20px] text-white text-center">
                    Limited time offers - Don't miss out!
                </p>
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-20">
                    {copy__deals}
                </div>
                <ButtonActiveLink
                    content={"View All Deals"} link={"/Deals"}
                    classTail={"mt-10 capitalize text-mainCL font-semibold text-2xl rounded-xl px-3 py-1 border border-mainCL"}
                />
            </div>
            <div className="flex flex-col items-center bg-white pt-5 pb-10 px-5">
                <p className="text-black text-[40px] font-semibold capitalize mt-10 text-center">
                    Latest Technology Article
                </p>
                <p className="text-[20px] text-gray-600 text-center">
                    Stay updated with tech news and reviews
                </p>
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-7">
                    {copy__articles}
                </div>
                <ButtonActiveLink
                    content={"View All Articles"} link={"/Articles"}
                    classTail={"mt-10 capitalize text-mainCL font-semibold text-2xl rounded-xl px-3 py-1 border border-mainCL"}
                />
            </div>
        </div>
    )
}

function Home_Banner({ services }) {
    const copy_services = services.map(s => {
        return <Service_Item service={s} key={s.id} />
    })
    return (
        <div className="flex flex-col lg:flex-row md:items-center">
            <div className="flex flex-col w-full lg:w-[60%]">
                <p className="text-black text-center text-[45px] font-medium mb-1">
                    Discover Your Perfect Phone
                </p>
                <p className="text-gray-600 text-center text-[16px] mb-10">
                    Get the latest smartphones with exclusive deals and fast delivery. Premium quality at unbeatable prices.
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
        <div className="flex flex-col bg-white items-center p-1 rounded-xl border border-gray-300 hover:shadow-mainCL hover:shadow-md hover:border-mainCL  hover:-translate-y-1 transition-all duration-300 ease-linear">
            <i className={`${service.cls_icon} text-[25px] text-mainCL`}></i>
            <p className="text-[18px] font-semibold text-center">{service.title}</p>
            <p className="text-gray-600 text-[12px] text-center">{service.desc}</p>
        </div>
    )
}
