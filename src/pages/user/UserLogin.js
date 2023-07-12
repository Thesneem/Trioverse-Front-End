import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { loginSchema } from '../../formSchemas/loginSchema'
import axios from 'axios'
//import { ToastContainer, toast } from 'react-toastify'
import toast, { Toaster } from 'react-hot-toast';


const initialValues = {
    email: '',
    password: ''
}

const UserLogin = () => {

    const navigate = useNavigate();
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues,
            validationSchema: loginSchema,
            onSubmit: async (values, action) => {
                try {
                    const response = await axios.post(`/login`, {
                        ...values,
                    }, {
                        credentials: true
                    })

                    if (response.data.success) {
                        localStorage.setItem('userToken', response.data.userToken)
                        action.resetForm();
                        if (response.data.profileStat !== true) {
                            navigate('/overview')
                        } else {
                            navigate('/')
                        }

                    }
                    else {
                        toast.error(response.data.message)
                    }

                }
                catch (err) {
                    console.log(err)
                    toast.error('Server Error')
                }
            },
        });


    return (
        <div className="flex flex-col items-center justify-center min-h-screen" style={{ backgroundImage: 'url(/office.jpg)' }}>
            <div className="max-w-md w-full bg-white p-8 rounded shadow">
                <h2 className="text-2xl font-bold mb-6">Login</h2>


                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <Toaster />
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                        />
                        {errors.email && touched.email ? (
                            <p className="form-error text-red-500">{errors.email}</p>
                        ) : null}
                    </div>
                    <div className="mb-4">
                        <div className="flex justify-between">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <Link to='/forgotPassword' className="text-blue-500">Forgot Password?</Link>
                        </div>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                        />
                        {errors.password && touched.password ? (
                            <p className="form-error text-red-500">{errors.password}</p>
                        ) : null}
                    </div>
                    <div className="flex items-center">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Sign In
                        </button>
                    </div>
                    <p>
                        Don't have an Account?<Link to="/signup" className="text-blue-500">Sign up Here</Link>
                    </p>
                </form>

            </div >
        </div >

    )
}

export default UserLogin