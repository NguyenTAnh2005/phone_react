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
    if (price < 1000) {
        return `${price}`
    }
    const str_arr = price.toString().split("");
    const idx_dot = str_arr.length % 3;
    str_arr.splice(idx_dot, 0, ".");
    if (str_arr.length < 8) {
        const price_formatted = str_arr.join("");
        return `${price_formatted}`;
    }
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

//  Hàm đầu vào là Date chuẩn ISOString => đầu ra ngày tháng năm, forUI? "": + h , phut , s

export function strDate(isOString) {
    const date = new Date(isOString);
    // 🗓️ Ngày - Tháng - Năm
    const day = date.getDate().toString();          // 1
    const month = (date.getMonth() + 1).toString();   // 11 (do tháng bắt đầu từ 0)
    const year = date.getFullYear();     // 2025
    const output = `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`

    return output
}