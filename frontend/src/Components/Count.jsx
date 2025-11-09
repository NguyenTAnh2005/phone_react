export function Count({ value, onPlus, onMinus }) {
    return (
        <div className="flex font-semibold text-mainCL justify-evenly w-full">
            <i
                onClick={onMinus}
                className="bi bi-dash-square"
            >
            </i>
            <span className="font-semibold text-center">{value}</span>
            <i
                onClick={onPlus}
                className="bi bi-plus-square"
            >
            </i>
        </div>
    );
}