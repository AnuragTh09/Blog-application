import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Logo } from './index';
import { login } from "../store/authSlice";

function Signup() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState("");
    const { register, handleSubmit } = useForm();

    const signup = async (data) => {
        setError("");
        setLoading(true);
        try {
            const account = await authService.createAccount(data);
            if (account) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(login({userData}));
                }
                setLoading(false);
                navigate('/');
            }
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 pt-5 border border-black/10`}>
                <div className="mb-2 ms-7 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo />
                    </span>
                </div>
                <h2 className="text-center sm:text-2xl font-bold leading-tight xs:text-xl">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60 max-sm:text-[14px]">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline max-sm:text-[14px]"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(signup)}>
                    <div className='space-y-5'>
                        <Input
                            label="Full Name: "
                            placeholder="Enter your full name"
                            {...register("name", {
                                required: true,
                            })}
                        />
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <Button type="submit" className="w-full py-2 relative">
                            Create Account
                            {loading && <span className='animate-spin absolute right-3 top-3 ease-linear rounded-full border-4 border-t-4 border-t-black border-gray-200 h-5 w-5'></span>}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;