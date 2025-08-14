import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
  const { user } = useSelector(store => store.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true })
      if (res.data.success) {
        dispatch(setUser(null))
        navigate('/')
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || 'Something went wrong!')
    }
  }

  return (
    <div className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-8">
        {/* Left side: Logo */}
        <div className="flex items-center gap-10">
          <Link to="/" className="text-2xl font-bold tracking-wide text-gray-900">
            Job<span className="text-purple-900">SEARCH</span>
          </Link>
          {/* Nav Links */}
          <ul className="flex font-medium items-center gap-6 text-purple-700">
            {user && user.role === 'recruiter' ? (
              <>
                <li>
                  <Link to="/admin/companies" className="hover:text-purple-900 transition-colors duration-300">
                    Companies
                  </Link>
                </li>
                <li>
                  <Link to="/admin/jobs" className="hover:text-purple-900 transition-colors duration-300">
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/" className="hover:text-purple-900 transition-colors duration-300">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/jobs" className="hover:text-purple-900 transition-colors duration-300">
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/browse" className="hover:text-purple-900 transition-colors duration-300">
                    Browse
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Right side: Auth Buttons or Avatar */}
        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <Link to="/login">
                <Button
                  variant="outline"
                  className="border-purple-700 text-purple-700 hover:bg-purple-700 hover:text-white px-5 py-2 font-semibold transition-colors duration-300"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  variant="outline"
                  className="border-purple-700 text-purple-700 hover:bg-purple-700 hover:text-white px-5 py-2 font-semibold transition-colors duration-300"
                >
                  Signup
                </Button>
              </Link>
            </>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer ring-2 ring-purple-700">
                  <AvatarImage
                    src={user?.profile?.profilePhoto || 'https://via.placeholder.com/40'}
                    alt={user?.fullname || 'User Avatar'}
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-72 p-4">
                <div className="flex gap-3 items-center mb-4">
                  <Avatar className="ring-2 ring-purple-700">
                    <AvatarImage
                      src={user?.profile?.profilePhoto || 'https://via.placeholder.com/40'}
                      alt={user?.fullname || 'User Avatar'}
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-lg">{user?.fullname}</h4>
                    <p className="text-sm text-gray-500">{user?.profile?.bio || 'No bio available'}</p>
                  </div>
                </div>
                <div className="flex flex-col space-y-3 text-gray-700">
                  {user && user.role === 'student' && (
                    <Link to="/profile" className="flex items-center gap-2 text-purple-700 hover:underline font-medium">
                      <User2 size={18} />
                      View Profile
                    </Link>
                  )}
                  <button
                    onClick={logoutHandler}
                    className="flex items-center gap-2 text-red-600 hover:text-red-800 font-semibold"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
