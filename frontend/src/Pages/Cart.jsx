import { useState } from "react";
import { cart_list_product } from "../Data_Test/Data_Home_Test"
import { CartProduct } from "../Components/product_card"

export function Cart({ list_prduct = cart_list_product }) {
    const base_link = "https://res.cloudinary.com/df5mtvzkn/image/upload/q_auto,f_auto/WEB_SELL_PHONE__PROJECT/TEST/Test_IMG/"
    const copy_arr = list_prduct.map(p => {
        return <CartProduct baselink={base_link} product={p} key={`${p.product_id}-${p.variant_id}`} />
    })
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 p-5 gap-3">
            {copy_arr}
        </div>
    );
}

