import React from 'react'

const EditSubCategoryModal = ({ showEditSubCategoryModal, handleBlur, handleChange, values, errors, touched, handleEditSubCategory, handleCloseEditSubCategoryModal }) => {
    return (
        <div>
            {showEditSubCategoryModal && (
                <div className="fixed z-50 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
                        &#8203;
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <div className="text-center">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Edit SubCategory</h3>
                            </div>
                            <div className="mt-3 sm:mt-5">
                                <div>
                                    <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">Country</label>
                                    <div className="mt-2">
                                        <select id="category" name="category"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            autoComplete="country-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:text-sm sm:leading-6">
                                            <option value={values.category}>{values.category}</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="mt-2">
                                    <label htmlFor="subcategory" className="block text-sm font-medium leading-6 text-gray-900">Subcategory</label>

                                    <input
                                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="subcategory"
                                        type="text"
                                        name="subcategory"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.subcategory}
                                    />
                                    {errors.subcategory && touched.subcategory ? (
                                        <p className="form-error text-red-500">{errors.subcategory}</p>
                                    ) : null}
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-6">
                                <button
                                    type="button"
                                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
                                    onClick={handleEditSubCategory}
                                >
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                                    onClick={handleCloseEditSubCategoryModal}
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

export default EditSubCategoryModal