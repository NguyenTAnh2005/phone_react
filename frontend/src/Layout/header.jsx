import { Link, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { scrollToTopSmooth } from "../utils/utils"
import { list_nav } from "./StaticData/header_data";


export function Header() {
    const [expand, setExpand] = useState(false);
    const [isLogIn, setIsLogIn] = useState(true);
    function changeMode() {
        setExpand(!expand);
    }
    useEffect(() => {
        setExpand(false);
    }, [location.pathname]);
    return (
        <>
            {/* ================== MAIN HEADER ---------LG ========================*/}
            <div className="flex flex-row justify-between items-center w-full bg-white px-2 sticky top-0 shadow-sm z-50">
                <NavBrand />
                <NavLink navLinks={list_nav} cls_name="hidden lg:flex lg:gap-7" />
                <NavActions cls_name="hidden lg:flex lg:gap-5 w-[20%]" />
                <ToggleNav changeMode={changeMode} />
                <NavAccount isLogIn={isLogIn} cls_name="hidden lg:flex" />
            </div>
            {/*===================MOBILE ====================================== */}
            <div className={`lg:hidden flex flex-col gap-5 bg-white transition-all duration-500 ease-linear
                overflow-hidden shadow-md w-full lg:w-1/2 pl-5 ml-auto ${expand ? "max-h-[900px] z-99" : "max-h-0"}`}>
                <NavLink navLinks={list_nav} cls_name="lg:hidden flex flex-col gap-3 mt-5" />
                <NavActions cls_name="lg:hidden flex flex gap-5 mx-auto" />
                <div className="flex justify-center mb-5">
                    <NavAccount isLogIn={isLogIn} cls_name="lg:hidden flex" />
                </div>
            </div>

        </>
    )
}
function NavBrand() {
    return (
        <a className="flex items-center text-mainCL text-xl md:text-[28px] lg:text-[30px] py-4" href="/Home">
            <i className="bi bi-phone me-1"></i>
            <span className="me-2 font-bold"> Phone </span>
            <span className="font-thin"> React</span>
        </a>
    )
}
function NavLink({ navLinks, cls_name = "" }) {
    const location = useLocation();
    const nav_links = navLinks.map(ni => (<NavItem nav_item={ni} key={ni.id} location={location} />))
    return (
        <ul className={cls_name + " list-none"} >
            {nav_links}
        </ul>
    )
}
function NavItem({ nav_item, location }) {
    return (
        <li onClick={scrollToTopSmooth} className={`text-base text-gray-400 font-medium relative group hover:text-mainCL transition-colors duration-300 ease-linear ${location.pathname === `/${nav_item.content}` && "text-mainCL"}`}>
            <Link to={"/" + nav_item.content}>
                {nav_item.content}
            </Link >
            <span className=" hidden lg:block absolute  h-0.5 bg-mainCL translate-y-3 w-0 group-hover:w-full group-hover:-translate-x-[0%] z-10 bottom-0 left-0 translate-x-[50%] transition-all ease-linear duration-400">
            </span>
        </li >
    )
}
function NavActions({ cls_name = "" }) {
    return (
        <div className={cls_name}>
            <Link to={"/Phones"}>
                <Action id="act_search" content="Search" clsicon="bi bi-search" />
            </Link>
            <Link>
                <Action id="act_cart" content="Cart" clsicon="bi bi-cart-check" />
            </Link>
        </div>
    )
}
function Action({ id, content, clsicon }) {
    return (
        <button id={id} className="flex flex-col xl:flex-row justify-center xl:gap-2 gap-0 items-center text-mainCL group text-[16px]
        hover:text-white rounded-lg hover:pr-6 hover:bg-mainCL hover:shadow-lg hover:shadow-mainCL transition-all duration-400 ease-linear px-2 py-1">
            <i className={clsicon + "  align-middle"}></i>
            <span className="hidden text-xl group-hover:block transition-all duration-400 ease-linear">{content}</span>
        </button>
    )
}
function ToggleNav({ changeMode }) {
    return (
        <i className="bi bi-list text-4xl bg-white p-2 rounded-lg block lg:hidden" onClick={changeMode}></i>
    )

}
function NavAccount({ isLogIn, cls_name = "" }) {
    return (
        <Link to={isLogIn ? "/Account" : "/log-in"} className={`flex flex-col xl:flex-row xl:justify-center items-center text-mainCL group lg:w-[10%]
        hover:text-white rounded-lg hover:pr-7 hover:bg-mainCL hover:shadow-lg hover:shadow-mainCL transition-all duration-400 ease-linear px-2 py-1 ${cls_name}`}>
            <i className="bi bi-person-vcard text-xl group-hover:me-1 align-middle"></i>
            <span className="hidden text-base group-hover:block transition-all duration-400 ease-linear">
                {`${isLogIn ? "Tuan Anh" : "Log In"}`}
            </span>
        </Link>
    )
}