import { DealCard } from "../Components/deal_card"
import { scrollToTopSmooth } from "../utils/utils"

// DL GIA LAP CHO 1 cai 
import { deal_eg } from "../Data_Test/DEALS";

export function Deals() {
    const base_link = "https://res.cloudinary.com/df5mtvzkn/image/upload/q_auto,f_auto/WEB_SELL_PHONE__PROJECT/TEST/Test_IMG/";

    const handleSeeInfoProduct = (id) => {
        alert("Ban muon xem thong tin san pham co id la: " + id);
    }

    const dealsList = [];
    for (let i = 0; i < 10; i++) {
        dealsList.push(
            <DealCard key={"deal" + i} baselink={base_link} p_sale={deal_eg} onHandleViewInfoDeal={handleSeeInfoProduct}
                max_width="200px" fs_title={"base"} fs_text={"sm"} fs_desc={"xs"} hover_out={false} />
        );
    }
    const dealsListWeek = [];
    for (let i = 0; i < 5; i++) {
        dealsListWeek.push(
            <DealCard key={"deal" + i} baselink={base_link} p_sale={deal_eg} onHandleViewInfoDeal={handleSeeInfoProduct}
                max_width="200px" fs_title={"base"} fs_text={"sm"} fs_desc={"xs"} hover_out={false} />
        );
    }

    return (
        <>
            {scrollToTopSmooth()}
            <div className="flex flex-col relative animate__animated animate__fadeIn bg-gray-50 min-h-screen">
                {/* =================== TIÊU ĐỀ CHUNG =================== */}
                <div className="ml-3 text-mainCL py-8 px-4 md:px-8 lg:px-12">
                    <div className="flex items-center gap-4 mb-4">
                        <i className="bi bi-cart4 text-6xl md:text-7xl"></i>
                        <span className="text-3xl md:text-4xl lg:text-5xl font-bold capitalize">
                            Các ưu đãi hấp dẫn
                        </span>
                    </div>
                    <p className="text-base md:text-lg mt-3 font-medium text-gray-700">
                        Đừng bỏ lỡ: Tổng hợp các chương trình giảm giá và khuyến mãi đặc biệt từ các thương hiệu hàng đầu.
                    </p>
                </div>

                {/* =================== OCTOBER SALE =================== */}
                <div className="flex flex-col justify-center items-center gap-6 text-mainCL py-12 px-4 md:px-8 lg:px-12 bg-gradient-to-r from-orange-50 to-red-50">
                    <div className="text-center">
                        <span className="flex items-center justify-center gap-3 mb-4">
                            <span className="text-4xl md:text-5xl lg:text-6xl font-bold">October's Sale</span>
                        </span>
                        <div className="flex justify-center gap-4 text-base md:text-lg font-semibold mb-8 items-center text-gray-800">
                            <Date dd={2} dd_top={"nd"} mm={"Oct"} yy={2025} />
                            <i className="bi bi-arrow-right text-2xl text-mainCL"></i>
                            <Date dd={29} dd_top={"nd"} mm={"Oct"} yy={2025} />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full max-w-7xl mx-auto">
                        {dealsList}
                    </div>
                </div>

                {/* =================== BLACK WEEK =================== */}
                <div className="bg-black text-white py-16 mt-0">
                    <div className="text-center font-semibold px-4 md:px-8 lg:px-12">
                        <p className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase mb-6">Black Week</p>
                        <div className="flex gap-4 justify-center mt-5 mb-10 items-center">
                            <Date dd={25} dd_top={"th"} mm={"Oct"} yy={2025} />
                            <i className="bi bi-arrow-right text-2xl text-mainCL"></i>
                            <Date dd={31} dd_top={"th"} mm={"Oct"} yy={2025} />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4 md:px-8 lg:px-12 w-full max-w-7xl mx-auto">
                        {dealsListWeek}
                    </div>
                </div>
            </div>
        </>
    );
}

function Date({ dd, dd_top, mm, yy }) {
    return (
        <span className="bg-white text-mainCL px-3 py-2 rounded-lg font-bold text-lg shadow-md">
            {mm}, {dd}<sup className="text-sm">{dd_top}</sup>, {yy}
        </span>
    )
}