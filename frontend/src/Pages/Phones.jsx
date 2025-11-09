import { useState, useEffect } from "react";
import { ProductCard } from "../Components/product_card"; // Giả sử đã import
import { scrollToTopSmooth } from "../utils/utils"; // Giả sử đã import
import { company, ram, rom, os, chip, support } from "./StaticData/Phones_data"; // Giả sử đã import
import { eg_phone } from "../Data_Test/Data_Home_Test"; // Giả sử đã import
import { Input } from "../Components/input"; // Giả sử đã import
// import { SearchBar } from "../Components/search"; // BỎ import, vì SearchBar ở ngay dưới
// Code do GEMINI PRO CODE TRÀNG NÀY DO CHƯA CÓ TG TÌM HIÊU KÝ HƠN 

// Giá trị khởi tạo cho form state
const initialFilterState = {
    company: [],
    ram: [],
    rom: [],
    os: [],
    chip: [],
    support: [],
    price: { min: "", max: "" }
};

// --- COMPONENT CHÍNH ---

export function Phones() {
    const [expand, setExpand] = useState(false);

    // --- State quản lý tập trung ---
    const [products, setProducts] = useState([]);
    const [filterState, setFilterState] = useState(initialFilterState);
    const [sortMode, setSortMode] = useState("default");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");

    const base_link = "https://res.cloudinary.com/df5mtvzkn/image/upload/q_auto,f_auto/WEB_SELL_PHONE__PROJECT/TEST/Test_IMG/"

    // --- HÀM GỌI API TRUNG TÂM ---
    const fetchProducts = (search, filters, sort, page) => {
        console.log("🚀 GỌI API VỚI CÁC THAM SỐ:", {
            search: search,
            filters: filters,
            sort: sort,
            page: page
        });

        // --- GIẢ LẬP GỌI API ---
        const arr = [];
        for (let i = 0; i < 15; i++) {
            arr.push({ ...eg_phone, variant_id: `page_${page}_search_${search}_filter_${i}` });
        }
        setProducts(arr);
        setTotalPages(5);
        // --- KẾT THÚC GIẢ LẬP ---
    };

    // --- EFFECT CHẠY LẦN ĐẦU ---
    useEffect(() => {
        fetchProducts("", initialFilterState, 'default', 1);
    }, []);

    // --- CÁC HÀM XỬ LÝ SỰ KIỆN ---

    function changeModeExpand() {
        scrollToTopSmooth();
        setTimeout(() => {
            setExpand((prev) => !prev);
        }, 300);
    }

    const handleFilterChange = (type, value) => {
        setFilterState(prev => {
            const currentValues = prev[type];
            const newValues = currentValues.includes(value)
                ? currentValues.filter(item => item !== value)
                : [...currentValues, value];
            return { ...prev, [type]: newValues };
        });
    };

    const handlePriceChange = (priceType, value) => {
        setFilterState(prev => ({
            ...prev,
            price: { ...prev.price, [priceType]: value }
        }));
    };

    // Hàm xử lý SUBMIT SEARCH (Hàm này đã đúng)
    const handleSearchSubmit = (submittedQuery) => {
        console.log("ĐÃ SUBMIT TÌM KIẾM:", submittedQuery);
        setSearchQuery(submittedQuery);
        setCurrentPage(1);
        fetchProducts(submittedQuery, filterState, sortMode, 1);
    };

    // Xử lý khi SUBMIT FORM FILTER (Hàm này đã đúng)
    const handleSubmitFilter = (e) => {
        e.preventDefault();
        console.log("ĐÃ SUBMIT BỘ LỌC:", filterState);
        setCurrentPage(1);
        fetchProducts(searchQuery, filterState, sortMode, 1);
        changeModeExpand();
    };

    // Xử lý khi THAY ĐỔI SẮP XẾP (Hàm này đã đúng)
    const handleSortChange = (newSortMode) => {
        setSortMode(newSortMode);
        setCurrentPage(1);
        fetchProducts(searchQuery, filterState, newSortMode, 1);
    };

    // Xử lý khi THAY ĐỔI TRANG (Hàm này đã đúng)
    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return;
        setCurrentPage(newPage);
        scrollToTopSmooth();
        fetchProducts(searchQuery, filterState, sortMode, newPage);
    };

    return (
        <>
            {scrollToTopSmooth()}
            <div className="py-5 flex flex-col relative animate__animated animate__fadeIn bg-gray-50">
                {/* ============================ PHẦN SEARCH BAR  */}
                <div className="flex flex-col gap-0 lg:flex-row lg:gap-5 justify-center w-full items-center mb-3 ">
                    <div className="w-[75%] md:w-[50%]">
                        {/* SỬA 1: Bỏ prop 'type' không cần thiết */}
                        <SearchBar
                            placeholder={"Search phone..."}
                            onSearchSubmit={handleSearchSubmit}
                        />
                    </div>
                    <ModeSortPrice
                        sortMode={sortMode}
                        onSortChange={handleSortChange}
                    />
                </div>

                {/* ============================ PHẦN LIST PHONES  */}
                <div className={`grid gap-4 px-5 grid-cols-1 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 z-0 sm:grid-cols-2 w-[95%] mx-auto`}>
                    <List_Phones base_link={base_link} products={products} />
                </div>
                {/* ============================ PHẦN MÀN ĐEN... */}
                <div className={`absolute bg-black w-full top-0 left-0 h-[100%]
                 ${!expand ? "opacity-0 pointer-events-none" : "opacity-40 pointer-events-auto "}`}>
                </div>
                { /*==============================Phần filter  */}
                <div className={`absolute w-auto mx-3
                 ${!expand ? "pointer-events-none" : "pointer-events-auto "}`}>
                    <Filter
                        expand={expand}
                        changeModeExpand={changeModeExpand}
                        filterState={filterState}
                        onFilterChange={handleFilterChange}
                        onPriceChange={handlePriceChange}
                        onSubmitFilter={handleSubmitFilter}
                    />
                </div>

                {/* ============================ PHẦN ICON BỘ LỌC  */}
                <div
                    className={`bg-mainCL text-white text-xl p-0 py-1 px-2 z-10 rounded-full fixed top-25 left-5 cursor-pointer scrollbar-hide
                         transition-all ease-in-out duration-500 ${expand ? " opacity-0 -translate-x-full " : "opacity-100 translate-x-0 "}`}>
                    <i className="bi bi-funnel-fill" onClick={changeModeExpand}>Filter</i>
                </div>
                {/* ============================ PHẦN PAGINATION  */}
                <div className="mt-10">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </>
    )
}

