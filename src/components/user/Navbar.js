import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';




const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    useEffect(() => {

        const jwt = localStorage.getItem('userToken')
        console.log("hitoken", jwt)
        if (jwt) {
            setIsLoggedIn(true)
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        setIsLoggedIn(false); // Update the state here
        toast.success("You have been logged out!")
    };

    const location = useLocation();

    return (
        <div>
            {/* Navbar goes here */}
            <nav className="bg-white shadow-lg">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex justify-between">
                        <div className="flex  space-x-3">
                            <div>
                                {/* Website Logo */}
                                <Link to='/' className="flex items-center py-4 px-2" >
                                    <img src="trioverseLogo.png" alt="Logo" className="h-12 w-12 mr-2" />
                                    <span className="font-semibold text-gray-500 text-lg">Trioverse</span>
                                </Link>
                            </div>
                            {/* Primary Navbar items */}
                            <div className="hidden md:flex items-center space-x-1">
                                <Link
                                    to="/"
                                    className={`py-4 px-2 text-green-500 border-b-4 font-semibold ${location.pathname === '/' ? 'border-green-500' : 'border-transparent'
                                        }`}
                                >
                                    Home
                                </Link>
                                <Link
                                    to="/browse"
                                    className={`py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300 ${location.pathname === '/browse' ? 'text-green-500' : ''
                                        }`}
                                >
                                    Browse Categories
                                </Link>
                                <Link
                                    to="/sellerprofile"
                                    className={`py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300 ${location.pathname === '/sellerprofile' ? 'text-green-500' : ''
                                        }`}
                                >
                                    Become a Seller
                                </Link>
                                <Link
                                    to="/overview"
                                    className={`py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300 ${location.pathname === '/overview' ? 'text-green-500' : ''
                                        }`}
                                >
                                    Account Overview
                                </Link>
                            </div>
                        </div>
                        {/* Secondary Navbar items */}
                        <div className="hidden md:flex items-center space-x-3 ">
                            {isLoggedIn ? <>
                                <Link to="/overview" className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-green-500 hover:text-white transition duration-300">Account</Link>
                                <Link to="/" className="py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300"><span onClick={handleLogout}>Log Out</span></Link>
                            </>
                                :
                                <>
                                    <Link to="/login" className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-green-500 hover:text-white transition duration-300">Log In</Link>
                                    <Link to="/signup" className="py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300">Sign Up</Link>
                                </>
                            }

                        </div>
                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center">
                            <button className="outline-none mobile-menu-button">
                                <svg className=" w-6 h-6 text-gray-500 hover:text-green-500 "
                                    x-show="!showMenu"
                                    fill="none"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                {/* mobile menu */}
                <div className="hidden mobile-menu">
                    <ul className="">
                        <li className={location.pathname === '/' ? 'active' : ''}>
                            <Link
                                to="/"
                                className={`block text-sm px-2 py-4 ${location.pathname === '/' ? 'text-white bg-green-500 font-semibold' : 'hover:bg-green-500 transition duration-300'
                                    }`}
                            >
                                Home
                            </Link>
                        </li>
                        <li className={location.pathname === '/browse' ? 'active' : ''}>
                            <Link
                                to="/browse"
                                className={`block text-sm px-2 py-4 ${location.pathname === '/browse' ? 'text-white bg-green-500 font-semibold' : 'hover:bg-green-500 transition duration-300'
                                    }`}
                            >
                                Browse Categories
                            </Link>
                        </li>
                        <li className={location.pathname === '/sellerprofile' ? 'active' : ''}>
                            <Link
                                to="/sellerprofile"
                                className={`block text-sm px-2 py-4 ${location.pathname === '/sellerprofile' ? 'text-white bg-green-500 font-semibold' : 'hover:bg-green-500 transition duration-300'
                                    }`}
                            >
                                Become a Seller
                            </Link>
                        </li>
                        <li className={location.pathname === '/overview' ? 'active' : ''}>
                            <Link
                                to="/overview"
                                className={`block text-sm px-2 py-4 ${location.pathname === '/overview' ? 'text-white bg-green-500 font-semibold' : 'hover:bg-green-500 transition duration-300'
                                    }`}
                            >
                                Account Overview
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav >
            <Toaster />
        </div >

    )
}

export default Navbar


