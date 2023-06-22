import React, { useState } from 'react'
import { FiClock, FiRefreshCcw } from "react-icons/fi";
import { BiRightArrowAlt } from "react-icons/bi";
import { BsCheckLg } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import ChatModal from '../../modals/ChatModal'
import axios from 'axios'



const ListingPricing = () => {
    const navigate = useNavigate()
    const { listing } = useSelector((state) => state.listing)
    const { user } = useSelector((state) => state.user)
    console.log('hi redux', user)
    console.log('hi listing', listing)

    const [selectedPackage, setSelectedPackage] = useState('');
    const [showChatModal, setshowChatModal] = useState(false)
    const [receiver, setReceiver] = useState(null)
    const handlePackageSelect = (packageId) => {
        setSelectedPackage(packageId);
    };

    const handleContinue = (packageId, listingId) => {
        navigate('/addRequirements', { state: { packageId, listingId } })
    }

    const handleChatModal = (id) => {
        console.log('selerid', id)
        setReceiver(id)
        setshowChatModal(true)
    }
    const handleCloseChatModal = () => {
        setshowChatModal(false)

    }
    const handleCreateChat = async () => {
        try {
            const response = await axios.post(`/newchat`, {

                receiver_id: receiver


            }, {
                headers: {
                    'token': `Bearer ${localStorage.getItem('userToken')} `
                }
            },
                {
                    credentials: true
                })

            console.log('ChatResponse', response)

            navigate('/chatpage')
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            {listing && (
                <div className="sticky top-36 mb-10 h-max w-96">
                    <h2 className="bg-[#1DBF73] text-white text-center py-2 px-4">Compare Packages</h2>
                    {listing.packages.map((item) => (
                        <div className="border p-10" key={item._id}>
                            <label className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    value={item._id}
                                    checked={selectedPackage === item._id}
                                    onChange={() => handlePackageSelect(item._id)}
                                />
                                <span className="font-bold">
                                    {item.packageId.package.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}
                                </span>
                                <span className="ml-auto">${item.price}</span>
                            </label>
                            <p>{item.shortDesc}</p>
                            <p>{item.deliverables}</p>
                            <div>
                                <div className="text-[#62646a] font-semibold text-sm flex gap-6">
                                    <div className="flex items-center gap-2">
                                        <FiClock className="text-xl" />
                                        <span>{item.delivery_Time} Days Delivery</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FiRefreshCcw className="text-xl" />
                                        <span>{item.revisions} Revisions</span>
                                    </div>
                                </div>
                                <ul></ul>
                            </div>
                        </div>
                    ))}
                    {/* <button
                        className="flex items-center bg-[#26ac6d] text-white py-2 px-4 mt-4 font-bold text-lg rounded"
                        disabled={!selectedPackage}
                        onClick={handleContinue}
                    >
                        Continue
                    </button> */}

                    {listing.seller_id._id === user._id ? (
                        <button
                            className="flex items-center bg-[#1DBF73] text-white py-2 justify-center font-bold text-lg relative rounded w-full"
                        // onClick={() => router.push(`/seller/gigs/${gigData.id}`)}
                        >
                            <span>Edit</span>
                            <BiRightArrowAlt className="text-2xl absolute right-4" />
                        </button>
                    ) : (
                        <button
                            className="flex items-center bg-[#1DBF73] text-white py-2 justify-center font-bold text-lg relative rounded w-full"
                            // onClick={() => router.push(`/checkout?gigId=${gigData.id}`)}
                            disabled={!selectedPackage}
                            onClick={() => handleContinue(selectedPackage, listing._id)}
                        >
                            <span>Continue</span>
                            <BiRightArrowAlt className="text-2xl absolute right-4" />
                        </button>
                    )}

                    {listing.seller_id !== user._id && (
                        <div className="flex items-center justify-center mt-5">
                            <button className=" w-5/6 hover:bg-[#74767e] py-1 border border-[#74767e] px-5 text-[#6c6d75] hover:text-white transition-all duration-300 text-lg rounded font-bold"
                                onClick={() => handleChatModal(listing.seller_id._id)}
                            >
                                Contact Seller
                            </button>
                        </div>
                    )}
                </div >
            )}
            <div>
                <ChatModal
                    showChatModal={showChatModal}
                    handleCloseChatModal={handleCloseChatModal}
                    handleCreateChat={handleCreateChat}
                />
            </div>
        </>
    )

}

export default ListingPricing