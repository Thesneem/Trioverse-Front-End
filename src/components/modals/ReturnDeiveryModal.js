import React from 'react'
import { returnDeliverySchema } from '../../formSchemas/returnDeliverySchema'
import { BASE_URL } from '../../config'
import { useFormik } from 'formik'
import axios from 'axios'

const ReturnDeliveryModal = ({ showReturnModal, handleCloseReturnDeliveryModal, id, setShowReturnModal }) => {

    const { values, errors, touched, handleBlur, handleChange } =
        useFormik({
            initialValues: {
                returnMessage: ""
            },
            validationSchema: returnDeliverySchema,

        });
    //to do the delivery Return
    const handleReturnDelivery = async () => {
        try {
            console.log('testReturn', values)
            const response = await axios.post(`/returnDelivery/${id}`, values)
            console.log(response)
            setShowReturnModal(false)
            // fetchOrder()
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            {showReturnModal && (
                <div className="fixed z-50 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
                        &#8203;
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <div>
                                <div className="mt-3  sm:mt-5">
                                    <div className='text-center' >
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Return Delivery</h3>
                                    </div>
                                    <p>Are you sure You want to return? Please enter the return delivery reason</p>
                                    <div className="mt-2">
                                        <label htmlForm="returnMessage" className=" block text-sm font-medium text-gray-700">
                                            Return Message
                                        </label>
                                        <input
                                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="returnMessage"
                                            type="text"
                                            name="returnMessage"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.returnMessage}
                                        />
                                        {errors.returnMessage && touched.returnMessage ? (
                                            <p className="form-error text-red-500">{errors.returnMessage}</p>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-6">
                                <button
                                    type="button"
                                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
                                    onClick={handleReturnDelivery}
                                >
                                    Add
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                                    onClick={handleCloseReturnDeliveryModal}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )
            }
        </div >
    )
}

export default ReturnDeliveryModal