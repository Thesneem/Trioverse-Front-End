import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../../config'
import Navbar from '../../components/user/Navbar'
import { BsXCircleFill } from "react-icons/bs";
import { useFormik } from 'formik'
import { profileUpdateSchema } from '../../formSchemas/profileUpdateSchema'
import { useSelector, useDispatch } from 'react-redux'
import { setUserDetails } from '../../redux/userSlice';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'



const Profile = () => {
    const { user } = useSelector((state) => state.user)
    console.log('hi redux', user)
    const dispatch = useDispatch()

    const [imageHover, setImageHover] = useState(false);
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

    useEffect(() => {
        console.log('TESTINGUSEEFFECT')
        fetchProfile()
        setIsLoaded(true)
    }, [dispatch])

    // const initialValues = {
    //     firstName: `${user.firstName}`,
    //     lastName: `${user.lastName}`,
    //     userName: `${user.userName} ` ? `${user.userName} ` : '',
    //     place: `${user.place} ` ? `${user.place} ` : '',
    //     about: `${user.about} ` ? `${user.about} ` : '',
    // }
    // const initialValues = {
    //     firstName: user && `${user.email} `,

    //     lastName: user ? user.lastName : '',
    //     userName: user ? user.userName : '',
    //     place: user ? user.place : '',
    //     about: user ? user.about : '',
    // }
    const initialValues = {
        firstName: user?.firstName ?? "",
        lastName: user?.lastName ?? "",
        userName: user?.userName ?? "",
        place: user?.place ?? "",
        about: user?.about ?? "",
    };

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues,
            validationSchema: profileUpdateSchema,
            onSubmit: async (values, action) => {

                try {
                    console.log('EDITAXIOS')
                    console.log('testUserdata', user.firstName)
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
            },
        });


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


    const inputClassName =
        "block p-4 w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:ring-blue-500 focus:border-blue-500";
    const labelClassName =
        "mb-2 text-lg font-medium text-gray-900  dark:text-white";

    return (

        <>
            {isLoaded && (
                <div>
                    <Navbar />
                    <div className="flex flex-col items-center justify-start min-h-[80vh] gap-3">

                        <h2 className="text-3xl">Welocme to Trioverse</h2>
                        <h4 className="text-xl">
                            Please complete your profile to get started
                        </h4>
                        <Toaster />
                        <div className="flex flex-col items-center w-full gap-5">
                            <div
                                className="flex flex-col items-center cursor-pointer"
                                onMouseEnter={() => setImageHover(true)}
                                onMouseLeave={() => setImageHover(false)}
                            >
                                <label className={labelClassName} htmlFor="">
                                    Select a profile Picture
                                </label>
                                <div className="bg-purple-500 h-36 w-36 flex items-center justify-center rounded-full relative" onClick={handleEditIconClick}>
                                    {user && `${user.profile_pic} ` ? (
                                        < img
                                            src={`${BASE_URL}/public/uploads/profilepics/${user.profile_pic}`}
                                            alt="profile"
                                            fill
                                            className="rounded-full"
                                        />) : (

                                        <span className="text-6xl text-white">
                                            {user && `${user.email} `}
                                        </span>
                                    )}
                                    <div
                                        className={`absolute bg - slate - 400 h - full w - full rounded - full flex items - center justify - center   transition - all duration - 100  ${imageHover ? "opacity-100" : "opacity-0"
                                            } `}
                                    >
                                        <span
                                            className={` flex items - center justify - center  relative`}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-12 h-12 text-white absolute"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            {/* <input
                                                type="file"
                                                // onChange={handleFile}
                                                className="opacity-0"
                                                multiple={true}
                                                name="profileImage"
                                            /> */}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <p className={labelClassName} > {user && `${user.email} `}</p>
                                    <p className={labelClassName} > {user && `${user.mobile} `}</p>
                                </div>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="flex gap-12 w-[500px]">
                                    <div>
                                        <label className={labelClassName} htmlFor="firstName">
                                            First Name
                                        </label>
                                        <input
                                            className={inputClassName}
                                            type="text"
                                            name="firstName"
                                            id="firstName"
                                            onBlur={handleBlur}
                                            placeholder="First Name"
                                            value={values.firstName}
                                            onChange={handleChange}
                                        />
                                        {errors.firstName && touched.firstName ? (
                                            <p className="form-error text-red-500">{errors.firstName}</p>
                                        ) : null}
                                    </div>


                                    <div>
                                        <label className={labelClassName} htmlFor="lastName" >
                                            Last Name
                                        </label>
                                        <input
                                            className={inputClassName}
                                            type="text"
                                            name="lastName"
                                            onBlur={handleBlur}
                                            id="lastName"
                                            placeholder="Last Name"
                                            value={values.lastName}
                                            onChange={handleChange}
                                        />
                                        {errors.lastName && touched.lastName ? (
                                            <p className="form-error text-red-500">{errors.lastName}</p>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="flex gap-12 w-[500px]">
                                    <div>
                                        <label className={labelClassName} htmlFor="userName">
                                            Please select a username
                                        </label>
                                        <input
                                            className={inputClassName}
                                            type="text"
                                            name="userName"
                                            onBlur={handleBlur}
                                            id="userName"
                                            placeholder="Username"
                                            value={values.userName}
                                            onChange={handleChange}
                                        />
                                        {errors.userName && touched.userName ? (
                                            <p className="form-error text-red-500">{errors.userName}</p>
                                        ) : null}
                                    </div>

                                    <div>
                                        <label className={labelClassName} htmlFor="place" >
                                            Please enter your state/place
                                        </label>
                                        <input
                                            className={inputClassName}
                                            type="text"
                                            name="place"
                                            onBlur={handleBlur}
                                            id="place"
                                            placeholder="Place"
                                            value={values.place}
                                            onChange={handleChange}
                                        />
                                        {errors.place && touched.place ? (
                                            <p className="form-error text-red-500">{errors.place}</p>
                                        ) : null}
                                    </div>
                                </div>

                                <div className="flex flex-col w-[500px]">
                                    <label className={labelClassName} htmlFor="about">
                                        About
                                    </label>
                                    <textarea
                                        name="about"
                                        type='text'
                                        id="about"
                                        value={values.about}
                                        onChange={handleChange}
                                        className={inputClassName}
                                        onBlur={handleBlur}
                                        placeholder="About me"
                                    ></textarea>
                                    {errors.about && touched.about ? (
                                        <p className="form-error text-red-500">{errors.about}</p>
                                    ) : null}
                                </div>
                                <button
                                    className="border   text-lg font-semibold px-5 py-3   border-[#1DBF73] bg-[#1DBF73] text-white rounded-md"
                                    type="submit"

                                >
                                    Set Profile
                                </button>
                            </form>
                        </div>
                    </div>
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

                    )
                    }
                </div >
            )}

        </>


    )
}

export default Profile