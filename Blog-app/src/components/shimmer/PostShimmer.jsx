import ShimmerItem from "./ShimmerItem";

function PostShimmer() {
  return (
      <div className="grid grid-cols-1 gap-y-5 mt-4">
        <ShimmerItem className={'w-auto h-[400px]'} />
        <ShimmerItem className={'w-[300px] h-[50px] mx-auto'} />
        <ShimmerItem className={'w-auto h-[300px]'} />
      </div>
  )
}

export default PostShimmer;