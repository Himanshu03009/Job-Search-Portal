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
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading,user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }
    useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[])

    return (
        <div className="min-h-screen bg-gradient-to-tr from-indigo-900 via-purple-900 to-blue-800 flex flex-col">
            <Navbar />
            <div className='flex items-center justify-center flex-grow px-4 py-12'>
                <form 
                  onSubmit={submitHandler} 
                  className='w-full max-w-md bg-gradient-to-br from-white/90 via-purple-50/90 to-white/90 
                             border border-gray-300 rounded-2xl shadow-2xl
                             p-10
                             transform transition-transform duration-500 hover:scale-[1.02]
                             '
                >
                    <h1 className='font-extrabold text-4xl text-purple-900 mb-8 text-center drop-shadow-md'>
                      Login
                    </h1>

                    <div className='space-y-3'>
                        <Label className="text-purple-800 font-semibold">Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="abc@gmail.com"
                            className="border border-purple-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-400 rounded-lg px-4 py-2 shadow-sm"
                        />
                    </div>

                    <div className='space-y-3 mt-6'>
                        <Label className="text-purple-800 font-semibold">Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="*****"
                            className="border border-purple-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-400 rounded-lg px-4 py-2 shadow-sm"
                        />
                    </div>

                    <div className="mt-6">
                        <RadioGroup className="flex items-center gap-8">
                            <div className="flex items-center space-x-3">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer h-6 w-6 text-purple-600"
                                    id="student-role"
                                />
                                <Label htmlFor="student-role" className="cursor-pointer text-purple-700 font-medium text-lg">Student</Label>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer h-6 w-6 text-purple-600"
                                    id="recruiter-role"
                                />
                                <Label htmlFor="recruiter-role" className="cursor-pointer text-purple-700 font-medium text-lg">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {
                        loading ? 
                            <Button className="w-full py-3 mt-8 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-lg flex items-center justify-center shadow-lg" disabled>
                                <Loader2 className='mr-3 h-6 w-6 animate-spin' /> Please wait
                            </Button> 
                            : 
                            <Button 
                                type="submit" 
                                className="w-full py-3 mt-8 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300"
                            >
                                Login
                            </Button>
                    }

                    <p className='text-center text-sm text-purple-800 mt-6'>
                        Don't have an account? <Link to="/signup" className='text-purple-600 font-semibold hover:underline'>Signup</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login
