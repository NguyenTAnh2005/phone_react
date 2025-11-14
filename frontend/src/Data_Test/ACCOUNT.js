export const eg_info1 = {
    account_id: "acc_001",
    account_first_name: "Tuan Anh",
    account_last_name: "Nguyen",
    account_email: "23050118@student.bdu.edu.vn",
    account_gender: true,
    account_date: "06/10/2005",
    order_count: 2,
    money_claim: 10000000
}

export const eg_all_data_account = {
    "head": {
        account_first_name: "Tuan Anh",
        account_last_name: "Nguyen",
        account_email: "23050118@student.bdu.edu.vn",
        account_date: "06/10/2005",
        order_count: 2,
        money_count: 10000000
    },
    "info1": {
        account_id: "acc_001",
        account_first_name: "Tuan Anh",
        account_last_name: "Nguyen",
        account_gender: true,
        account_date: "06/10/2005",
    },
    "info2": {
        account_id: "acc_001",
        account_email: "23050118@student.bdu.edu.vn",
        account_password: "123456789",
    },
    "hotlines": [
        {
            hotline_id: "hl_001",
            hotline_name: "Nguyễn Tuấn Anh",
            hotline_phonenumber: "0328884320",
            hotline_address: "Tổ 6, thôn 7, xã Cẩm Xuyên, tỉnh Hà Tĩnh 1",
            hotline_default: true
        },
        {
            hotline_id: "hl_002",
            hotline_name: "Lê Ngọc Sang",
            hotline_phonenumber: "0328884320",
            hotline_address: "Tổ 6, thôn 7, xã Cẩm Xuyên, tỉnh Hà Tĩnh 2",
            hotline_default: false
        },
        {
            hotline_id: "hl_003",
            hotline_name: "Nguyễn Mạnh Phát GAY",
            hotline_phonenumber: "0328884320",
            hotline_address: "Tổ 6, thôn 7, xã Cẩm Xuyên, tỉnh Hà Tĩnh 3",
            hotline_default: false
        },
        {
            hotline_id: "hl_004",
            hotline_name: "Lê Đình Tuyển",
            hotline_phonenumber: "0328884320",
            hotline_address: "Tổ 6, thôn 7, xã Cẩm Xuyên, tỉnh Hà Tĩnh 4",
            hotline_default: false
        }
    ],
    "orders": [
        {
            id: "2025-11-02T11:18:17.807Z--acc_001--hl_001",
            account_id: "acc_001",
            hotline_id: "hl_001", // Nối với eg_hotline
            buy_time: "02/11/2025",
            rec_time: "06/11/2025",
            type_pay: "Online",
            state: "DONE", // Đã hoàn tất
            total_price: 14985000,
            detail: [
                {
                    variant_id: "ph_1__v1",
                    count: 1,
                    detail_name: "iPhone X 3GB/64GB",
                    price: 4995000,
                    unit_price: 4995000,
                },
                {
                    variant_id: "ph_2__v1",
                    count: 1,
                    detail_name: "iPhone X 3GB/64GB",
                    price: 4995000,
                    unit_price: 4995000,
                },
                {
                    variant_id: "ph_3__v1",
                    count: 1,
                    detail_name: "iPhone X 3GB/64GB",
                    price: 4995000,
                    unit_price: 4995000,
                },
            ],
        },
        {
            id: "2025-10-30T09:30:00.000Z--acc_001--hl_002",
            account_id: "acc_001",
            hotline_id: "hl_002", // Nối với eg_hotline
            buy_time: "30/10/2025",
            rec_time: "03/11/2025",
            type_pay: "COD",
            state: "SHIPPING", // Đang giao
            total_price: 9990000,
            detail: [
                {
                    variant_id: "ph_2__v1",
                    count: 2,
                    detail_name: "iPhone X 3GB/64GB",
                    price: 4995000,
                    unit_price: 9990000,
                },
            ],
        },
        {
            id: "2025-10-28T14:00:00.000Z--acc_001--hl_003",
            account_id: "acc_001",
            hotline_id: "hl_003", // Nối với eg_hotline
            buy_time: "28/10/2025",
            rec_time: "01/11/2025",
            type_pay: "Online",
            state: "DONE", // Đang chuẩn bị
            total_price: 4995000,
            detail: [
                {
                    variant_id: "ph_1__v1",
                    count: 1,
                    detail_name: "iPhone X 3GB/64GB",
                    price: 4995000,
                    unit_price: 4995000,
                },
            ],
        }
    ]
}