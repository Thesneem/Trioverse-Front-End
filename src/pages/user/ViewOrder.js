import React, { useEffect, useState } from 'react'
import Navbar from '../../components/user/Navbar'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import { BASE_URL } from '../../config'
import jwt_decode from 'jwt-decode';
import StartOrderModal from '../../components/modals/StartOrderModal'
import CountdownTimer from '../../components/user/CountdownTimer'
import DeliverOrderModal from '../../components/modals/DeliverOrderModal'
import { useFormik } from 'formik'
import { deliverOrderSchema } from '../../formSchemas/deliverOrderSchema'
import { FiXSquare } from "react-icons/fi";

const initialValues = {
    deliveryMessage: '',
    deliveryItem: ''
}


const ViewOrder = () => {
    const [order, setOrder] = useState('')
    const [showStartOrderModal, setShowStartOrderModal] = useState(false);
    const [showDeliverOrderModal, setShowDeliverOrderModal] = useState(false)
    const [showImagePopup, setShowImagePopup] = useState(false)
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


    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         fetchOrder();
    //     }, 5000); // Polling interval of 5 seconds (adjust as needed)

    //     return () => {
    //         clearInterval(interval);
    //     };
    // }, []);

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
        else if (order?.order_Status?.returned?.state) {
            return < span className='text-orange-500 ml-2' > Returned</span >
        }
        else if (order?.order_Status?.delivered?.state) {
            return < span className='text-purple-500 ml-2' > Delivered</span >
        }
        else if (order?.order_Status?.started?.state) {
            return < span className='text-blue-500 ml-2' > Started</span >
        }
        else {
            return <span className='text-yellow-500 ml-2'>Created</span>
        }
    }

    //start order modal 
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

    //below function calculates the time to be show in the countdown timer componenet
    const calculateTime = () => {
        if (order?.order_Status?.started) {
            const currentTime = Date.now();
            const elapsedTime = currentTime - new Date(order?.order_Status?.started?.date).getTime();
            const remainingTime = (order?.selected_Package?.delivery_Time * 24 * 60 * 60 * 1000) - elapsedTime;
            console.log(remainingTime)
            return remainingTime
        }
        return 0
    }
    // Store the calculated remaining time in a variable, so that it can be used furthur
    const remainingTime = calculateTime();

    //deliver order modal operations

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
        useFormik({
            initialValues,
            validationSchema: deliverOrderSchema,
            onSubmit: async (values, action) => {
                try {
                    console.log('TESTTT')
                    const response = await axios.post(`/deliverOrder/${order?._id}`, values, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            'token': `Bearer ${localStorage.getItem('userToken')} `
                        }
                    })
                    console.log(response)
                    setShowDeliverOrderModal(false)
                    fetchOrder()
                }
                catch (err) {
                    console.log(err)
                }
            }
        });

    const handleShowDeliverOrderModal = () => {

        setShowDeliverOrderModal(true)
    }
    const handleCloseDeliverOrderModal = () => {
        setShowDeliverOrderModal(false)
    }


    //below function is for downloading deliveryitem
    const download = async (item) => {
        try {
            const response = await axios.get(`/download/${item}`, {
                headers: { 'Content-Type': 'application/json' },

            })
            console.log(response)
        }
        catch (err) {
            console.log(err)
        }
    }

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
                            {order?.seller_id?._id === user && (
                                !order?.order_Status?.started?.state && (
                                    <div className='ml-auto'>
                                        <button className='btn btn-success hover:bg-yellow-400 ' onClick={handleShowStartOrderModal}>Start working on the Order</button>
                                    </div>
                                )
                            )}
                            {order?.order_Status?.started?.state && (
                                < div className='ml-auto'>
                                    {/* {remainingTime} deliverystats is shared as props so that to stop timer*/}
                                    <CountdownTimer totalTime={remainingTime} deliveryStatus={order?.order_Status?.delivered?.state ? order.order_Status.delivered.state : null} />
                                </div>
                            )}
                        </div>

                        <hr />
                        <div className='my-2 flex gap-3'>
                            <div>
                                <h2 className='font-bold'>Order Requirements</h2>
                                <p>"{order?.listing_id?.requirements}"</p>
                                <h2 className='font-bold'>Provided Data</h2>
                                <p >{order?.order_requirements?.requirements}</p>
                                <p className='text-blue-500 hover:text-blue-900 cursor-pointer' onClick={() => setShowImagePopup(true)}>{order?.order_requirements?.file}</p>
                                {/* Popup */}
                                {showImagePopup && (
                                    <>
                                        <div className="fixed top-0 left-0 w-screen h-screen bg-gray-800 opacity-75 z-40"></div>
                                        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 z-50">
                                            <span className='hover:cursor-pointer' onClick={() => setShowImagePopup(false)}><FiXSquare /></span>
                                            <img src={`${BASE_URL}/public/uploads/profilepics/${order?.order_requirements?.file}`} alt="Order File" />
                                        </div>
                                    </>
                                )}
                            </div>
                            {order?.seller_id?._id === user && (
                                /* if there is remaining time for delivery and status is not finished show deliver button else danger message */
                                order?.order_Status?.started?.state && !order?.order_Status?.delivered?.state && remainingTime > 0 && (
                                    < div className='ml-auto'>
                                        <button className='btn btn-success hover:bg-yellow-400 ' onClick={handleShowDeliverOrderModal} >Deliver Order</button>
                                    </div>
                                ))}


                            {order?.seller_id?._id === user && (
                                /*order is started but not delivered and timer is up*/
                                order?.order_Status?.started?.state && !order?.order_Status?.delivered?.state && remainingTime <= 0 && (
                                    < div className="alert alert-error text-red-500">
                                        <span>Attention: Failed to deliver order on time! Admin will take action</span>
                                    </div>)
                            )}
                        </div>
                        <hr />
                        <div>
                            {/* Here we show the order delivery history*/}
                            {order?.order_Status?.delivered?.state && order?.order_Status?.delivered?.details.map((detail, index) => (
                                <div key={index}>
                                    <h2 className='font-bold my-2'>Order delivery Data</h2>
                                    <p>{detail.delivery_Message}</p>
                                    <p>{detail.date}</p>
                                    <ul>
                                        {detail.delivery_item.map((item, i) => (
                                            <li key={i}>
                                                <button className='btn btn-sm' onClick={() => download(item)}>Download file</button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                        <StartOrderModal
                            showStartOrderModal={showStartOrderModal}
                            handleCloseStartOrderModal={handleCloseStartOrderModal}
                            handleStartOrder={handleStartOrder}
                        />

                        <DeliverOrderModal
                            showDeliverOrderModal={showDeliverOrderModal}
                            handleCloseDeliverOrderModal={handleCloseDeliverOrderModal}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                            values={values}
                            errors={errors}
                            touched={touched}
                            setFieldValue={setFieldValue}
                        />

                    </div >

                </div >

            )}
        </>
    )
}

export default ViewOrder