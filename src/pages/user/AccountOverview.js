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
                                            {user && `${user?.profile_pic}` ? (
                                                < img
                                                    src={`${BASE_URL}/public/uploads/profilepics/${user?.profile_pic}`}
                                                    alt="profile"
                                                    fill
                                                    className="rounded-full w-24 h-24"
                                                />) : (

                                                <span className="text-6xl text-white">
                                                    {user && `${user?.email}`}
                                                </span>
                                            )}
                                            {/* <img className="w-24 h-24 rounded-full" src="office.jpg" alt="Avatar" /> */}
                                            <div className="absolute bottom-0 right-0 -mr-2 -mb-2 bg-white p-1 rounded-full" onClick={handleEditIconClick}>

                                                <svg
                                                    className="w-6 h-6 text-gray-500 hover:text-blue-500"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm-4.8-4.8a1.5 1.5 0 012.1 0l1.9 1.9-4 4-1.9-1.9a1.5 1.5 0 010-2.1zm4.8 4.8l4-4a1.5 1.5 0 10-2.1-2.1l-4 4 2.1 2.1z"
                                                    />
                                                </svg>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="card-body items-center text-center">
                                        <h2 className="card-title">FULLNAME: {user && `${user.firstName} ${user.lastName}`}</h2>
                                        <p>EMAIL: {user && `${user?.email}`}</p>
                                        <p>MOBILE: {user && `${user?.mobile}`}</p>
                                        <p>USERNAME: {user && user.userName ? user.userName : 'Not updated'}</p>
                                        <p>PLACE: {user && user.place ? user.place : 'Not Updated'}</p>
                                        <div class="collapse bg-slate-200">
                                            <input type="checkbox" />
                                            <div class="collapse-title text-xl font-medium">
                                                About
                                            </div>
                                            <div class="collapse-content">
                                                <p>{user && user.about ? user.about : 'Not Updated'}</p>
                                            </div>
                                        </div>
                                        <div className="card-actions">
                                            <button className="btn btn-success btn-xs sm:btn-sm md:btn-md lg:btn-lg" onClick={handleShowProfileModal}>Set Profile</button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className='w-full sm:w-1/2 md:w-2/3 lg:w-3/4 xl:w-5/6'>
                                <div className='flex justify-end mr-4 '>
                                    <Link to="/createListing"><button className='btn btn-success hover:btn-warning'>Create a Listing</button></Link>
                                </div>
                                <div class="p-4 sm:ml-64">
                                    <div class="grid grid-cols-3 gap-4 mb-4">
                                        <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800 hover:bg-green-800 transition duration-300">
                                            <p class="text-2xl text-gray-400 dark:text-gray-500 ">Change Password</p>
                                        </div>
                                        <Link to='/sellerprofile'><div class="flex items-center justify-center h-24 rounded bg-green-50 dark:bg-gray-800  hover:bg-green-800 transition duration-300" >
                                            < p class="text-2xl text-gray-400 dark:text-gray-500">Seller Profile</p>
                                        </div></Link>

                                        <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800  hover:bg-green-800 transition duration-300">
                                            <p class="text-2xl text-gray-400 dark:text-gray-500">My Buy Orders</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="p-4 sm:ml-64">
                                    <div class="grid grid-cols-3 gap-4 mb-4">
                                        <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800  hover:bg-green-800 transition duration-300">
                                            <p class="text-2xl text-gray-400 dark:text-gray-500">My Sell Orders</p>
                                        </div>
                                        <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800  hover:bg-green-800 transition duration-300">
                                            <p class="text-2xl text-gray-400 dark:text-gray-500">Chat</p>
                                        </div>
                                        <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800  hover:bg-green-800 transition duration-300">
                                            <p class="text-2xl text-gray-400 dark:text-gray-500">Wallet</p>
                                        </div>
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