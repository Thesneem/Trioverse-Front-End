import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { loginSchema } from '../../formSchemas/loginSchema'
import { ToastContainer, toast } from 'react-toastify'

import axios from 'axios'


const initialValues = {
    email: '',
    password: ''
}

const AdminLogin = () => {
    const navigate = useNavigate();
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues,
            validationSchema: loginSchema,
            onSubmit: async (values, action) => {
                console.log('Values', values)
                try {
                    const response = await axios.post(`/admin/login`, {
                        ...values,
                    }, {
                        credentials: true
                    },
                    )
                    console.log(response, 'hi')

                    localStorage.setItem('adminToken', response.data.adminToken)
                    toast.success(response.data.message, {
                        onClose: () => {
                            action.resetForm();
                            navigate('/admin/dashBoard');
                        }
                    })


                }
                catch (error) {
                    console.log('catchblock')
                    toast.error('Server error')
                    navigate('/admin')
                }

            },
        });
    // console.log(
    //     "errors",
    //     errors
    // );


    return (
        <div className='flex flex-col md:flex md:flex-row w-100 h-screen font-poppins lg:overflow-y-hidden' >

            <div className=' w-100  md:w-3/6 lg:w-2/5 bg-primary flex justify-center items-center py-3 md:py-0'>
                <div className="flex-col w-100">
                    {/* <img src="/login/login-banner.png" alt="login-banner" className='w-100 p-5' /> */}
                    <h2 className='text-center text-white font-semibold text-xl md:text-3xl lg:text-4xl leading-8 md:leading-10 font-poppins '>Freelancers at your fingertip</h2>
                    <p className=' font-medium text-white text-center py-2 text-sm md:text-lg'>Get your job dne by the experts</p>
                </div>
            </div>
            <div className='w-full md:w-3/6 lg:w-3/5 p-3  md:p-5'>
                <div className="flex flex-col justify-center items-center h-full">

                    <div className='w-full lg:w-3/6'>
                        <ToastContainer position="top-center" />
                        <h2 className='text-black font-medium text-2xl md:text-3xl py-5'>Admin Login</h2>
                        <form className='flex flex-col w-full items-start' onSubmit={handleSubmit}>
                            <div className='flex flex-col w-full py-3'>
                                <label htmlFor="email" className='py-3'>Email</label>
                                <input type="email" name='email' className='border-b-2 border-gray-200 focus:border-primary px-5 py-2 focus:outline-none' placeholder='Enter Email Address' values={values.email} onChange={handleChange} onBlur={handleBlur} />
                                {
                                    errors.email && touched.email ? (
                                        <p className='text-red-600 font-extralight text-md'>{errors.email}</p>
                                    )
                                        : null
                                }
                            </div>
                            <div className='flex flex-col w-full pb-5'>
                                <label htmlFor="password" className='py-3'>Password</label>
                                <input type="password" name='password' className='border-b-2 border-gray-200 focus:border-primary px-5 py-2 focus:outline-none' placeholder='Enter Password' values={values.password} onChange={handleChange} onBlur={handleBlur} />
                                {
                                    errors.password && touched.password ? (
                                        <p className='text-red-600 font-extralight text-md'>{errors.password}</p>
                                    )
                                        : null
                                }
                            </div>
                            <button className='w-full bg-darkPink py-3 px-5 text-dark font-semibold' type='submit'>Log In</button>
                        </form>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default AdminLogin