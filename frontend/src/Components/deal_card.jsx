import { priceFormatter } from "../utils/utils"
import { ButtonActiveLink } from "./Button"
export function DealCard({ p_sale, baselink, max_width = "325px", fs_title = "lg", fs_text = "base", fs_desc = "sm", hover_out = true }) {
    return (
        <div
            className={`w-full max-w-[${max_width}] border bg-white border-gray-300 rounded-xl mx-auto overflow-hidden pb-5 shadow-sm relative 
            group ${hover_out ? 'hover:-translate-y-2 hover:shadow-white hover:shadow-2xl' : ''} transition-all duration-300 ease-linear`}
        >
            <div className="m-3 overflow-hidden rounded-xl group">
                <img src={`${baselink}${p_sale.variant_img}`}
                    className="w-full group-hover:scale-110 transition-transform duration-300 ease-linear" loading="lazy" alt={p_sale.name}
                />
            </div>
            <div className="flex flex-col px-3">
                <span className={`text-black font-semibold text-${fs_title} mb-2`}>{p_sale.phone_name}</span>
                <div className={`flex justify-between px-3 text-gray-500 mb-1 text-${fs_text}`}>
                    <span className="capitalize">Original price: </span>
                    <span className={`line-through text-${fs_desc}`}>
                        {priceFormatter(p_sale.variant_ph_org_price)} ₫
                    </span>
                </div>
                <div className={`flex justify-between px-3 text-slate-800 text-${fs_text}`}>
                    <span className="capitalize">Store price:</span>
                    <span className={`line-through text-${fs_desc}`}>
                        {priceFormatter(p_sale.variant_ph_new_price)} ₫
                    </span>
                </div>
                <hr className=" border-[1px] mt-3 mb-1" />
                <div className={`bg-orange-100 text-mainCL flex flex-col rounded-xl py-3 mt-2 border-mainCL border text-${fs_text}`}>
                    <div className={`flex justify-between px-3 items-center text-${fs_text}`}>
                        <span className="font-semibold capitalize">Sale price:</span>
                        <span className={`text-${fs_title} font-semibold`}>
                            {priceFormatter(p_sale.variant_ph_final_price)}
                            ₫</span>
                    </div>
                    <span className={`mx-auto mt-2 text-${fs_desc}`}>
                        Save {p_sale.variant_ph_org_price - p_sale.variant_ph_final_price} ₫
                        ({Math.round(100 - (p_sale.variant_ph_final_price / p_sale.variant_ph_org_price) * 100)}% off)</span>
                </div>
                <ButtonActiveLink
                    link={"/product-details"}
                    content={"View Detail"}
                    classTail={`bg-mainCL mt-5 text-white text-center py-2 rounded-xl text-${fs_title} font-medium`}
                />
            </div>
            <div className={`absolute bg-[#ff0000] text-white capitalize top-3 right-3 px-3 py-[0.5] rounded-full text-${fs_text}`}>
                <i className="bi bi-tag"></i>
                <span className="ms-1">Sale</span>
            </div>
        </div>
    )
}