// import React from 'react'

// const EditProfileModal = (showEditProfileModal, handleChange, handleBlur, values, errors, touched, handleEditProfile, handleCloseEditProfileModal) => {
//     return (
//         <div>
//             {
//                 showEditProfileModal && (
//                     <div className="fixed z-50 inset-0 overflow-y-auto">
//                         <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
//                             <div className="fixed inset-0 transition-opacity">
//                                 <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
//                             </div>
//                             <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
//                             &#8203;
//                             <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
//                                 <div>
//                                     <div className="mt-3 text-center sm:mt-5">
//                                         <h3 className="text-lg leading-6 font-medium text-gray-900">Set Profile</h3>
//                                         <div className="mt-2">
//                                             <input
//                                                 className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                                                 id="firstName"
//                                                 type="text"
//                                                 name="firstName"
//                                                 onBlur={handleBlur}
//                                                 onChange={handleChange}
//                                                 value={values?.firstName}
//                                             />
//                                             {errors?.firstName && touched?.firstName ? (
//                                                 <p className="form-error text-red-500">{errors?.firstName}</p>
//                                             ) : null}
//                                         </div>
//                                         <div className="mt-2">
//                                             <input
//                                                 className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                                                 id="lastName"
//                                                 type="text"
//                                                 name="lastName"
//                                                 onBlur={handleBlur}
//                                                 onChange={handleChange}
//                                                 value={values?.lastName}
//                                             />
//                                             {errors?.lastName && touched?.lastName ? (
//                                                 <p className="form-error text-red-500">{errors?.lastName}</p>
//                                             ) : null}
//                                         </div>
//                                         <div className="mt-2">
//                                             <input
//                                                 className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                                                 id="userName"
//                                                 type="text"
//                                                 name="userName"
//                                                 onBlur={handleBlur}
//                                                 onChange={handleChange}
//                                                 value={values?.userName}
//                                             />
//                                             {errors?.userName && touched?.userName ? (
//                                                 <p className="form-error text-red-500">{errors?.userName}</p>
//                                             ) : null}
//                                         </div>
//                                         <div className="mt-2">
//                                             <input
//                                                 className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                                                 id="place"
//                                                 type="text"
//                                                 name="place"
//                                                 onBlur={handleBlur}
//                                                 onChange={handleChange}
//                                                 value={values?.place}
//                                             />
//                                             {errors?.place && touched?.place ? (
//                                                 <p className="form-error text-red-500">{errors?.place}</p>
//                                             ) : null}
//                                         </div>
//                                         <div className="mt-2">
//                                             <input
//                                                 className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                                                 id="place"
//                                                 type="text"
//                                                 name="place"
//                                                 onBlur={handleBlur}
//                                                 onChange={handleChange}
//                                                 value={values?.about}
//                                             />
//                                             {errors?.about && touched?.about ? (
//                                                 <p className="form-error text-red-500">{errors?.about}</p>
//                                             ) : null}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="mt-5 sm:mt-6">
//                                 <button
//                                     type="button"
//                                     className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
//                                     onClick={handleEditProfile}
//                                 >
//                                     Set
//                                 </button>
//                                 <button
//                                     type="button"
//                                     className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
//                                     onClick={handleCloseEditProfileModal}
//                                 >
//                                     Cancel
//                                 </button>
//                             </div>
//                         </div>
//                     </div>

//                 )
//             }
//         </div >
//     )
// }

// export default EditProfileModal

import React from 'react';

const EditProfileModal = ({
    showEditProfileModal,
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    handleEditProfile,
    handleCloseEditProfileModal,
}) => {
    return (
        <div>

            {showEditProfileModal && (
                <div className="fixed z-50 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
                        &#8203;
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <div>
                                <div className="mt-3 text-center sm:mt-5">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">Set Profile</h3>
                                    <div className="mt-2">
                                        <input
                                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="firstName"
                                            type="text"
                                            placeholder="First Name"
                                            name="firstName"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.firstName}
                                        />
                                        {errors.firstName && touched.firstName ? (
                                            <p className="form-error text-red-500">{errors.firstName}</p>
                                        ) : null}
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="lastName"
                                            type="text"
                                            placeholder="Last Name"
                                            name="lastName"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.lastName}
                                        />
                                        {errors.lastName && touched.lastName ? (
                                            <p className="form-error text-red-500">{errors.lastName}</p>
                                        ) : null}
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="userName"
                                            type="text"
                                            placeholder="Username"
                                            name="userName"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.userName}
                                        />
                                        {errors?.userName && touched.userName ? (
                                            <p className="form-error text-red-500">{errors.userName}</p>
                                        ) : null}
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="place"
                                            type="text"
                                            plcaeholder="Place"
                                            name="place"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.place}
                                        />
                                        {errors.place && touched.place ? (
                                            <p className="form-error text-red-500">{errors.place}</p>
                                        ) : null}
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="about"
                                            type="text"
                                            placeholder="About"
                                            name="about"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.about}
                                        />
                                        {errors.about && touched.about ? (
                                            <p className="form-error text-red-500">{errors.about}</p>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-6 flex justify-between">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
                                        onClick={handleEditProfile}
                                    >
                                        Set
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                                        onClick={handleCloseEditProfileModal}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditProfileModal;
