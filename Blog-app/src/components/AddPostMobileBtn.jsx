import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AddPostMobileBtn() {
    const navigate = useNavigate();
    const {status: authStatus} = useSelector(store => store.auth);

    const handleClick = () => {
        navigate('/add-post');
    };

    return authStatus && (
        <div onClick={handleClick} className="flex items-center justify-center cursor-pointer md:hidden fixed bottom-5 right-6 shadow-2xl">
            <div className="text-xl font-bold rounded-xl px-6 py-2 bg-blue-500">Post</div>
        </div>
    )
}

export default AddPostMobileBtn;