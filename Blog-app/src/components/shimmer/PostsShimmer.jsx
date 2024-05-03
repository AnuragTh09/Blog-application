import ShimmerItem from "./ShimmerItem";

function PostsShimmer() {
    let shimmerItems = [];
    for (let i = 1; i < 9; i++) {
        shimmerItems.push(<ShimmerItem key={i} className={'w-auto h-[170px]'} />);
    }

    return (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(235px,1fr))] gap-x-4 gap-y-4 w-full py-8 relative">
            {shimmerItems}
        </div>
    )
}

export default PostsShimmer;