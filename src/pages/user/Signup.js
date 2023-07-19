import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { signUpSchema } from '../../formSchemas/signUpSchema'
import axios from 'axios'
import { Toaster, toast } from 'react-hot-toast'


const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    password: '',
    confirm_password: ''
}

const Signup = () => {
    const navigate = useNavigate();
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues,
            validationSchema: signUpSchema,
            onSubmit: async (values, action) => {

                try {
                    const response = await axios.post(`/signup`, {
                        ...values,
                    }, {
                        credentials: true
                    })
                    console.log(response)
                    if (response.data.success) {
                        action.resetForm();
                        navigate('/otp')
                    }
                    else {
                        toast.error(response.data.message)
                    }
                }
                catch (error) {
                    toast.error('Server Error')
                    navigate('/signup')
                }
            },
        });



    return (
        <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/office.jpg)' }}>
            <div className="flex flex-col items-center justify-center min-h-screen bg-black bg-opacity-50">
                <div className="max-w-3xl p-8 mx-auto bg-white rounded-lg shadow-lg">
                    <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">Sign Up</h2>
                    <form onSubmit={handleSubmit}>

                        <Toaster />
                        <div className="mb-4 flex space-x-4">
                            <div className="w-1/2">
                                <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-600">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.firstName}
                                    className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                                {errors.firstName && touched.firstName ? (
                                    <p className="form-error text-red-500">{errors.firstName}</p>
                                ) : null}
                            </div>
                            <div className="w-1/2">
                                <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-600">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.lastName}
                                    className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                                {errors.lastName && touched.lastName ? (
                                    <p className="form-error text-red-500">{errors.lastName}</p>
                                ) : null}
                            </div>
                        </div>




                        {/*  */}

                        <div className="mb-4">
                            <label htmlFor="mobile" className="block mb-2 text-sm font-medium text-gray-600">Mobile</label>
                            <input type="number" id="mobile" name="mobile" onBlur={handleBlur} onChange={handleChange} value={values.mobile} className=" w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                            {errors.mobile && touched.mobile ? (
                                <p className="form-error text-red-500">{errors.mobile}</p>
                            ) : null}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-600">Email</label>
                            <input type="email" id="email" name="email" onBlur={handleBlur} onChange={handleChange} value={values.email} className=" w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                            {errors.email && touched.email ? (
                                <p className="form-error text-red-500">{errors.email}</p>
                            ) : null}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-600">Password</label>
                            <input type="password" id="password" name="password" onBlur={handleBlur} onChange={handleChange} value={values.password} className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                            {errors.password && touched.password ? (
                                <p className="form-error text-red-500">{errors.password}</p>
                            ) : null}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-600">Confirm Password</label>
                            <input type="password" id="confirm_password" name="confirm_password" onBlur={handleBlur} onChange={handleChange} value={values.confirm_password} className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                            {errors.confirm_password && touched.confirm_password ? (
                                <p className="form-error text-red-500">{errors.confirm_password}</p>
                            ) : null}
                        </div>

                        <button type="submit" className="w-full py-2 mt-4 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Sign Up</button>
                        <span>
                            Already have an Account?<Link to='/login' className='text-blue-500'>Login Here</Link>
                        </span>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default Signup