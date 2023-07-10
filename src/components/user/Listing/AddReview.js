import React, { useState, useEffect } from 'react'
import { FaStar } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'
import { useSelector } from 'react-redux';
import { useFormik } from 'formik'
import { reviewSchema } from '../../../formSchemas/reviewSchema';

const initialValues = {
    review: '',
    rating: 0
}
const AddReview = ({ onReviewAdded }) => {
    const [showAddReview, setShowAddReview] = useState(false)
    const { listing } = useSelector((state) => state.listing)
    console.log('llllll', listing)
    const { values, errors, touched, handleBlur, handleChange, setFieldValue } =
        useFormik({
            initialValues,
            validationSchema: reviewSchema,

        });

    const addReview = async () => {
        try {
            const response = await axios.post(`/addReview/${listing?._id}`, { ...values }, {
                headers: {
                    'token': `Bearer ${localStorage.getItem('userToken')} `
                }

            },
                {
                    credentials: true
                })
            console.log('addedddreview', response)
            // Call the onReviewAdded function with the new review
            onReviewAdded(response.data.newReview);

            setShowAddReview(false)
            toast.success('Review Added successfully')

        }
        catch (err) {
            console.log(err)
            toast.error('Something went wrong, Please try later')
        }
    }

    //we are checking if there is already exist a review by the current user, if so do not show add review part
    const checkReviewExist = async () => {
        try {
            const response = await axios.get(`/isReviewExist/${listing?._id}`, {
                headers: {
                    'token': `Bearer ${localStorage.getItem('userToken')} `
                }
            }, {
                credentials: true
            })
            console.log('checkreviewExist', response)
            if (response.data.ReviewExist === true) {
                setShowAddReview(false)
            }
            else {
                setShowAddReview(true)
            }

        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        checkReviewExist()
    }, [listing, showAddReview])

    return (
        <>
            {
                showAddReview && (
                    < div className="mb-10" >
                        <Toaster />
                        <h3 className="text-2xl my-5 font-normal   text-[#404145]">
                            Give a Review
                        </h3>
                        <div className="flex  flex-col  items-start justify-start gap-3">
                            <textarea
                                name="review"
                                id="review"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.review}
                                className="block p-2.5 w-4/6 text-sm text-gray-900 bg-gray-50 rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                                placeholder="Add Review"
                                required
                            />
                            {errors.review && touched.review ? (
                                <p className="form-error text-red-500">{errors.review}</p>
                            ) : null}
                            {/* </textarea> */}

                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((num) => (
                                    <FaStar
                                        key={num}
                                        className={`cursor-pointer ${values.rating >= num ? "text-yellow-400" : "text-gray-300"
                                            }`}
                                        onClick={() => setFieldValue(
                                            'rating', num
                                        )}
                                    />
                                ))}
                            </div>
                            <button
                                className="flex items-center bg-[#1DBF73] text-white py-2 justify-center text-md relative rounded px-5"
                                onClick={addReview}
                            >
                                Add Review
                            </button>
                        </div>
                    </div >
                )
            }
        </>
    )
}

export default AddReview