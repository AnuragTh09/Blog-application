/* eslint-disable react/prop-types */
import LOGO from "../assets/logo.png"

const Logo = () => {
    return (
        <div>
            <img className='w-[72px] h-[70px] md:w-[92px] md:h-[90px] rounded-full object-cover' src={LOGO} />
        </div>
    )
}

export default Logo;