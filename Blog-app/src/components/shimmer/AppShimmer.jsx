import ShimmerItem from "./ShimmerItem";
import { Container } from "../index";

function AppShimmer() {

    return (
        <Container>
            <div className="grid grid-cols-1 gap-x-4 gap-y-4 w-full py-8">
                <ShimmerItem className={'w-auto h-[50px]'} />
                <ShimmerItem className={'w-auto h-[335px]'} />
                <ShimmerItem className={'w-auto h-[150px]'} />
            </div>
        </Container>
    )
}

export default AppShimmer;