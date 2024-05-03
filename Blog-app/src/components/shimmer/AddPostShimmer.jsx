import ShimmerItem from "./ShimmerItem";

function AddPostShimmer() {
    return (
        <div className="grid sm:grid-cols-2 gap-x-10">
            <div className="flex flex-col gap-y-4">
                <ShimmerItem className={'w-auto h-[50px]'} />
                <ShimmerItem className={'w-auto h-[50px]'} />
                <ShimmerItem className={'w-auto h-[300px]'} />
            </div>
            <div className="flex flex-col gap-y-4">
                <ShimmerItem className={'w-auto h-[50px]'} />
                <ShimmerItem className={'w-auto h-[50px]'} />
                <ShimmerItem className={'w-auto h-[50px]'} />
            </div>
        </div>
    )
}

export default AddPostShimmer;