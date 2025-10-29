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
export function ButtonFormSubmit({ content, classTail }) {
    return (
        <button type="submit" className={`${classTail}`}>
            {content}
        </button>
    )
}
