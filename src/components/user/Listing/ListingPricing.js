
import React, { useState } from 'react';
import { FiClock, FiRefreshCcw } from 'react-icons/fi';
import { BiRightArrowAlt } from 'react-icons/bi';
import { BsCheckLg } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ChatModal from '../../modals/ChatModal';
import axios from 'axios';

const ListingPricing = ({ ActiveOrder }) => {
    console.log('testing order', ActiveOrder)
    const navigate = useNavigate();
    const { listing } = useSelector((state) => state.listing);
    const { user } = useSelector((state) => state.user);
    const [selectedPackage, setSelectedPackage] = useState('');
    const [showChatModal, setShowChatModal] = useState(false);
    const [receiver, setReceiver] = useState(null);

    const handlePackageSelect = (packageId) => {
        setSelectedPackage(packageId);
    };

    const handleContinue = (packageId, listingId) => {
        navigate('/addRequirements', { state: { packageId, listingId } });
    };

    const handleChatModal = (id) => {
        setReceiver(id);
        setShowChatModal(true);
    };

    const handleCloseChatModal = () => {
        setShowChatModal(false);
    };

    const handleCreateChat = async () => {
        try {
            const response = await axios.post(
                '/newchat',
                { receiver_id: receiver },
                {
                    headers: {
                        'token': `Bearer ${localStorage.getItem('userToken')}`,
                    },
                    credentials: true,
                }
            );
            console.log('ChatResponse', response);
            navigate('/chatpage');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            {listing && (
                <div className="sticky top-36 mb-10 h-max w-96">
                    <h2 className="bg-[#1DBF73] text-white text-center py-2 px-4">Select Any Package</h2>
                    {listing?.packages?.map((item) => (
                        <div className="border p-10" key={item?._id}>
                            {item?.packageId?.package === ActiveOrder[0]?.selected_Package?.package && !(ActiveOrder[0]?.order_Status?.finished?.state || ActiveOrder[0]?.order_Status?.canceled?.state) ? (
                                <div>
                                    <h1 className='mb-2 font-bold text-blue-700'>Already an order exist with below details</h1>
                                    <label className="flex items-center gap-3">
                                        <span className="font-bold">
                                            {ActiveOrder[0]?.selected_Package?.package
                                                .split('-')
                                                .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                                                .join(' ')}
                                        </span>
                                        <span className="ml-auto">${ActiveOrder[0].order_Price}</span>
                                    </label>
                                    <p>{ActiveOrder[0]?.selected_Package?.shortDesc}</p>
                                    <p>{ActiveOrder[0]?.selected_Package?.deliverables}</p>
                                    <div>
                                        <div className="text-[#62646a] font-semibold text-sm flex gap-6">
                                            <div className="flex items-center gap-2">
                                                <FiClock className="text-xl" />
                                                <span>{ActiveOrder[0]?.selected_Package?.delivery_Time} Days Delivery</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <FiRefreshCcw className="text-xl" />
                                                <span>{ActiveOrder[0]?.selected_Package?.revisions} Revisions</span>
                                            </div>
                                        </div>
                                        <ul></ul>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <label className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            value={item?._id}
                                            checked={selectedPackage === item?._id}
                                            onChange={() => handlePackageSelect(item?._id)}
                                        />
                                        <span className="font-bold">
                                            {item?.packageId?.package
                                                .split('-')
                                                .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                                                .join(' ')}
                                        </span>
                                        <span className="ml-auto">${item?.price}</span>
                                    </label>
                                    <p>{item?.shortDesc}</p>
                                    <p>{item?.deliverables}</p>
                                    <div>
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
                                        <ul></ul>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    {listing?.seller_id?._id === user?._id ? (
                        <button className="flex items-center bg-[#1DBF73] text-white py-2 justify-center font-bold text-lg relative rounded w-full">
                            <span>Edit</span>
                            <BiRightArrowAlt className="text-2xl absolute right-4" />
                        </button>
                    ) : null}
                    {listing?.seller_id?._id !== user._id && ((listing?.listing_status === 'Available' && ActiveOrder?.length === 0) || (ActiveOrder[0]?.order_Status?.finished?.state || ActiveOrder?.order_Status?.canceled?.state)) && (
                        <button
                            className="flex items-center bg-[#4e6158] text-white py-2 justify-center font-bold text-lg relative rounded w-full"
                            disabled={!selectedPackage}
                            onClick={() => handleContinue(selectedPackage, listing?._id)}
                        >
                            <span>Continue</span>
                            <BiRightArrowAlt className="text-2xl absolute right-4" />
                        </button>
                    )}


                    {listing?.seller_id !== user?._id && (
                        <div className="flex items-center justify-center mt-5">
                            <button
                                className="w-5/6 hover:bg-[rgb(116,118,126)] py-1 border border-[#74767e] px-5 text-[#6c6d75] hover:text-white transition-all duration-300 text-lg rounded font-bold"
                                onClick={() => handleChatModal(listing?.seller_id?._id)}
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
    );
};

export default ListingPricing;






