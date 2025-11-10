import { useEffect, useState } from "react";
// DL gia JSON LOAD LEN
import { cart_item, listCartItems as mockData } from "../Data_Test/CARTS"; // Đổi tên để rõ ràng
import { scrollToTopSmooth } from "../utils/utils";
import { CartProduct } from "../Components/product_card";

export function Cart() {
    const [listCartItem, setListCartItem] = useState([]);
    const [listSelected, setListSelected] = useState([]);

    // State này sẽ là "nguồn chân lý" cho các thay đổi
    // Dạng: [{ variant_id: 1, new_count: 3 }, { variant_id: 2, new_count: 1 }]
    const [listChangeCount, setListChangeCount] = useState([]);

    const base_link = "https://res.cloudinary.com/df5mtvzkn/image/upload/q_auto,f_auto/WEB_SELL_PHONE__PROJECT/TEST/Test_IMG/";

    const fetchListCartItemAPI = () => {
        // fetch API here
        // Gia lap bang dl co san 
        const copy_listCartItem = mockData.listCartItems;
        console.log("Du lieu tai moi la: ", copy_listCartItem);
        setListCartItem(copy_listCartItem);
        scrollToTopSmooth();
    }

    // Sửa lỗi: Dùng useEffect, không dùng useState để fetch
    useEffect(() => {
        fetchListCartItemAPI();
    }, [])

    // SỬA THÀNH (Logic toggle check/uncheck):
    const handleSelect = (id) => {
        setListSelected((prevSelected) => {
            // Kiểm tra xem ID đã có trong mảng chưa
            if (prevSelected.includes(id)) {
                // Nếu đã có -> bỏ check (lọc nó ra)
                return prevSelected.filter(itemId => itemId !== id);
            } else {
                // Nếu chưa có -> check (thêm nó vào)
                return [...prevSelected, id];
            }
        });
    }

    // --- LOGIC CẬP NHẬT COUNT ---

    // 1. Hàm "thông minh" (Upsert) để cập nhật danh sách thay đổi
    const updateChangeList = (variantId, newCount) => {
        setListChangeCount(prevChanges => {
            const existingChangeIndex = prevChanges.findIndex(c => c.variant_id === variantId);

            if (existingChangeIndex > -1) {
                // ĐÃ có trong list -> cập nhật count
                const updatedChanges = [...prevChanges]; // Sao chép mảng
                updatedChanges[existingChangeIndex] = { ...updatedChanges[existingChangeIndex], new_count: newCount };
                return updatedChanges;
            } else {
                // CHƯA có -> thêm mới
                return [...prevChanges, { "variant_id": variantId, "new_count": newCount }];
            }
        });
    };

    // 2. Sửa handlePlus
    const handlePlus = (id) => {
        // Tìm số lượng mới
        const itemToUpdate = listCartItem.find(item => item.variant_id === id);
        const newCount = itemToUpdate.cart_count + 1;

        // Cập nhật UI (listCartItem)
        const copy_listCartItem = listCartItem.map(item => {
            if (item.variant_id === id) {
                return { ...item, cart_count: newCount };
            }
            return item;
        });
        setListCartItem(copy_listCartItem);

        // Cập nhật danh sách "dirty" (listChangeCount)
        updateChangeList(id, newCount);
    }

    // 3. Sửa handleMinus
    const handleMinus = (id) => {
        const itemToUpdate = listCartItem.find(item => item.variant_id === id);

        // Kiểm tra trước khi làm bất cứ điều gì
        if (itemToUpdate.cart_count <= 1) {
            alert("Gia tri nho nhat cho phep la 1! Hay xoa san pham cart Instead!");
            return; // Dừng hàm, không làm gì cả
        }

        // Nếu qua được, nghĩa là CÓ thay đổi
        const newCount = itemToUpdate.cart_count - 1;

        // Cập nhật UI
        const copy_listCartItem = listCartItem.map(item => {
            if (item.variant_id === id) {
                return { ...item, cart_count: newCount };
            }
            return item;
        });
        setListCartItem(copy_listCartItem);

        // Cập nhật danh sách "dirty"
        updateChangeList(id, newCount);
    }

    // --- LOGIC CÁC NÚT HÀNH ĐỘNG ---

    // 4. Tính toán xem có thay đổi chưa lưu hay không
    const hasUnsavedChanges = listChangeCount.length > 0;

    // 5. Hoàn thiện các hàm
    const handleDelete = () => {
        if (hasUnsavedChanges) {
            alert("Bạn có thay đổi số lượng chưa lưu. Vui lòng 'Lưu thay đổi' hoặc tải lại trang để hủy.");
            return;
        }

        if (listSelected.length === 0) {
            alert("Bạn chưa chọn sản phẩm nào để xóa.");
            return;
        }

        console.log("--- GỬI API XÓA ---");
        console.log(listSelected);
        // ... gọi API xóa ...
        alert("Đã gửi yêu cầu XÓA các ID: " + listSelected.join(", "));
    };

    const handleCheckout = () => {
        if (hasUnsavedChanges) {
            alert("Bạn có thay đổi số lượng chưa lưu. Vui lòng 'Lưu thay đổi' hoặc tải lại trang để hủy.");
            return;
        }

        if (listSelected.length === 0) {
            alert("Bạn chưa chọn sản phẩm nào để mua.");
            return;
        }

        console.log("--- GỬI API MUA HÀNG ---");
        console.log(listSelected);
        // ... gọi API mua hàng ...
        alert("Đã gửi yêu cầu MUA HÀNG các ID: " + listSelected.join(", "));
    };

    const handleChangeCount = () => {
        if (!hasUnsavedChanges) {
            console.log("Không có gì để lưu.");
            return;
        }

        console.log("--- GỬI API CẬP NHẬT SỐ LƯỢNG ---");
        console.log(listChangeCount);

        // ... Giả lập gọi API thành công ...
        alert("Đã lưu thay đổi số lượng!");

        // Reset lại danh sách thay đổi
        setListChangeCount([]);
    };

    return (
        <>
            <div className="bg-slate-50 animate__animated animate_fadeIn py-5">
                {/* ... (Phần tiêu đề Giỏ hàng) ... */}

                <div className="grid grid-cols-1 md:grid-cols-2 p-5 gap-5 bg-white w-[90%] mx-auto mt-5 rounded-lg shadow-lg overflow-hidden max-h-[400px] md:max-h-[300px] overflow-y-scroll">
                    {/* 💡 Thay đổi 10: Xử lý trường hợp giỏ hàng trống */}
                    {!(listCartItem.length > 0) ? (
                        <p className="text-center text-gray-500 md:col-span-2">Giỏ hàng của bạn đang trống.</p>
                    )
                        : (
                            listCartItem.map(cart_item => {
                                return (
                                    <CartProduct
                                        baselink={base_link}
                                        key={cart_item.variant_id}
                                        cart_item={cart_item}
                                        // value={cart_item.cart_count} // Prop này không cần thiết vì đã có trong cart_item
                                        onIncrease={() => handlePlus(cart_item.variant_id)}
                                        onDecrease={() => handleMinus(cart_item.variant_id)}
                                        checked={listSelected.includes(cart_item.variant_id)}
                                        onChange={() => { handleSelect(cart_item.variant_id) }}
                                    />
                                )
                            })
                        )
                    }
                </div>
                <div className="w-[90%] mx-auto mt-5 flex justify-end gap-5 md:justify-center">
                    <button
                        onClick={handleDelete}
                        className="text-mainCL border border-mainCL px-2 py-1 rounded-md font-semibold">
                        Xóa
                    </button>
                    <button
                        onClick={handleCheckout}
                        className="text-white bg-mainCL px-2 py-1 rounded-md font-semibold">
                        Mua ngay
                    </button>

                    <button
                        onClick={handleChangeCount}
                        disabled={!hasUnsavedChanges} // Vô hiệu hóa nút nếu không có gì thay đổi
                        className={`px-2 py-1 rounded-md font-semibold border transition-all
                            ${hasUnsavedChanges
                                ? "text-white bg-[#228B22] hover:bg-green-700"
                                : "bg-white text-[#228B22] border-[#228B22] opacity-50 cursor-not-allowed"}
                        `}>
                        Lưu thay đổi số lượng
                    </button>
                </div>
            </div>
        </>
    );
}