// --- CÁC COMPONENT CON ---

// ============================= SEARCH BAR (ĐÃ ĐƯỢC SỬA)
// SỬA 2: Thêm 'onSearchSubmit' vào props
export function SearchBar({ placeholder, onSearchSubmit }) {
    // SỬA 3: Thêm state để quản lý giá trị input
    const [query, setQuery] = useState("");

    // SỬA 4: Tạo hàm handleSubmit
    const handleSubmit = (e) => {
        e.preventDefault(); // Ngăn trang reload
        // Gọi hàm từ component cha (Phones) và truyền 'query'
        onSearchSubmit(query);
    };

    return (
        // SỬA 5: Thêm onSubmit vào form
        <form
            className="flex my-5 w-full border border-gray-300 rounded-lg"
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                className="w-full px-5 rounded-l-md py-2 outline-none"
                placeholder={placeholder}
                // SỬA 6: Kết nối input với state
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            {/* SỬA 7: Đặt type="submit" để form hoạt động */}
            <button type="submit">
                <i className="bi bi-search py-2 bg-mainCL text-white px-3 rounded-r-md"></i>
            </button>
        </form>
    )
}

// ============================= Phan Load DS
function List_Phones({ base_link, products }) {
    if (!products || products.length === 0) {
        return <div className="col-span-full text-center p-10">Đang tải sản phẩm hoặc không tìm thấy...</div>;
    }
    const arrPhone = products.map(product => {
        return (
            <ProductCard
                key={product.variant_id}
                baselink={base_link}
                product={product}
                hover_out={false}
                max_width={"200px"} fs_title={"base"} fs_text={"sm"} fs_desc={"xs"} />
        )
    });
    return arrPhone;
}

// ============================= PHẦN FILTER
//---------------------------- FILTER
function Filter({ expand, changeModeExpand, filterState, onFilterChange, onPriceChange, onSubmitFilter }) {
    return (
        <div className={`w-full transition-all ease-in-out duration-500 ${expand ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"}`}>
            <form onSubmit={onSubmitFilter}>
                <div className="flex justify-between bg-mainCL text-white w-full px-2 text-xl font-semibold items-center rounded-t-md">
                    <i className="bi bi-funnel"></i>
                    <span className="text-2xl font-semibold">Filter</span>
                    <div onClick={changeModeExpand} className={`transition-transform duration-300 ease-linear rotate-90`}>
                        <i className="bi bi-chevron-down"></i>
                    </div>
                </div>
                <div className={` flex flex-wrap justify-start gap-5 max-h-[600px] overflow-y-scroll  bg-white rounded-b-lg border-[1px] border-gray-300`}>
                    <div className="mt-5 px-2">
                        <FilterPart arr={company} title={"Brand"} type="company" cls_icon={"bi bi-buildings-fill"}
                            selectedValues={filterState.company}
                            onChange={onFilterChange}
                        />
                    </div>
                    <div className="mt-5 px-2">
                        <FilterPart arr={ram} title={"Ram"} type="ram" cls_icon={"bi bi-memory"}
                            selectedValues={filterState.ram}
                            onChange={onFilterChange}
                        />
                    </div>
                    <div className="mt-5 px-2">
                        <FilterPart arr={rom} title={"Rom"} type="rom" cls_icon={"bi bi-database-fill"}
                            selectedValues={filterState.rom}
                            onChange={onFilterChange}
                        />
                    </div>
                    <div className="mt-5 px-2">
                        <FilterPart arr={os} title={"Operating System"} type="os" cls_icon={"bi bi-android2"}
                            selectedValues={filterState.os}
                            onChange={onFilterChange}
                        />
                    </div>
                    <div className="mt-5 px-2">
                        <FilterPart arr={chip} title={"Chip"} type="chip" cls_icon={"bi bi-cpu-fill"}
                            selectedValues={filterState.chip}
                            onChange={onFilterChange}
                        />
                    </div>
                    <div className="mt-5 px-2">
                        <FilterPart arr={support} title={"Suport"} type="support" cls_icon={"bi bi-plus-circle-fill"}
                            selectedValues={filterState.support}
                            onChange={onFilterChange}
                        />
                    </div>
                    <div className="mt-5 px-4">
                        <FilterPartPrice title={"Price"} cls_icon={"bi bi-cash-coin"}
                            price={filterState.price}
                            onChange={onPriceChange}
                        />
                    </div>
                    <button type="submit" className="mt-5 mb-10 bg-mainCL text-white text-[20px] py-1 w-[90%] mx-auto rounded-md">
                        <span>Filter</span>
                    </button>
                </div>
            </form>
        </div>
    )
}

