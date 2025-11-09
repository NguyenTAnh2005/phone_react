import { ArticleCard } from "../Components/article_card";
import { eg_article } from "../Data_Test/ARTICLES";
import { scrollToTopSmooth } from "../utils/utils";
import { useEffect, useState } from "react";

export function Articles() {

    const articles_per_page = 8;

    const [arrArticles, setArrArticles] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [inputGoTo, setInputGoTo] = useState("");

    const fetchData = (searchQuery, currentPage) => {
        scrollToTopSmooth();
        // Hiện ra các tiêu chí lọc API
        console.log("Cac tieu chi loc du lieu: ", {
            "searchQuery": searchQuery,
            "currentPage": currentPage
        });

        // Giả lập dữ liệu trả về từ API
        const articlesList = [];
        for (let i = 0; i < 8; i++) {
            articlesList.push(
                <ArticleCard key={"article" + i} baselink={base_link} article={eg_article}
                    fs_title={"base"} fs_text={"sm"} fs_desc={"xs"} />
            );
        }
        setArrArticles(articlesList);

        // Giả lập tổng số trang từ API (leng data/ item per page )
        setTotalPages(5); // Giả sử có 5 trang
    }
    const articlesList = arrArticles;

    useEffect(() => {
        fetchData(searchQuery, currentPage);
    }, []);

    // Lay gia tri cua input 
    const handleChangeSearchQuery = (e) => {
        setSearchQuery(e.target.value);
    }
    // XU ly khi bam search button
    const handleSearch = () => {
        setCurrentPage(1);
        fetchData(searchQuery, 1);
    }

    // Xu ly khi nhan next va prev page
    const handlePrevPage = () => {
        if (currentPage > 1) {
            const newPage = currentPage - 1;
            setCurrentPage(newPage);
            fetchData(searchQuery, newPage);
        }
        else {
            alert("This is the first page!");
        }
    }
    const handleNextPage = () => {
        console.log("Total pages:", totalPages);
        if (currentPage < totalPages) {
            const newPage = currentPage + 1;
            setCurrentPage(newPage);
            fetchData(searchQuery, newPage);
        }
        else {
            alert("This is the last page!");
        }
    }

    const handleChangeInputGoTo = (e) => {
        setInputGoTo(Number(e.target.value));
    }

    const handleChoosePageIndex = () => {
        if (inputGoTo < 1 || inputGoTo > totalPages) {
            alert("Invalid page number!");
            return;
        }
        setCurrentPage(inputGoTo);
        fetchData(searchQuery, inputGoTo);
    }

    const base_link = "https://res.cloudinary.com/df5mtvzkn/image/upload/q_auto,f_auto/WEB_SELL_PHONE__PROJECT/TEST/Test_IMG/";

    return (
        <div className="bg-gray-50">
            {/* {scrollToTopSmooth()} */}
            <div className="flex justify-center">
                <div className="w-[75%] md:w-[50%]">
                    <SearchBar
                        placeholder="Seach article....."
                        type="button"
                        onHandleSearch={handleSearch}
                        onHandleChange={handleChangeSearchQuery}
                        value={searchQuery}
                    />
                </div>
            </div>
            <div className="py-5 flex flex-col relative animate__animated animate__fadeIn">
                <div className="text-center mb-5">
                    <p className="text-[50px] font-semibold text-mainCL">
                        Articles Page
                    </p>
                    <p className="text-[20px] text-gray-600"
                    >Latest news and insights about phones.
                    </p>
                </div>
                <div
                    className={`grid gap-4 px-5 grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 w-[90%] mx-auto`}
                >
                    {articlesList}
                </div>
            </div>
            <div className="pb-10">
                <Pagination
                    onNext={handleNextPage}
                    onPrev={handlePrevPage}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onChange={handleChangeInputGoTo}
                    value={inputGoTo}
                    onChoosePage={handleChoosePageIndex}
                />
            </div>
        </div>
    );
}
function Pagination({ onNext, onPrev, currentPage, totalPages, onChange, value, onChoosePage }) {
    return (
        <>
            <div className=" w-[55%] lg:w-[30%] mx-auto flex justify-center gap-1">
                <CellControl
                    control={"< Trước"}
                    onClick={onPrev}
                />

                <Cell index_page={`Trang ${currentPage}`} />

                <CellControl
                    control={"Sau >"}
                    onClick={onNext}
                />
            </div>
            <div className="mx-auto flex justify-center mt-3 items-center">
                <span className="me-5">Go to page: </span>
                <input
                    onChange={onChange}
                    value={value}
                    type="number"
                    className="outline-none indent-4 w-20 py-1 rounded-l-md border border-gray-400 pl-2"
                />
                <button
                    onClick={onChoosePage}
                    className="bg-mainCL text-white text-base px-2 py-1 rounded-r-md border border-mainCL" >OK</button>
            </div>
            <div className="text-center text-gray-600 mt-2">
                Total Pages: {totalPages}
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
function CellControl({ control, onClick }) {
    return (
        <div
            onClick={onClick}
            title={`Go to ${control} page`}
            className="text-mainCL text-base bg-white px-2 py-2 cursor-pointer font-semibold border border-gray-300">
            <span>{control}</span>
        </div>
    )
}

export function SearchBar({ placeholder, type, onHandleSearch, value, onHandleChange }) {
    return (
        <form className="flex my-5 w-full border border-gray-300 rounded-lg">
            <input
                value={value}
                onChange={onHandleChange}
                type="text" className="w-full px-5 rounded-l-md py-2 outline-none" placeholder={placeholder} />
            <button
                onClick={onHandleSearch}
                type={type}
            >
                <i className="bi bi-search py-2 bg-mainCL text-white px-3 rounded-r-md"></i>
            </button>
        </form>
    )
}