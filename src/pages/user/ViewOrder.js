import React, { useEffect, useState } from 'react'
import Navbar from '../../components/user/Navbar'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import { BASE_URL } from '../../config'

const ViewOrder = () => {
    const [order, setOrder] = useState('')
    //getting id pssed as parameter 
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
        if (order.order_Status.canceled.state) {
            return <p >Current Order Status:<span className='text-red-500 ml-2'>Canceled</span></p >
        }
        else if (order.order_Status.finished.state) {
            return <p>Current Order Status:<span className='text-green-500 ml-2'>Finished</span></p >
        }
        else if (order.order_Status.started.state) {
            return <p>Current Order Status:<span className='text-blue-500 ml-2'>Started</span></p>
        }
        else {
            return <p >Current Order Status:<span className='text-yellow-500 ml-2'>Created</span></p>
        }
    }

    return (
        <>
            <Navbar />
            {order && (
                <div className='h-screen mx-10 mt-2'>
                    <h1 className='bg-[#1DBF73] text-white text-2xl font-bold text-center py-2 px-4'>Order ({order._id})</h1>
                    <div className='border p-10'>
                        <div className='flex gap-3'>
                            <p className='font-bold text-xl'>OrderNo <span className='ml-2'>{order._id}</span></p>
                            <Link to={`/viewListing/${order.listing_id}`} > <span className='text-m text-blue-300'>View Listing</span></Link>
                            <span className='text-3xl ml-auto'>₹{order.order_Price}</span>
                        </div>
                        <div className='flex gap-3'>
                            <p>Seller:<span className='ml-2'>{order.seller_id.userName}</span></p>
                            <span>Ordered on {formatDate(order.order_Status.created.date)}</span>
                        </div>
                        <hr />
                        <div className=''>
                            <h2 className='font-bold'>Listing Details</h2>
                            <p>Ordered Package:<span className='ml-2'>{order.selected_Package.package.split('-')
                                .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                                .join(' ')}</span></p>
                            <p>Deliverables:<span className='ml-2'>{order.selected_Package.deliverables}</span></p>
                            {orderStatus()}
                            <p>Allowed Revisions:<span className='ml-2'>{order.selected_Package.revisions}</span></p>

                        </div>
                        <hr />
                        <div>
                            <h2 className='font-bold'>Order Requirements</h2>
                            <p>"{order.listing_id.requirements}"</p>
                            <h2 className='font-bold'>Provided Data</h2>
                            <p>{order.order_requirements.requirements}</p>
                            {order.order_requirements.file && (
                                <img src={`${BASE_URL}/public/uploads/profilepics/${order.order_requirements.file}`} alt="Order File" />
                            )}

                        </div>
                    </div >
                </div >
            )}
        </>
    )
}

export default ViewOrder