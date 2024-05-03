/* eslint-disable react/prop-types */
function ShimmerItem({className}) {
    return (
        <div className={`${className} flex flex-col gap-y-3 justify-between pt-3 px-4 pb-3 rounded-lg bg-slate-300 w-auto relative animate-pulse`}>
        </div>
    )
}

export default ShimmerItem;