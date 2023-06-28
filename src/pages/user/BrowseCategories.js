import React, { useEffect, useState } from 'react'
import Navbar from '../../components/user/Navbar'
import axios from 'axios'
import { BASE_URL } from '../../config'
import { Link, useNavigate } from 'react-router-dom'
import { FcApproval, FcCancel } from "react-icons/fc";

const BrowseCategories = () => {
    const navigate = useNavigate()
    const [listings, setListings] = useState([])
    const fetchListings = async () => {
        try {
            const response = await axios.get(`/allListings`)
            console.log(response)
            setListings(response.data.listings)
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        fetchListings()
    }, [])

    const handleClick = (id) => {
        console.log('listing ID', id)
        navigate(`/viewListing/${id}`)
    }

    return (
        <>
            <Navbar />
            {listings && (
                <div className="mx-24 mb-24">

                    <h3 className="text-4xl mb-10">
                        Listings    {/* Results for <strong>{q}</strong> */}
                    </h3>

                    <div className="flex gap-4">
                        <button className="py-3 px-5 border border-gray-400 rounded-lg font-medium">
                            Category
                        </button>
                        <button className="py-3 px-5 border border-gray-400 rounded-lg font-medium">
                            Budget
                        </button>
                        <button className="py-3 px-5 border border-gray-400 rounded-lg font-medium">
                            Delivery Time
                        </button>
                    </div>
                    <div>
                        <div className="my-4">
                            <span className="text-[#74767e] font-medium ">
                                {listings?.length} services available
                            </span>
                        </div>
                        <div className="grid grid-cols-4">
                            {listings?.map((listing) => (
                                // <SearchGridItem gig={gig} key={gig.id} />

                                <div
                                    className="max-w-[300px] flex flex-col gap-2 p-1 cursor-pointer mb-8" onClick={() => handleClick(listing?._id)} >

                                    <div className="relative w-64 h-40 " >
                                        <img
                                            src={`${BASE_URL}/public/uploads/listingImages/${listing?.images[0]}`}
                                            alt="gig"
                                            fill
                                            className="rounded-xl"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div>
                                            {listing?.seller_id?.profile_pic &&
                                                < img
                                                    src={`${BASE_URL}/public/uploads/profilepics/${listing?.seller_id.profile_pic}`}
                                                    alt="profile"
                                                    height={30}
                                                    width={30}
                                                    className="rounded-full"
                                                />
                                            }
                                            {/* // ) : (
                                            //     <div className="bg-purple-500 h-7 w-7 flex items-center justify-center rounded-full relative">
                                            //         <span className="text-lg text-white">
                                            //             {gig.createdBy.email[0].toUpperCase()}
                                            //         </span>
                                            //     </div>
                                            // )} */}
                                        </div>
                                        <span className="text-md ">
                                            <strong className="font-medium">{listing?.seller_id.userName}</strong>
                                        </span>
                                        <span className="ml-auto">{listing?.listing_status === 'Available' ? <FcApproval /> : <FcCancel />}</span>
                                    </div>
                                    <div>
                                        <p className="line-clamp-2 text-[#404145]">{listing?.listingTitle}</p>
                                    </div>
                                    {/* <div className="flex items-center gap-1 text-yellow-400">
                                        <FaStar />
                                        <span>
                                            <strong className="font-medium">{calculateRatings()}</strong>
                                        </span>
                                        <span className="text-[#74767e]">({gig.reviews.length})</span>
                                    </div>
                                    <div> */}
                                    < strong className="font-medium" > From ${listing.packages[0].price}</strong>
                                </div>
                                // </div>
                            ))}
                        </div >
                    </div >

                </div >
            )}
        </>
    )
}

export default BrowseCategories