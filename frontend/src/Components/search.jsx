export function SearchBar({ placeholder, type }) {
    return (
        <form className="flex my-5 w-full border border-gray-300 rounded-lg">
            <input type="text" className="w-full px-5 rounded-l-md py-2 outline-none" placeholder={placeholder} />
            <button type={type}>
                <i className="bi bi-search py-2 bg-mainCL text-white px-3 rounded-r-md"></i>
            </button>
        </form>
    )
}