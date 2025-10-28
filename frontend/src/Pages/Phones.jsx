import { useState } from "react";
import { ProductCard } from "../Components/product_card";
import { scrollToTopSmooth } from "../utils/utils";
import { company, ram, rom, os, chip, support } from "./StaticData/Phones_data";
import { eg_phone } from "../Data_Test/Data_Home_Test";
import { Input } from "../Components/input";
import { SearchBar } from "../Components/search";

export function Phones() {
    const [expand, setExpand] = useState(false);
    const [sortMode, setSortMode] = useState("default");
    const base_link = "https://res.cloudinary.com/df5mtvzkn/image/upload/q_auto,f_auto/WEB_SELL_PHONE__PROJECT/TEST/Test_IMG/"

    function changeModeExpand() {
        scrollToTopSmooth();
        setTimeout(() => {
            setExpand((prev) => !prev);
        }, 300);

    }
    return (
        <>
            {scrollToTopSmooth()}
            <div className="py-5 flex flex-col relative animate__animated animate__fadeIn bg-gray-50">
                {/* ============================ PHẦN SEARCH BAR  */}
                <div className="flex flex-col gap-0 lg:flex-row lg:gap-5 justify-center w-full items-center mb-3 ">
                    <div className="w-[75%] md:w-[50%]">
                        <SearchBar placeholder={"Search phone..."} type={"button"} />
                    </div>
                    <ModeSortPrice sortMode={sortMode} setSortMode={setSortMode} />
                </div>

                {/* ============================ PHẦN LIST PHONES  */}
                <div className={`grid gap-4 px-5 grid-cols-1 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 z-0 sm:grid-cols-2 w-[95%] mx-auto`}>
                    <List_Phones base_link={base_link} />
                </div>
                {/* ============================ PHẦN MÀN ĐEN CHE NỘI DUNG KHI MỞ FILTER VÀ NGĂN KO CHO CLICK BÊN NGOÀI FILTER */}
                <div className={`absolute bg-black w-full top-0 left-0 h-[100%]
                 ${!expand ? "opacity-0 pointer-events-none" : "opacity-40 pointer-events-auto "}`}>
                </div>
                { /*==============================Phần filter  */}
                <div className={`absolute w-auto ml-3
                ${!expand ? "pointer-events-none" : "pointer-events-auto "}`}>
                    <Filter expand={expand} changeModeExpand={changeModeExpand} />
                </div>

                {/* ============================ PHẦN ICON BỘ LỌC  */}
                <div className={`bg-mainCL text-white text-xl p-0 py-1 px-2 z-10 rounded-full fixed top-25 left-5 cursor-pointer
                transition-all ease-in-out duration-500 ${expand ? " opacity-0 -translate-x-full " : "opacity-100 translate-x-0 "}`}>
                    <i className="bi bi-funnel-fill" onClick={changeModeExpand}>Filter</i>
                </div>
                {/* ============================ PHẦN PAGINATION  */}
                <div className="mt-10">
                    {/* Sử dụng maxPage đã được cập nhật từ Backend */}
                    <Pagination />
                </div>
            </div>
        </>


    )
}
// ============================= Phan Load DS
function List_Phones({ base_link }) {
    const arrPhone = [];
    for (let i = 0; i < 15; i++) {
        arrPhone.push(
            <ProductCard key={"ph" + i} baselink={base_link} product={eg_phone[0]} hover_out={false}
                max_width={"200px"} fs_title={"base"} fs_text={"sm"} fs_desc={"xs"} />
        )
    }
    return arrPhone;
}
// ============================= PHẦN FILTER
//---------------------------- FILTER
function Filter({ expand, changeModeExpand }) {

    return (
        <>
            <div className={`w-full transition-all ease-in-out duration-500 ${expand ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"}`}>
                <div className="flex justify-between bg-mainCL text-white w-full px-2 text-[20px] font-semibold items-center rounded-t-md">
                    <i className="bi bi-funnel"></i>
                    <span className="text-[24px] font-semibold">Filter</span>
                    <div onClick={changeModeExpand} className={`transition-transform duration-300 ease-linear rotate-90`}>
                        <i className="bi bi-chevron-down"></i>
                    </div>
                </div>
                <div className={` flex flex-col max-h-[600px] overflow-y-scroll  bg-white rounded-b-lg border-[1px] border-gray-300`}>
                    <div className="mt-5 px-2">
                        <FilterPart arr={company} title={"Brand"} type="company" cls_icon={"bi bi-buildings-fill"} />
                    </div>
                    <div className="mt-5 px-2">
                        <FilterPart arr={ram} title={"Ram"} type="ram" cls_icon={"bi bi-memory"} />
                    </div>
                    <div className="mt-5 px-2">
                        <FilterPart arr={rom} title={"Rom"} type="rom" cls_icon={"bi bi-database-fill"} />
                    </div>
                    <div className="mt-5 px-2">
                        <FilterPart arr={os} title={"Operating System"} type="os" cls_icon={"bi bi-android2"} />
                    </div>
                    <div className="mt-5 px-2">
                        <FilterPart arr={chip} title={"Chip"} type="chip" cls_icon={"bi bi-cpu-fill"} />
                    </div>
                    <div className="mt-5 px-2">
                        <FilterPart arr={support} title={"Suport"} type="support" cls_icon={"bi bi-plus-circle-fill"} />
                    </div>
                    <div className="mt-5 px-2">
                        <FilterPartPrice title={"Price"} cls_icon={"bi bi-cash-coin"} />
                    </div>
                    <button type="button" className="mt-5 mb-10 bg-mainCL text-white text-[20px] py-1 w-[90%] mx-auto rounded-md">
                        <span>Filter</span>
                    </button>

                </div>
            </div>
        </>
    )
}
//---------------------------- CHECKBOX CỦA FILTER
function CheckBoxValueOfFilter({ id_input, content, type }) {
    const [clicked, setClicked] = useState(false);
    function changeModeInput() {
        setClicked((prev) => !prev);
    }
    return (
        <div className="px-2">
            <input type="checkbox" name={id_input} id={id_input} className="hidden" checked={clicked} onChange={changeModeInput} />
            <label htmlFor={id_input} className="cursor-pointer flex items-center">
                <i
                    className={`block text-green-600 text-[20px] transform bi 
                        ${clicked ? "bi bi-bookmark-plus-fill" : "bi bi-bookmark-plus"}`}>
                </i>
                <span className="ms-1 flex gap-1">
                    {content}{typeof content === "number" ? " GB" : ""}
                </span>
            </label>
        </div>
    )
}
//---------------------------- PHẦN Nhóm các input cùng loại
function FilterPart({ title, arr, cls_icon, type }) {
    const copy_arr = arr.map(ip => {
        return <CheckBoxValueOfFilter id_input={ip.id} content={ip.content} key={ip.id} type={type} />
    });
    return (
        <>
            <span className="text-xl ml-2 font-semibold flex items-center gap-2 text-mainCL">
                <i className={cls_icon + " text-lg"}></i>
                {title}
            </span>
            <div className="grid lg:grid-cols-3">
                {copy_arr}
            </div>
        </>
    )
}
//---------------------------- PHẦN Nhóm các input cùng loại PRICE
function FilterPartPrice({ title, cls_icon }) {
    return (
        <>
            <span className="text-xl font-semibold flex gap-2 text-mainCL items-center">
                <i className={cls_icon}></i>
                {title}
            </span>
            <div className="flex flex-col px-3">
                <Input
                    type={"number"} id_input={"ft_a7_ip1"} label={"Min Price"}
                    cls_icon="bi bi-coin" placeholder={"Input min price"}
                    disable={true} valueInput=""
                />
                <Input
                    type={"number"} id_input={"ft_a7_ip2"} label={"Max Price"}
                    cls_icon="bi bi-coin" placeholder={"Input max price"}
                    disable={true} valueInput=""
                />
            </div>
        </>
    )
}

