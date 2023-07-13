import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/admin/shared/Sidebar'
import Header from '../../components/admin/shared/Header'
import axios from 'axios'
import { BASE_URL } from '../../config'
//import { Link } from 'react-router-dom'

const Orders = () => {
    const [orders, setOrders] = useState([])

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`/admin/orders`, {
                headers: {
                    'token': `Bearer ${localStorage.getItem('adminToken')}`

                }
            });
            setOrders(response.data.orders);
        } catch (err) {
            console.log(err);
        }
    }

    //to get order status
    function orderStatus(order) {
        if (order?.order_Status?.canceled?.state) {
            return <td className="px-6 py-4 text-red-500">Cancelled</td>
        }
        else if (order?.order_Status?.finished?.state) {
            return <td className="px-6 py-4 text-green-500">Finished</td>
        }
        else if (order?.order_Status?.returned?.state) {
            return < span className='text-orange-500 ml-2' > Returned</span >
        }
        else if (order?.order_Status?.delivered?.state) {
            return < span className='text-purple-500 ml-2' > Delivered</span >
        }
        else if (order?.order_Status?.started?.state) {
            return <td className="px-6 py-4 text-blue-500">Started</td>
        }
        else {
            return <td className="px-6 py-4 text-yellow-500">Created</td>
        }
    }


    useEffect(() => {
        fetchOrders()
    }, [])

    return (
        <div>
            <div>
                <div>
                    <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
                        <Sidebar />
                        <div className="flex flex-col flex-1">
                            <Header />

                            <h1 className="text-3xl font-bold mt-8 ml-4">Sellers</h1>
                            <div className="overflow-x-auto w-full my-10">

                                <table className="table w-full">
                                    {/* head */}
                                    <thead>
                                        <tr>
                                            <th>
                                                #
                                            </th>
                                            <th>Order ID</th>
                                            <th>Listing</th>
                                            <th>Seller</th>
                                            <th>Buyer</th>
                                            <th>Package</th>
                                            <th>Price</th>
                                            <th>Status</th>
                                            {/* <th>Payment Status</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders?.map((order, index) => (

                                            <tr key={order._id} >
                                                <td>{index + 1}</td>
                                                <td>
                                                    {order?._id}
                                                </td>
                                                <td>
                                                    <div className="flex items-center space-x-3">
                                                        <div className="avatar">
                                                            <div className="mask mask-squircle w-12 h-12">
                                                                <img src={`${BASE_URL}/public/uploads/listingImages/${order?.listing_id?.images[0]}`} alt='Avatar' />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="font-bold">{order?.selectedListing_title}</div>
                                                            {/* <div className="text-sm opacity-50">United States</div> */}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    {order?.seller_id?.userName}
                                                </td>
                                                <td>
                                                    {order?.buyer_id?.userName}
                                                </td>
                                                <td>
                                                    {order?.selected_Package?.package.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}
                                                </td>
                                                <td>
                                                    {order?.order_Price}
                                                </td>
                                                {orderStatus(order)}
                                            </tr>
                                        ))
                                        }
                                    </tbody>
                                </table >
                            </div >
                        </div >
                    </div >
                </div >
            </div >
        </div>
    )
}

export default Orders