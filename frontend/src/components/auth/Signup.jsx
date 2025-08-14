import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });

    const {loading, user} = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) formData.append("file", input.file);

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (user) navigate("/");
    }, [user, navigate]);

    return (
        <div className="h-screen bg-gradient-to-tr from-indigo-900 via-purple-900 to-blue-800 flex flex-col overflow-hidden">
            <Navbar />
            <div className="flex flex-grow justify-center items-center px-4 py-4">
                <form
                    onSubmit={submitHandler}
                    className="w-full max-w-sm bg-white bg-opacity-90 border border-gray-300 rounded-3xl shadow-lg p-4 space-y-3"
                    style={{ maxHeight: 'calc(100vh - 100px)' }} // approx navbar + padding space
                >
                    <h1 className="font-extrabold text-xl text-purple-900 mb-2 text-center drop-shadow-md">
                        Sign Up
                    </h1>

                    {/* Full Name */}
                    <div className="space-y-1">
                        <Label className="text-purple-800 font-semibold text-xs">Full Name</Label>
                        <Input
                            type="text"
                            name="fullname"
                            value={input.fullname}
                            onChange={changeEventHandler}
                            placeholder="Full Name"
                            className="border border-purple-300 focus:border-purple-600 focus:ring-1 focus:ring-purple-400 rounded-md px-2 py-1 shadow-sm text-xs"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                        <Label className="text-purple-800 font-semibold text-xs">Email</Label>
                        <Input
                            type="email"
                            name="email"
                            value={input.email}
                            onChange={changeEventHandler}
                            placeholder="abc@gmail.com"
                            className="border border-purple-300 focus:border-purple-600 focus:ring-1 focus:ring-purple-400 rounded-md px-2 py-1 shadow-sm text-xs"
                            required
                        />
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-1">
                        <Label className="text-purple-800 font-semibold text-xs">Phone Number</Label>
                        <Input
                            type="tel"
                            name="phoneNumber"
                            value={input.phoneNumber}
                            onChange={changeEventHandler}
                            placeholder="93******00"
                            className="border border-purple-300 focus:border-purple-600 focus:ring-1 focus:ring-purple-400 rounded-md px-2 py-1 shadow-sm text-xs"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="space-y-1">
                        <Label className="text-purple-800 font-semibold text-xs">Password</Label>
                        <Input
                            type="password"
                            name="password"
                            value={input.password}
                            onChange={changeEventHandler}
                            placeholder="*****"
                            className="border border-purple-300 focus:border-purple-600 focus:ring-1 focus:ring-purple-400 rounded-md px-2 py-1 shadow-sm text-xs"
                            required
                        />
                    </div>

                    {/* Role & Profile Upload */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mt-2">
                        <RadioGroup className="flex items-center gap-3 flex-grow min-w-[140px]">
                            <div className="flex items-center space-x-1">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === "student"}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer h-3 w-3 text-purple-600"
                                    id="student-role"
                                    required
                                />
                                <Label htmlFor="student-role" className="cursor-pointer text-purple-700 font-medium text-xs">
                                    Student
                                </Label>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === "recruiter"}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer h-3 w-3 text-purple-600"
                                    id="recruiter-role"
                                />
                                <Label htmlFor="recruiter-role" className="cursor-pointer text-purple-700 font-medium text-xs">
                                    Recruiter
                                </Label>
                            </div>
                        </RadioGroup>

                        <div className="flex items-center gap-1 max-w-full min-w-[120px]">
                            <Label className="text-purple-800 font-semibold whitespace-nowrap text-xs">Profile</Label>
                            <input
                                accept="image/*"
                                type="file"
                                onChange={changeFileHandler}
                                className="cursor-pointer rounded-md border border-purple-300 px-1 py-0.5 text-xs text-purple-700
                                           bg-white hover:bg-purple-50 shadow-sm focus:outline-none focus:ring-1 focus:ring-purple-400
                                           w-full"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    {loading ? (
                        <Button
                            className="w-full py-1.5 mt-3 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-lg flex items-center justify-center shadow-lg text-xs"
                            disabled
                        >
                            <Loader2 className="mr-2 h-3 w-3 animate-spin" /> Please wait
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            className="w-full py-1.5 mt-3 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300 text-xs"
                        >
                            Signup
                        </Button>
                    )}

                    {/* Login Link */}
                    <p className="text-center text-xs text-purple-800 mt-2">
                        Already have an account?{" "}
                        <Link to="/login" className="text-purple-600 font-semibold hover:underline">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
