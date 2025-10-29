//Hàm cuộn lên mượt mà 
export function scrollToTopSmooth() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Cuộn mượt mà
    });
}
// Hàm lấy số inch từ data phone
export function getNumScreenSize(screen_size_str) {
    const arr = screen_size_str.split(" ");
    return arr[0];
}
// Hàm thêm . vào giá  
export function priceFormatter(price) {
    const str_arr = price.toString().split("");
    const idx_dot = str_arr.length % 3;
    str_arr.splice(idx_dot, 0, ".");
    str_arr.splice(idx_dot + 4, 0, ".");
    const price_formatted = str_arr.join("");
    return `${price_formatted}`;
}

// Hàm lấy giá trị string giới tính  TRUE == NAM ,  False==Nữ

export function getStringGender(gender) {
    return gender ? "Nam" : "Nữ"
}

// Hàm lấy string date và trả về dl đưa len Input

export function getDate(dateStr) {
    const [day, month, year] = dateStr.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
}