//---------------------------- CHECKBOX CỦA FILTER (Đã được kiểm soát)
function CheckBoxValueOfFilter({ id_input, content, type, checked, onChange }) {
    return (
        <div className="px-2">
            <input
                type="checkbox"
                name={id_input}
                id={id_input}
                className="hidden"
                checked={checked}
                onChange={() => onChange(type, id_input)}
            />
            <label htmlFor={id_input} className="cursor-pointer flex items-center">
                <i
                    className={`block text-green-600 text-[20px] transform bi 
                     ${checked ? "bi bi-bookmark-plus-fill" : "bi bi-bookmark-plus"}`}>
                </i>
                <span className="ms-1 flex gap-1">
                    {content}{typeof content === "number" ? " GB" : ""}
                </span>
            </label>
        </div>
    )
}

//---------------------------- PHẦN Nhóm các input cùng loại
function FilterPart({ title, arr, cls_icon, type, selectedValues, onChange }) {
    const copy_arr = arr.map(ip => {
        return <CheckBoxValueOfFilter
            id_input={ip.id}
            content={ip.content}
            key={ip.id}
            type={type}
            checked={selectedValues.includes(ip.id)}
            onChange={onChange}
        />
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
function FilterPartPrice({ title, cls_icon, price, onChange }) {
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
                    disable={false}
                    valueInput={price.min}
                    onChange={(e) => onChange('min', e.target.value)}
                />
                <Input
                    type={"number"} id_input={"ft_a7_ip2"} label={"Max Price"}
                    cls_icon="bi bi-coin" placeholder={"Input max price"}
                    disable={false}
                    valueInput={price.max}
                    onChange={(e) => onChange('max', e.target.value)}
                />
            </div>
        </>
    )
}

//============================== PHẦN SHOW PAGINATION (Đã được kiểm soát)
function Pagination({ currentPage, totalPages, onPageChange }) {

    const renderPageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <Cell
                    key={i}
                    index_page={i}
                    isActive={i === currentPage}
                    onClick={() => onPageChange(i)}
                />
            );
        }
        return pages;
    };

    return (
        <>
            <div className=" w-auto mx-auto flex justify-center gap-1 flex-wrap">
                <CellControl
                    control={"Prev"}
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                />

                {renderPageNumbers()}

                <CellControl
                    control={"Next"}
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                />
            </div>
        </>
    )
}

//============================== PHẦN CELL PAGINATION (Tương tác)
function Cell({ index_page, isActive, onClick }) {
    return (
        <div
            title={`Go to page ${index_page}`}
            onClick={onClick}
            className={`text-base px-3 py-2 cursor-pointer font-semibold border border-gray-300
                ${isActive
                    ? "bg-mainCL text-white"
                    : "bg-white text-mainCL hover:bg-gray-100"
                }`}
        >
            <span>{index_page}</span>
        </div>
    )
}

//============================== PHẦN CELL CONTROL PAGINATION (Tương tác)
function CellControl({ control, onClick, disabled }) {
    return (
        <div
            title={`Go to ${control} page`}
            onClick={!disabled ? onClick : null}
            className={`text-base bg-white px-3 py-2 font-semibold border border-gray-300
                ${disabled
                    ? "text-gray-400 cursor-not-allowed"
                    : "bg-white text-mainCL cursor-pointer hover:bg-gray-100"
                }`}
        >
            <span>{control}</span>
        </div>
    )
}

//============================== PHẦN SORT PRICE (Đã được kiểm soát)
function ModeSortPrice({ sortMode, onSortChange }) {
    const [openOption, setOpenOption] = useState(false);

    function toggleOpen() {
        setOpenOption((prev) => !prev);
    }

    function handleSelectMode(newMode) {
        onSortChange(newMode);
        setOpenOption(false);
    }

    return (
        <div>
            <div
                onClick={toggleOpen}
                className="text-mainCL flex bg-white border justify-between border-gray-300 px-3 py-2 cursor-pointer gap-20"
            >
                <span>{sortMode}</span>
                <i className={`bi bi-caret-down-fill transition-transform duration-500 ease-in-out ${openOption ? "rotate-180" : "rotate-0"}`} ></i>
            </div>

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