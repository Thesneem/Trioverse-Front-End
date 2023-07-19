import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { Toaster, toast } from 'react-hot-toast'
import axios from 'axios'

const initialValues = {
    otp: ''
}

const Otp = () => {

    const [showResendButton, setShowResendButton] = useState(false);
    const [resendTimer, setResendTimer] = useState(60);

    useEffect(() => {
        let timer = null;

        const startTimer = () => {
            timer = setInterval(() => {
                setResendTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        };

        const stopTimer = () => {
            clearInterval(timer);
        };

        if (resendTimer > 0) {
            startTimer();
        } else {
            setShowResendButton(true);
            stopTimer();
        }

        return () => {
            stopTimer();
        };
    }, [resendTimer]);

    const handleResendOTP = () => {
        // Perform the logic to resend the OTP
        // This can be an API call or any other method to resend the OTP
        axios.get('/resendOtp')
            .then(response => {
                console.log("Resending OTP...");

                setResendTimer(60); // Reset the timer
                setShowResendButton(false); // Hide the Resend button
            })
            .catch(error => {
                console.error("Error resending OTP:", error);
                toast.error(error)
                // Handle the error if necessary
            });

    }
    const navigate = useNavigate()
    const { values, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues,
            // validationSchema: signUpSchema,
            onSubmit: async (values, action) => {

                try {
                    const response = await axios.post(`/verifyOTP`, {
                        ...values,
                    }, {
                        credentials: true
                    })
                    console.log(response)
                    if (response.data.success) {
                        action.resetForm();
                        navigate('/login')
                    }
                    else {
                        toast.error(response.data.message)
                    }
                }
                catch (error) {
                    toast.error('Server Error')
                    navigate('/otp')
                }
            },
        });






    return (
        // component 

        <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12" style={{ backgroundImage: 'url(/office.jpg)' }} >
            <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                <div className="mx-auto flex w-full max-w-md flex-col space-y-8">
                    <div className="flex flex-col items-center justify-center text-center space-y-2">
                        <div className="font-semibold text-3xl">
                            <p> Verification</p>
                        </div>
                        <div className="flex flex-row text-sm font-medium text-gray-400">
                            <p>We have sent a code to your registered mobile</p>
                        </div>
                    </div>
                    <Toaster />

                    <div>
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col space-y-8">
                                <div className="mx-auto w-full max-w-xs">
                                    <div className="relative">
                                        <input
                                            className="w-full h-16 text-lg px-5 outline-none rounded-xl border border-gray-400 bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                            type="text"
                                            name="otp"
                                            id="otp"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.otp}
                                        />

                                    </div>
                                </div>

                                <div className="flex flex-col items-center">
                                    <div>
                                        <button
                                            type="submit"
                                            className="flex items-center justify-center w-48 border rounded-xl outline-none py-3 bg-blue-700 border-none text-white text-sm shadow-sm"
                                        >
                                            Verify Mobile Number
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                                        <p>Didn't receive the code?</p>{" "}
                                        {/* <span
                                            className="flex items-center text-blue-600"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Resend
                                        </span> */}

                                        {showResendButton ? (
                                            <div>
                                                {/* Resend button */}
                                                <button
                                                    type="button"
                                                    className="flex items-center text-blue-600"
                                                    onClick={handleResendOTP}
                                                >
                                                    Resend OTP
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                                                <p>Resend in: {resendTimer} seconds</p>
                                            </div>

                                        )}
                                    </div>
                                </div>
                            </div>
                        </form>


                    </div>

                </div >
            </div >
        </div >

    )
}
export default Otp