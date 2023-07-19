import React, { useEffect, useState, } from 'react'
import { useNavigate } from 'react-router-dom';
import { requirmentSchema } from '../../../formSchemas/requirmentSchema';
import { useFormik } from 'formik'
import { useSelector, useDispatch } from 'react-redux';
import { setRequirement, setFile } from '../../../redux/requirementsSlice';
import toast, { Toaster } from 'react-hot-toast'

const initialValues = {
    requirement: '',
    attachement: ''
}

const RequirementsAdd = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { listing } = useSelector((state) => state.listing)
    // const [requirements, setRequirements] = useState('')
    // const [file, setFile] = useState([])
    const requirements = useSelector((state) => state.requirement)
    const file = useSelector((state) => state.file)

    console.log("REQUIREMENTSS", requirements, file)

    const redirect = () => {
        if (!listing) {
            const storedListingId = sessionStorage.getItem('listingId');

            if (storedListingId) {
                navigate(`/viewListing/${storedListingId}`);

            } else {
                navigate('/home');
            }
        }
    };


    useEffect(() => {
        redirect()

    }, [])


    useEffect(() => {
        if (listing) {
            sessionStorage.setItem('listingId', listing._id);
        }
    }, [listing]);

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues,
        validationSchema: requirmentSchema,
        onSubmit: (values, action) => {
            dispatch(setRequirement(values.requirement));
            dispatch(setFile(values.attachement));
            toast.success('Requirements added')

        }

    })
    return (
        <>
            {listing &&
                <div className="col-span-2 flex flex-col mt-4 w-full">
                    <div className="h-fit bg-gray-200 border-1 border-gray-400 p-1 ">
                        <h1 className="bg-[#1DBF73] text-2xl text-white text-center p-1 rounded-xl">Seller needs below informations to start working</h1>
                        <p className="mt-2 ml-2 mb-3">{listing.requirements}</p>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <textarea name='requirement'
                                    placeholder="Add seller requested data"
                                    className="w-full textarea textarea-bordered"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.requirement}
                                    required>
                                </textarea>
                                {errors.requirement && touched.requirement ? (
                                    <p className="form-error text-red-500">{errors.requirement}</p>
                                ) : null}
                                <input type="file"
                                    className="file-input file-input-bordered file-input-xs w-full max-w-xs"
                                    accept='image/jpeg, image/png, image/gif, image/jpg'
                                    onChange={(e) => setFieldValue('attachement', e.target.files[0])}
                                />
                            </div>
                            <button type='submit' name='attachement' className="mt-2 px-3 py-2 w-1/5 bg-green-500 text-white rounded-2xl"> Submit</button>
                        </form>
                    </div>
                </div >


            }
        </>
    )
}

export default RequirementsAdd