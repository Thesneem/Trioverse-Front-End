import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/admin/shared/Sidebar'
import Header from '../../components/admin/shared/Header'
import axios from 'axios'
import { BASE_URL } from '../../config'
import { Link } from 'react-router-dom'
import ApproveModal from '../../components/modals/ApproveModal'
import RejectModal from '../../components/modals/RejectModal'
import { rejectSchema } from '../../formSchemas/rejectSchema'
import { useFormik } from 'formik'


const initialValues = {
    reason: ""
}

const Sellers = () => {
    const [sellers, setSellers] = useState([]);
    const [selectedSeller, setSelectedSeller] = useState(null)
    const [showApproveModal, setShowApproveModal] = useState(false)
    const [showRejectModal, setShowRejectModal] = useState(false)

    const handleShowApproveModal = (id) => {
        setSelectedSeller(id)
        setShowApproveModal(true)
    }
    const handleCloseApproveModal = () => {
        setShowApproveModal(false)
    }
    const handleApproval = async () => {
        console.log(selectedSeller)
        const response = await axios.post(`/admin/approveSeller/${selectedSeller}`, {
            headers: {
                'token': `Bearer ${localStorage.getItem('adminToken')}`

            }
        })
        setSelectedSeller(null)
        setShowApproveModal(false)
        console.log(response)
        fetchSellers()
    }

    const handleShowRejectModal = (id) => {
        setSelectedSeller(id)
        setShowRejectModal(true)
    }
    const handleCloseRejectModal = () => {
        // values.reason=''
        setShowRejectModal(false)
    }
    const handleRejection = async () => {
        console.log(selectedSeller)
        const response = await axios.post(`/admin/rejectSeller/${selectedSeller}`, {
            headers: {
                'token': `Bearer ${localStorage.getItem('adminToken')}`

            }
        })
        setSelectedSeller(null)
        setShowRejectModal(false)
        console.log(response)
        fetchSellers()
    }

    const { values, errors, touched, handleBlur, handleChange } =
        useFormik({
            initialValues,
            validationSchema: rejectSchema,
        });


    const fetchSellers = async () => {
        try {
            const response = await axios.get(`/admin/sellers`, {
                headers: {
                    'token': `Bearer ${localStorage.getItem('adminToken')}`

                }
            });
            setSellers(response.data.sellers);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {

        fetchSellers();
    }, []);


    return (
        <div>
            <div>
                <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
                    <Sidebar />
                    <div className="flex flex-col flex-1">
                        <Header />

                        <h1 className="text-3xl font-bold mt-8 ml-4">Sellers</h1>
                        <div className="overflow-x-auto w-full my-10">

                            <table className="table w-full">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>
                                            #
                                        </th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Qualification</th>
                                        <th>ID Proof</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                        <th>Remarks</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sellers.map((seller, index) => (

                                        < tr key={seller._id} >
                                            <td>
                                                {index + 1}
                                            </td>
                                            <td>
                                                <div className="flex items-center space-x-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle w-12 h-12">
                                                            <img src={`${BASE_URL}/public/uploads/profilepics/${seller?.profile_pic}`} alt='Avatar' />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold">{seller.firstName + ' ' + seller.lastName}</div>
                                                        {/* <div className="text-sm opacity-50">United States</div> */}
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                {seller.email}
                                                <br />
                                                {/* <span className="badge badge-ghost badge-sm">Desktop Support Technician</span> */}
                                            </td>
                                            <td>{seller.education}</td>


                                            <td> <Link to={`${BASE_URL}/public/files/IDproofs/${seller?.idProof}`} > Id Proof</Link></td>
                                            <td className='text-green-500'>
                                                {/* {seller?.sellerProfileStatus?.approved.state ? 'Approved' : 'Reject'} */}
                                                {seller.sellerProfileStatus.rejected.state ? (
                                                    <span>Rejected</span>
                                                ) : seller.sellerProfileStatus.approved.state ? (
                                                    <span>Approved</span>
                                                ) : seller.sellerProfileStatus.pending_Approval.state ? (
                                                    <span>Pending Approval</span>
                                                ) : null}

                                            </td>

                                            {/* < th className='flex justify-between'>
                                                < button className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"

                                                    onClick={() => { handleShowApproveModal(seller._id) }}
                                                > Approve</button>

                                                < button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"

                                                    onClick={() => { handleShowRejectModal(seller._id) }}
                                                > Reject</button>
                                            </th> */}
                                            <th className='flex justify-between'>
                                                {seller.sellerProfileStatus.pending_Approval.state &&
                                                    !(seller.sellerProfileStatus.approved.state || seller.sellerProfileStatus.rejected.state) ? (
                                                    <>
                                                        <button
                                                            className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
                                                            onClick={() => { handleShowApproveModal(seller._id) }}
                                                        >
                                                            Approve
                                                        </button>
                                                        {/* <button
                                                            className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
                                                            onClick={() => { handleShowRejectModal(seller._id) }}
                                                        >
                                                            Reject
                                                        </button> */}
                                                    </>
                                                ) : 'Processed'}
                                            </th>
                                            {seller.sellerProfileStatus.rejected.state &&
                                                <td>{seller.sellerProfileStatus.rejected.reason}</td>
                                            }
                                        </tr>
                                    ))
                                    }
                                </tbody>
                            </table >
                        </div >
                        <div>
                            {/* modal */}
                            <ApproveModal
                                showApproveModal={showApproveModal}
                                handleCloseApproveModal={handleCloseApproveModal}
                                handleApproval={handleApproval} />

                            <RejectModal
                                showRejectModal={showRejectModal}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                errors={errors}
                                values={values}
                                touched={touched}
                                handleRejection={handleRejection}
                                handleCloseRejectModal={handleCloseRejectModal}
                            />
                        </div>



                    </div >
                </div >
            </div >
        </div >
    )
}

export default Sellers