//============================== PHẦN SHOW PAGINATION
function Pagination() {
    return (
        <>
            <div className=" w-[55%] lg:w-[30%] mx-auto flex justify-center gap-1">
                <CellControl control={"Prev"} />
                <Cell index_page={"Page 1"} />
                <CellControl control={"Next"} />
            </div>
            <div className="mx-auto flex justify-center mt-3 items-center">
                <span className="me-5">Go to page:</span>
                <input type="number" className="outline-none indent-4 w-20 py-1 rounded-l-md border border-gray-400" />
                <button className="bg-mainCL text-white text-base px-2 py-1 rounded-r-md border border-mainCL" >OK</button>
            </div>
        </>
    )
}
//============================== PHẦN CELL PAGINATION
function Cell({ index_page }) {
    return (
        <div
            title={`Go to page ${index_page}`}
            className="text-mainCL text-base bg-white px-2 py-2 cursor-pointer font-semibold border border-gray-300">
            <span>{index_page}</span>
        </div>
    )
}
//============================== PHẦN CELL CONTROL PAGINATION
function CellControl({ control }) {
    return (
        <div
            title={`Go to ${control} page`}
            className="text-mainCL text-base bg-white px-2 py-2 cursor-pointer font-semibold border border-gray-300">
            <span>{control}</span>
        </div>
    )
}
//============================== PHẦN SORT PRICE
function ModeSortPrice({ sortMode, setSortMode }) {
    const [openOption, setOpenOption] = useState(false);

    function toggleOpen() {
        setOpenOption((prev) => !prev);
    }

    function handleSelectMode(newMode) {
        setSortMode(newMode);
        setOpenOption(false);
    }

    return (
        <div>
            {/* Thanh chọn hiện tại */}
            <div
                onClick={toggleOpen}
                className="text-mainCL flex bg-white border justify-between border-gray-300 px-3 py-2 cursor-pointer gap-20"
            >
                <span>{sortMode}</span>
                <i className={`bi bi-caret-down-fill transition-transform duration-500 ease-in-out ${openOption ? "rotate-180" : "rotate-0"}`} ></i>
            </div>

            {/* Danh sách các lựa chọn */}
            {openOption && (
                <div className="w-auto relative">
                    <div className="absolute mt-1 z-10 w-full">
                        <ModeOption content="default" onSelect={handleSelectMode} />
                        <ModeOption content="Asc" onSelect={handleSelectMode} />
                        <ModeOption content="Desc" onSelect={handleSelectMode} />
                    </div>
                </div>
            )}
        </div>
    );
}

// Component option riêng
function ModeOption({ content, onSelect }) {
    return (
        <div
            onClick={() => onSelect(content)}
            className="text-mainCL bg-white border border-gray-300 px-2 py-1 cursor-pointer hover:bg-gray-200"
        >
            <span>{content}</span>
        </div>
    );
}