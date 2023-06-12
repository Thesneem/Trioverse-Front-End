import axios from "axios";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/user/Navbar";
import { BASE_URL } from '../../config'
import { HiEye, HiPencilSquare, HiTrash } from "react-icons/hi2";



const SellerListings = () => {
    const [listings, setListings] = useState([]);

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


    return (
        <div>
            <Navbar />
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
                                    <span className="">Actions</span>
                                </th>

                            </tr>

                        </thead>
                        <tbody>
                            {listings &&
                                listings.map((listing, index) => {
                                    return (
                                        <tr
                                            className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
                                            key={listing._id}
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
                                                        <div className="font-bold"> {listing.listingTitle}</div>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4">{listing.category.categoryId.category}</td>
                                            <td className="px-6 py-4">{listing.description}</td>
                                            <td className="px-6 py-4">{listing.created_At}</td>
                                            <td className="px-6 py-4 flex items-center space-x-3">
                                                <button className="btn-icon"  >
                                                    <Link to={`/viewListing/${listing._id}`}> <HiEye /></Link>
                                                </button>
                                                <button className="btn-icon"  >
                                                    <HiPencilSquare />
                                                </button>

                                                <button className="btn-icon"  >
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
        </div >
    )
}

export default SellerListings