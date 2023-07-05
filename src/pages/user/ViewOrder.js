import React, { useEffect, useState } from 'react'
import Navbar from '../../components/user/Navbar'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import { BASE_URL } from '../../config'
import jwt_decode from 'jwt-decode';
import StartOrderModal from '../../components/modals/StartOrderModal'
import CountdownTimer from '../../components/user/CountdownTimer'



const ViewOrder = () => {
    const [order, setOrder] = useState('')
    const [showStartOrderModal, setShowStartOrderModal] = useState(false);


    // Retrieve the JWT token from local storage
    const token = localStorage.getItem('userToken');

    // Decode the JWT token
    const decodedToken = jwt_decode(token);
    const user = decodedToken.id
    // Access the decoded token payload
    console.log(typeof (user));

    //getting id passed as parameter 
    const { id } = useParams()
    console.log(id)

    const fetchOrder = async () => {
        try {
            const response = await axios.get(`/getOrder/${id}`, {
                'token': `Bearer ${localStorage.getItem('userToken')} `
            }, {
                credentials: true
            })
            console.log(response)
            setOrder(response.data.order)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchOrder()
    }, [])

    //to format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    //to determine the order status
    function orderStatus() {
        if (order?.order_Status?.canceled?.state) {
            return <span className='text-red-500 ml-2'>Canceled</span>
        }
        else if (order?.order_Status?.finished?.state) {
            return < span className='text-green-500 ml-2' > Finished</span >
        }
        else if (order?.order_Status?.started?.state) {
            return < span className='text-blue-500 ml-2' > Started</span >
        }
        else {
            return <span className='text-yellow-500 ml-2'>Created</span>
        }
    }

    const handleShowStartOrderModal = () => {
        setShowStartOrderModal(true)
    }
    const handleCloseStartOrderModal = () => {
        setShowStartOrderModal(false)
    }
    const handleStartOrder = async () => {
        try {
            const response = await axios.put(`/startOrder/${order._id}`)
            console.log(response)
            setShowStartOrderModal(false)
            fetchOrder()
        }
        catch (err) {
            console.log(err)
        }
    }

    const calculateTime = () => {
        if (order?.order_Status?.started) {
            const currentTime = Date.now();
            const elapsedTime = currentTime - new Date(order?.order_Status?.started?.date).getTime();
            const remainingTime = (order.selected_Package.delivery_Time * 24 * 60 * 60 * 1000) - elapsedTime;
            console.log(remainingTime)
            return remainingTime
        }
        return 0
    }
    // Store the calculated remaining time in a variable
    const remainingTime = calculateTime();

    return (
        <>
            <Navbar />
            {order && (
                <div className='h-screen mx-10 mt-2'>
                    <h1 className='bg-[#1DBF73] text-white text-2xl font-bold text-center py-2 px-4'>Order ({order?._id})</h1>
                    <div className='border p-10'>
                        <div className='flex gap-3'>
                            <p className='font-bold text-xl'>OrderNo <span className='ml-2'>{order?._id}</span></p>
                            <Link to={`/viewListing/${order?.listing_id?._id}`} > <span className='text-m text-blue-300'>View Listing</span></Link>
                            <span className='text-3xl ml-auto'>₹{order?.order_Price}</span>
                        </div>
                        <div className='flex gap-3'>
                            {order?.seller_id?._id === user ? (< p > Buyer: <span className='ml-2'>{order?.buyer_id?.userName}</span></p>) :
                                (< p > Seller:<span className='ml-2'>{order?.seller_id?.userName}</span></p>
                                )}
                            <span>Ordered on {formatDate(order?.order_Status?.created?.date)}</span>
                        </div>
                        <hr />
                        <h2 className='font-bold my-2'>Listing Details</h2>
                        <div className='mb-2 flex gap-3' >
                            <table style={{ borderCollapse: 'collapse', border: '1px solid black' }}>
                                <thead>
                                    <tr>
                                        <th style={{ border: '1px solid black', padding: '8px' }}>Ordered Package</th>
                                        <th style={{ border: '1px solid black', padding: '8px' }}>Deliverables</th>
                                        <th style={{ border: '1px solid black', padding: '8px' }}>Order Status</th>
                                        <th style={{ border: '1px solid black', padding: '8px' }}>Allowed Revisions</th>
                                        <th style={{ border: '1px solid black', padding: '8px' }}>Delivery days</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={{ border: '1px solid black', padding: '8px' }}>
                                            <span className='ml-2'>
                                                {order?.selected_Package?.package
                                                    .split('-')
                                                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                                                    .join(' ')}
                                            </span>
                                        </td>
                                        <td style={{ border: '1px solid black', padding: '8px' }}>
                                            <span className='ml-2'>{order?.selected_Package?.deliverables}</span>
                                        </td>
                                        <td style={{ border: '1px solid black', padding: '8px' }}>{orderStatus()}</td>
                                        <td style={{ border: '1px solid black', padding: '8px' }}>
                                            <span className='ml-2'>{order?.selected_Package?.revisions}</span>
                                        </td>
                                        <td style={{ border: '1px solid black', padding: '8px' }}>
                                            <span className='ml-2'>{order?.selected_Package?.delivery_Time}</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            {!order?.order_Status?.started?.state && (
                                <div className='ml-auto'>
                                    <button className='btn btn-success hover:bg-yellow-400 ' onClick={handleShowStartOrderModal}>Start working on the Order</button>
                                </div>
                            )}
                            {order?.order_Status?.started?.state && (
                                < div className='ml-auto'>
                                    {/* {remainingTime} */}
                                    <CountdownTimer totalTime={remainingTime} />
                                </div>
                            )}
                        </div>

                        <hr />
                        <div className='my-2 flex gap-3'>
                            <div>
                                <h2 className='font-bold'>Order Requirements</h2>
                                <p>"{order.listing_id.requirements}"</p>
                                <h2 className='font-bold'>Provided Data</h2>
                                <p>{order.order_requirements.requirements}</p>
                                {order.order_requirements.file && (
                                    <img src={`${BASE_URL}/public/uploads/profilepics/${order.order_requirements.file}`} alt="Order File" className='mb-2' />
                                )}
                            </div>
                            {/* if there is remaining time for delivery and status is not finished show deliver button else danger message */}
                            {!order?.order_Status?.finished?.state && remainingTime > 0 ? (
                                <div className='ml-auto'>
                                    <button className='btn btn-success hover:bg-yellow-400 ' >Deliver Order</button>
                                </div>
                            ) : (<div className="alert alert-error">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                <span>Attention: Failed to deliver order on time! Admin will take action</span>
                            </div>)}
                        </div>
                        <hr />
                        <StartOrderModal
                            showStartOrderModal={showStartOrderModal}
                            handleCloseStartOrderModal={handleCloseStartOrderModal}
                            handleStartOrder={handleStartOrder}
                        />
                    </div >

                </div >

            )}
        </>
    )
}

export default ViewOrder