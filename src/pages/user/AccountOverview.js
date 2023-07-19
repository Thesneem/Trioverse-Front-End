import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../../config'
import Navbar from '../../components/user/Navbar'
import { BsXCircleFill } from "react-icons/bs";
import { useFormik } from 'formik'
import { profileUpdateSchema } from '../../formSchemas/profileUpdateSchema'
import { useSelector, useDispatch } from 'react-redux'
import { setUserDetails } from '../../redux/userSlice';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'
import EditProfileModal from '../../components/modals/EditProfileModal';
import { HiPencilAlt } from "react-icons/hi";


const AccountOverview = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    const fetchProfile = async () => {
        try {
            console.log('HelloooProfileurl')
            const response = await axios.get(`/profile`, {
                headers: {
                    'token': `Bearer ${localStorage.getItem('userToken')} `
                }
            },
                {
                    credentials: true
                }

            )
            console.log("HELOO", response.data.user)
            dispatch(setUserDetails(response.data.user))
        }
        catch (err) {
            console.log(err)
        }

    }

    const [isPopupOpen, setPopupOpen] = useState(false);
    const [image, setimage] = useState(null)
    const [showEditProfileModal, setshowEditProfileModal] = useState(false)

    const { user } = useSelector((state) => state.user)
    console.log('hi redux', user)
    const dispatch = useDispatch()

    useEffect(() => {
        console.log('TESTINGUSEEFFECT')
        fetchProfile()
        setIsLoaded(true)
    }, [dispatch, image, showEditProfileModal])



    const handleEditIconClick = () => {
        setPopupOpen(true);
    };

    const handleClosePopup = () => {
        setPopupOpen(false)
        setimage(null)
    }

    const handleAddImage = (e) => {
        e.preventDefault();

        //const file = e.target.files && e.target.files[0];
        const form = new FormData();
        form.append('image', image);
        axios
            .post(`/AddProfileimage`, form, {
                headers: {
                    'token': `Bearer ${localStorage.getItem('userToken')} `
                }
            })
            .then(res => {
                setimage(null);
                setPopupOpen(false)
                console.log(res);
                if (res.data.type === 'Success') {
                    toast.success('Success');
                } else {
                    toast.error('Error');
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error('Error');
            });
    };

    const initialValues = {
        firstName: user?.firstName,
        lastName: user?.lastName,
        userName: user?.userName,
        place: user?.place,
        about: user?.about,
    }
    console.log('INITAIL VALUES', initialValues)

    const { values, errors, touched, handleBlur, handleChange, } =
        useFormik({
            initialValues,
            validationSchema: profileUpdateSchema,
        })


    const handleShowProfileModal = () => {
        setshowEditProfileModal(true)
    }
    const handleCloseEditProfileModal = () => {
        //values.category = ''
        setshowEditProfileModal(false);
    }
    const handleEditProfile = async () => {
        try {
            console.log('EDITAXIOS')
            console.log('testUserdata', user?.firstName)
            const response = await axios.post(`/updateProfile`, {
                ...values,
            }, {
                headers: {
                    'token': `Bearer ${localStorage.getItem('userToken')} `
                }
            }, {
                credentials: true
            })
            console.log(response)
            if (response.data.type === 'Success') {
                // action.resetForm();
                setshowEditProfileModal(false);
                toast.success('Profile has been updated')
            }
            else {
                toast.error('Issue in updating profile,Please try later')
            }
        }
        catch (error) {
            toast.error('Server Error')
        }
    }



    return (
        <>
            {isLoaded && (
                <div>

                    <Navbar />
                    <div className='flex-col justify-center text-center overflow-auto'>
                        {!user?.isProfile_set && (
                            <div classname='item-center'>
                                <div className="flex justify-center alert alert-info text-center my-5 mx-6">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        className="stroke-current shrink-0 w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        ></path>
                                    </svg>
                                    <span>
                                        Please set your profile details with a profile picture!
                                    </span>
                                </div>
                            </div>
                        )}

                        <h1 className='text-green-800 text-4xl font-bold'>Account Overview</h1>
                        <Toaster />
                        <div className='flex flex-col sm:flex-row m-10 '>
                            <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 mb-6 sm:mb-0'>
                                <div className="card w-96 bg-base-200 shadow-xl h-100 hover:bg-slate-200">
                                    <div className="mt-3 flex justify-center items-center text-center">
                                        <h3 className="card-title text-3xl">User Profile</h3>
                                    </div>
                                    <div className="flex justify-center items-center ">
                                        <div className="relative ">
                                            {user?.profile_pic ? (
                                                < img
                                                    src={`${BASE_URL}/public/uploads/profilepics/${user?.profile_pic}`}
                                                    alt="profile"
                                                    fill
                                                    className="rounded-full w-24 h-24"
                                                />) : (
                                                <div className="bg-purple-500 h-10 w-10 flex items-center justify-center rounded-full relative">
                                                    <span className="text-xl text-white">
                                                        {user?.email[0]?.toUpperCase()}

                                                    </span>
                                                </div>
                                            )}
                                            {/* <img className="w-24 h-24 rounded-full" src="office.jpg" alt="Avatar" /> */}
                                            <div className="absolute bottom-0 right-0 -mr-2 -mb-2 bg-white p-1 rounded-full hover:cursor-pointer" onClick={handleEditIconClick} >
                                                <HiPencilAlt />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card-body items-center text-center">
                                        <h2 className="card-title">FULLNAME: {user && `${user.firstName} ${user.lastName}`}</h2>
                                        <p>EMAIL: {user && `${user?.email}`}</p>
                                        <p>MOBILE: {user && `${user?.mobile}`}</p>
                                        <p>USERNAME: {user && user.userName ? user.userName : <span className='text-red-500'>Not Updated</span>}</p>
                                        <p>PLACE: {user && user.place ? user.place : <span className='text-red-500'>Not Updated</span>}</p>
                                        <div class="collapse bg-slate-200">
                                            <input type="checkbox" />
                                            <div class="collapse-title text-xl font-medium">
                                                About
                                            </div>
                                            <div class="collapse-content">
                                                <p>{user && user.about ? user.about : <span className='text-red-500'>Not Updated</span>}</p>
                                            </div>
                                        </div>
                                        <div className="card-actions">
                                            <button className="btn btn-success btn-xs sm:btn-sm md:btn-md lg:btn-lg" onClick={handleShowProfileModal}>Set Profile</button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className='w-full sm:w-1/2 md:w-2/3 lg:w-3/4 xl:w-5/6'>

                                {/* {!user?.isSellerProfile_set && (
                                    <div className='flex justify-end mr-4'>
                                        <Link to='/becomeASeller'>
                                            <button className='btn btn-success hover:btn-warning'>Create Seller Profile</button>
                                        </Link>
                                    </div>
                                )
                                } */}
                                <div>
                                    {user?.isSellerProfile_set && (
                                        <Link to='/createListing'>
                                            <button className='btn btn-success hover:btn-warning'>Create A Listing</button>
                                        </Link>
                                    )}
                                </div>

                                <div class="p-4 sm:ml-64">
                                    <div class="grid grid-cols-3 gap-4 mb-4">

                                        {user?.isSellerProfile_set && (
                                            <>
                                                <Link to='/sellerprofile'><div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800  hover:bg-green-800 transition duration-300" >
                                                    < p class="text-2xl text-gray-400 dark:text-gray-500">Seller Profile</p>
                                                </div>
                                                </Link>

                                                <Link to='/sellerListings'>  <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800 hover:bg-green-800 transition duration-300">
                                                    <p class="text-2xl text-gray-400 dark:text-gray-500 ">Listings</p>
                                                </div>
                                                </Link>

                                                <Link to='/sellOrders'>
                                                    <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800  hover:bg-green-800 transition duration-300">
                                                        <p class="text-2xl text-gray-400 dark:text-gray-500">My Sell Orders</p>
                                                    </div>
                                                </Link>
                                            </>
                                        )}


                                    </div>
                                </div>
                                <div class="p-4 sm:ml-64">
                                    <div class="grid grid-cols-3 gap-4 mb-4">
                                        <Link to='/buyOrders'>
                                            <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800  hover:bg-green-800 transition duration-300">
                                                <p class="text-2xl text-gray-400 dark:text-gray-500">My Buy Orders</p>
                                            </div>
                                        </Link>
                                        <Link to='/chatpage'> <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800  hover:bg-green-800 transition duration-300">
                                            <p class="text-2xl text-gray-400 dark:text-gray-500">Chat</p>
                                        </div></Link>
                                        {/* <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800  hover:bg-green-800 transition duration-300">
                                            <p class="text-2xl text-gray-400 dark:text-gray-500">Wallet</p>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                    <div>
                        {isPopupOpen && (
                            <div className="fixed z-50 inset-0 overflow-y-auto">
                                <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                                    <div className="fixed inset-0 transition-opacity">
                                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                                    </div>
                                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
                                    &#8203;
                                    <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-4 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                                        <div>
                                            <div className="popup">
                                                <button className="close-icon" onClick={handleClosePopup}>
                                                    <BsXCircleFill />
                                                </button>
                                                <div className="flex justify-center text-center">
                                                    <h1 className="text-3xl font-bold">Profile Picture</h1>
                                                </div>
                                                <img
                                                    src={image || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"}
                                                    alt="img"
                                                    className="popup-image"
                                                />
                                                <form onSubmit={handleAddImage} encType='multipart /form-data'>
                                                    <input type="file" accept='image/*' className="file-input file-input-bordered file-input-xs w-full max-w-xs" name="image" onChange={(e) => { setimage(e.target.files[0]); console.log(image) }}
                                                    />
                                                    <button type="submit" className="btn-sm mx-2 text-center mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                                                        Submit
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div >
                            </div >
                        )}


                        {showEditProfileModal && (
                            <EditProfileModal
                                showEditProfileModal={showEditProfileModal}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                                values={values}
                                errors={errors}
                                touched={touched}
                                handleEditProfile={handleEditProfile}
                                handleCloseEditProfileModal={handleCloseEditProfileModal}
                            />
                        )}
                    </div>
                </div >

            )}
        </>
    )
}

export default AccountOverview