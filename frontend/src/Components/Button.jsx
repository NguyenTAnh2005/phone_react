import { Link } from "react-router-dom"
export function ButtonActiveLink({ link, content, classTail }) {
    return (
        <button className={classTail}>
            <Link to={link}>
                {content}
            </Link>
        </button>
    );
}
export function ButtonFormSubmit() {
    return (
        <button className={`bg-mainCL mt-5 text-white text-center py-2 rounded-xl text-${fs_title} font-medium`}>

        </button>
    )
}
