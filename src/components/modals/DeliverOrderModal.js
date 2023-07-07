import React from 'react';


const DeliverOrderModal = ({ showDeliverOrderModal, handleCloseDeliverOrderModal, values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => {

    console.log('ERRRS', errors)
    return (
        <div>
            {showDeliverOrderModal && (
                <div className="fixed z-50 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
                        &#8203;
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <div className="mt-3 sm:mt-5">
                                        <div className="text-center">
                                            <h3 className="text-lg leading-6 font-medium text-gray-900">Deliver Order</h3>
                                        </div>
                                        <p className="text-sm">Please make sure you're uploading the proper delivery file and message!</p>

                                        <div className="my-2">
                                            <label htmlFor="deliveryMessage" className="block text-sm font-medium text-gray-700">
                                                Delivery Message
                                            </label>
                                            <input
                                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="deliveryMessage"
                                                type="text"
                                                name="deliveryMessage" // Added the name attribute
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.deliveryMessage}
                                                placeholder="Enter a delivery message"
                                            />
                                            {errors.deliveryMessage && touched.deliveryMessage ? (
                                                <p className="form-error text-red-500">{errors.deliveryMessage}</p>
                                            ) : null}
                                        </div>
                                        <div>
                                            <input
                                                type="file"
                                                className="file-input file-input-bordered file-input-sm w-full max-w-xs"
                                                onChange={(e) => {
                                                    console.log('Hi');
                                                    setFieldValue('deliveryItem', e.target.files[0]); // Updated the field name
                                                    console.log(e.target.files);
                                                }}
                                                accept="image/jpeg, image/png, image/gif, image/jpg"
                                                name="deliveryItem"
                                                id="deliveryItem"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-6">
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
                                    >
                                        Deliver
                                    </button>

                                    <button
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                                        onClick={handleCloseDeliverOrderModal}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeliverOrderModal;
