import { useState } from "react"
import { Link } from "react-router-dom";
import { getNumScreenSize, priceFormatter } from "../utils/utils";

export function ProductCard({ product, baselink, max_width = "350px", fs_title = "xl", fs_text = "base", fs_desc = "xs", hover_out = true }) {
    const handleAddToCartlist = () => {
        console.log("Sản phẩm được thêm vào giỏ hàng:", product);

        alert(`✅ Đã thêm " ${product.phone_name} - ${product.variant_ph_ram}GB/${product.variant_ph_rom}GB" vào giỏ hàng!`);
    };
    return (
        <div
            className={`flex flex-col w-full max-w-[${max_width} ] border rounded-2xl
                 border-gray-200 p-2 group mx-auto overflow-hidden cursor-pointer
                ${hover_out && "hover:shadow-lg hover:shadow-mainCL hover:border-mainCL hover:-translate-y-1 "}
                transition-all duration-300 ease-linear bg-white relative text-${fs_text}`}>
            <Link to={"/ProductDetails"} className="flex flex-col">
                <div className="rounded-lg overflow-hidden">
                    <img src={`${baselink}${product.variant_img}`} alt={product.phone_name}
                        className="w-full rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-110 aspect-square object-cover" loading="lazy" />
                </div>
                <span title={product.phone_name} className={`mt-2 text-${fs_title} font-semibold font-sans text-mainCL h-16`}>
                    {product.phone_name} - {product.variant_ph_ram}GB/{product.variant_ph_rom}GB
                </span>
                <span className={`text-${fs_desc} h-6 text-gray-600`}>
                    {getNumScreenSize(product.phone_screen_size)} inch | {product.phone_chip} | {product.variant_ph_color}
                </span>
                <div className="flex justify-between items-center my-2">
                    <span className="capitalize text-gray-500">Original Price</span>
                    <span title="Original Price" className={`line-through text-${fs_text} font-thin text-gray-500`}>
                        {priceFormatter(product.variant_ph_org_price)} đ
                    </span>
                </div>
                <div className="flex justify-between mb-3">
                    <span className="capitalize font-semibold">New Price</span>
                    <span title="New Price" className={`text-mainCL align-text-bottom font-sans font-bold text-${fs_title}`}>
                        {priceFormatter(product.variant_ph_final_price)}đ
                    </span>
                </div>
            </Link>
            <hr className="h-[1px] border-gray-200" />
            <div className="mt-2 flex justify-center items-center">
                <div
                    title="Add Product to Cart!"
                    onClick={handleAddToCartlist}
                    className={`min-w-fit px-3 py-1  
                  text-mainCL transition-all duration-300 ease-linear`}>
                    <i className={`bi bi-cart-plus px-2 py-1 rounded-full text-${fs_title} hover:bg-mainCL hover:text-white transition-colors duration-300 ease-in-out`}></i>
                </div>
            </div>
            <div className={`flex bg-mainCL absolute top-2 px-2 left-2 rounded-lg text-white font-semibold text-${fs_text} 
            -translate-y-9 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-linear`}>
                <i className="bi bi-arrow-down"></i>
                <span>{Math.round(100 - (product.variant_ph_final_price / product.variant_ph_org_price) * 100)}%</span>
            </div>
        </div>
    )
}

export function CartProduct({ product, baselink, checked, onChange }) {
    return (
        <div
            className="flex items-center bg-white justify-evenly rounded-md shadow-md shadow-gray-300 border p-0.5 px-2
                         border-gray-300 cursor-pointer hover:scale-[101%] hover:shadow-mainCL transition-all
                         duration-300 ease-in-out w-full"
        >
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
            />
            <div className="flex items-center gap-2 p-2">
                <picture className="max-w-16">
                    <img
                        className="rounded-md"
                        src={`${baselink}${product.variant_img}`}
                        alt={`${product.phone_name} - ${product.variant_ph_ram}GB/${product.variant_ph_rom}GB`}
                    />
                </picture>
                <div className="flex flex-col">
                    <p className="text-sm font-bold">
                        {product.phone_name} - {product.variant_ph_ram}GB/{product.variant_ph_rom}GB
                    </p>
                    <p className="text-sm text-gray-600">
                        {product.phone_desc}
                    </p>
                    <div className="flex justify-between items-center my-1 px-2">
                        <p className="text-sm font-light text-mainCL lowercase">
                            {product.variant_ph_color}
                        </p>
                        <p className="text-base text-mainCL font-semibold">
                            {priceFormatter(product.variant_ph_final_price)} đ
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}