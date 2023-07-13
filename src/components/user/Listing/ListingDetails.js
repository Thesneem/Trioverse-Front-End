import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../../config'
import Reviews from './Reviews';
import AddReview from './AddReview';
import axios from 'axios'

const ListingDetails = ({ hasOrdered }) => {

    console.log('Means there is a finished order', hasOrdered)
    const { listing } = useSelector((state) => state.listing)
    console.log('hi redux', listing)
    const [currentImage, setCurrentImage] = useState("");


    const [reviews, setReviews] = useState([])
    const [averageRatings, setAverageRatings] = useState("0");
    const fetchReviews = async () => {
        try {
            const response = await axios.get(`/allReviews/${listing?._id}`)
            console.log('all reviews', response.data.reviews)
            if (response?.data?.reviews?.length > 0) {
                let avgRating = 0;
                response?.data?.reviews?.forEach(({ rating }) => (avgRating += rating));
                setAverageRatings((avgRating / response?.data?.reviews?.length).toFixed(1));

            }
            setReviews(response?.data?.reviews)
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleReviewAdded = (newReview) => {
        // Update the reviews state with the new review
        setReviews((prevReviews) => [...prevReviews, newReview]);

        // Recalculate average ratings
        let avgRating = 0;
        const updatedReviews = [...reviews, newReview];
        updatedReviews?.forEach(({ rating }) => (avgRating += rating));
        setAverageRatings((avgRating / updatedReviews?.length).toFixed(1));
    };

    useEffect(() => {
        fetchReviews()
    }, [listing])


    useEffect(() => {
        if (listing) {
            setCurrentImage(listing?.images[0]);
        }
    }, [listing]);


    return (
        <>
            {listing && (
                <div className="col-span-2 flex flex-col gap-3">
                    <h2 className="text-2xl font-bold text-[#404145] mb-1">
                        {listing?.listingTitle} Title
                    </h2>
                    <div className="flex items-center gap-2">
                        <div>

                            <img
                                src={`${BASE_URL}/public/uploads/profilepics/${listing?.seller_id?.profile_pic}`}
                                alt="profile"
                                height={50}
                                width={50}
                                className="rounded-full"
                            />


                        </div>
                        <div className="flex gap-2 items-center">
                            <h4 className="text-[#27272a] font-bold">
                                {listing?.seller_id?.firstName} {listing?.seller_id?.lastName}
                            </h4>
                            <h6 className="text-[#74767e]">
                                @{listing?.seller_id?.userName}
                            </h6>
                            <h6 className={`ml-8 ${listing?.listing_status === 'Available' ? 'text-green-500' : 'text-red-500'}`}>
                                This listing is currently {listing?.listing_status}
                            </h6>
                        </div>
                        {/* <div className="flex items-center gap-1">
                        <div className="flex">
                            Rating   {[1, 2, 3, 4, 5].map((star) => (
                                <FaStar
                                    key={star}
                                    className={`cursor-pointer ${Math.ceil(averageRatings) >= star
                                        ? "text-yellow-400"
                                        : "text-gray-300"
                                        }`}
                                />
                            ))}
                        </div>
                        <span className="text-yellow-500">
                            AverageRating {/* {averageRatings} 
                </span>
                <span className="text-[#27272a]">
                    No.ofReviews {/* ({gigData.reviews.length})</span>
                     </div> */}


                    </div >
                    <div className="flex flex-col gap-4">
                        <div className="max-h-[1000px] max-w-[1000px] overflow-hidden">
                            <img
                                src={`${BASE_URL}/public/uploads/listingImages/${currentImage}`}
                                alt="Listing"
                                height={1000}
                                width={1000}
                                className="hover:scale-110 transition-all duration-500"
                            />

                        </div>
                        <div className="flex gap-4 flex-wrap">

                            {listing?.images.map((image) => (
                                // <img
                                //     src={`${BASE_URL}/public/uploads/listingImages/${image}`}
                                //     alt="gig"
                                //     height={100}
                                //     width={100}
                                //     key={image}
                                //     onClick={() => setCurrentImage(image)}
                                //     className={`${currentImage === image ? "" : "blur - sm"
                                //         } cursor-pointer transition-all duration-500`}
                                // />
                                <div
                                    key={image}
                                    onClick={() => setCurrentImage(image)}
                                    className={`w-20 h-20 mr-2 ${currentImage === image ? "" : "blur-sm"}`}
                                >
                                    <img
                                        src={`${BASE_URL}/public/uploads/listingImages/${image}`}
                                        alt="gig"
                                        className="object-cover w-full h-full cursor-pointer transition-all duration-500"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-3xl my-5 font-medium text-[#404145]">
                            About this Listing
                        </h3>
                        <div>
                            <p>
                                {listing?.description}
                            </p>
                        </div>
                    </div>
                    {/* About the seller */}
                    <div className="">
                        <h3 className="text-3xl my-5 font-medium text-[#404145]">
                            About the Seller
                        </h3>
                        <div className="flex gap-4">
                            <div>
                                <img
                                    src={`${BASE_URL}/public/uploads/profilepics/${listing?.seller_id?.profile_pic}`}
                                    alt="profile"
                                    height={50}
                                    width={50}
                                    className="rounded-full"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="flex  gap-2 items-center">
                                    <h4 className="font-medium text-lg">
                                        {listing?.seller_id?.firstName} {listing?.seller_id?.lastName}
                                    </h4>
                                    <span className="text-[#74767e]">
                                        @{listing?.seller_id?.userName}
                                    </span>
                                </div>
                                <div>
                                    <p>
                                        {listing?.seller_id?.about}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Reviews reviews={reviews} averageRatings={averageRatings} />
                    {hasOrdered ? (< AddReview onReviewAdded={handleReviewAdded} />) : (null)}
                </div >
            )}
        </>
    )
}

export default ListingDetails