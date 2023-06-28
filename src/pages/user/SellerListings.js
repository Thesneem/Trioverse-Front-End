import axios from "axios";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/user/Navbar";
import { BASE_URL } from '../../config'
import { HiEye, HiPencilSquare, HiTrash } from "react-icons/hi2";
import BlockModal from "../../components/modals/BlockModal";



const SellerListings = () => {
    const [listings, setListings] = useState([]);
    const [selectedListing, setSelectedListing] = useState(null)
    const [showBlockModal, setShowBlockModal] = useState(false)

    const handleShowBlockModal = (id) => {
        setSelectedListing(id)
        setShowBlockModal(true)
    }

    const handleCloseBlockModal = () => {
        setShowBlockModal(false)
    }

    const handleBlockItem = async () => {
        console.log(selectedListing)
        const response = await axios.post(`/changeListingStatus/${selectedListing}`, {
            headers: {
                'token': `Bearer ${localStorage.getItem('userToken')}`

            }
        })
        setSelectedListing(null)
        setShowBlockModal(false)
        console.log(response)
        fetchSellerListings()
    }

    const fetchSellerListings = async () => {
        const response = await axios.get(`/getSellerListings`, {
            headers: {
                'token': `Bearer ${localStorage.getItem('userToken')} `
            }
        }, { credentials: true }
        )
        console.log('Listings', response.data.listings)
        setListings(response.data.listings)
    }


    useEffect(() => {
        fetchSellerListings()

    }, []);


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <>
            <Navbar />
            {listings?.length ? (
                <div className="min-h-[80vh] my-10 mt-0 px-32">

                    <h3 className="m-5 text-2xl font-semibold">All your Gigs</h3>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        No.
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Listing Title
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Category
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-center" >
                                        Decsription
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Created At
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <span className="">Actions</span>
                                    </th>

                                </tr>

                            </thead>
                            <tbody>
                                {listings &&
                                    listings?.map((listing, index) => {
                                        return (
                                            <tr
                                                className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
                                                key={listing?._id}
                                            >
                                                <td className="px-6 py-4">{index + 1}</td>
                                                <td>
                                                    <div className="flex items-center space-x-3">
                                                        <div className="avatar">
                                                            <div className="mask mask-squircle w-12 h-12">
                                                                <img src={`${BASE_URL}/public/uploads/listingImages/${listing?.coverImage}`} alt="Avatar" />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="font-bold"> {listing?.listingTitle}</div>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">{listing?.category?.categoryId?.category}</td>
                                                <td className="px-6 py-4">{listing?.description}</td>
                                                <td className="px-6 py-4">{formatDate(listing?.created_At)}</td>
                                                <td className={`px-6 py-4 ${listing?.listing_status === 'Available' ? 'text-green-500' : 'text-red-500'}`}>{listing?.listing_status}</td>
                                                < td className="px-6 py-4 flex items-center space-x-3">
                                                    <button className="btn-icon" title="View Listing" >
                                                        <Link to={`/viewListing/${listing?._id}`}> <HiEye /></Link>
                                                    </button>
                                                    <button className="btn-icon" title='Change Status' onClick={() => handleShowBlockModal(listing?._id)} >
                                                        <HiPencilSquare />
                                                    </button>

                                                    <button className="btn-icon" title='Delete'  >
                                                        < HiTrash />
                                                    </button>

                                                </td>


                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>

                    </div>

                </div >
            ) : (
                <div className="min-h-[80vh] my-10 mt-0 px-32 items-center text-center">
                    <h1 className="m-5 text-4xl font-bold">Sorry, you don't have any listings.
                        <br />Create your listings </h1>
                    <Link to='/sellerprofile'><button className='btn btn-success hover:btn-warning'>Go to seller Profile</button></Link>
                </div >
            )
            }

            <BlockModal
                showBlockModal={showBlockModal}
                handleCloseBlockModal={handleCloseBlockModal}
                handleBlockItem={handleBlockItem}
            />


        </>


    )
}

export default SellerListings