import React from 'react'
import { useSelector } from 'react-redux';
import { FiClock, FiRefreshCcw } from "react-icons/fi";
import { BiRightArrowAlt } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';

const SelectedDetails = ({ selectedPackage }) => {
    const navigate = useNavigate()
    const { listing } = useSelector((state) => state.listing)
    console.log('listing exisits', listing)
    const item = listing.packages.find((data) => data._id === selectedPackage)
    console.log('this is item', item)

    const handleProceedPayment = () => {
        console.log('nhjhj')
        navigate('/checkout')
    }

    return (
        <>
            {listing && selectedPackage &&
                <div className="sticky top-36 mb-10 h-max w-96 mt-4">
                    <h2 className="bg-[#1DBF73] text-white text-center py-2 px-4">Selected Package</h2>
                    <div className="border p-10">
                        <label className="flex items-center gap-3">
                            <span className="font-bold">

                                {item?.packageId?.package?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}
                            </span>
                            <span className="ml-auto">${item?.price}</span>
                        </label>
                        <p>{item?.shortDesc}</p>
                        <p>{item?.deliverables}</p>
                        <div className="text-[#62646a] font-semibold text-sm flex gap-6">
                            <div className="flex items-center gap-2">
                                <FiClock className="text-xl" />
                                <span>{item?.delivery_Time} Days Delivery</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FiRefreshCcw className="text-xl" />
                                <span>{item?.revisions} Revisions</span>
                            </div>
                        </div>
                    </div>
                    <button
                        className="flex items-center bg-[#1DBF73] text-white py-2 justify-center font-bold text-lg relative rounded w-full"
                        // onClick={() => router.push(`/seller/gigs/${gigData.id}`)}
                        onClick={() => handleProceedPayment()}
                    >
                        <span>Proceed to Payment</span>
                        <BiRightArrowAlt className="text-2xl absolute right-4" />
                    </button>

                </div>
            }
        </>
    )
}

export default SelectedDetails