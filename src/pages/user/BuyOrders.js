import React, { useEffect, useState } from 'react'
import Navbar from '../../components/user/Navbar'
import axios from 'axios'
import { Link } from 'react-router-dom'


const BuyOrders = () => {
    const [buyOrders, setBuyOrders] = useState()
    const fetchBuyOrders = async () => {
        try {
            const response = await axios.get(`/allBuyOrders`, {
                headers: {
                    'token': `Bearer ${localStorage.getItem('userToken')} `
                }
            },
                {
                    credentials: true
                })
            console.log(response)
            setBuyOrders(response.data.orders)
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        fetchBuyOrders()
    }, [])

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

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


    return (
        <>
            <Navbar />
            {buyOrders && (
                <div className="min-h-[80vh] my-10 mt-0 px-32">
                    <h3 className="m-5 text-2xl font-semibold">All your Buy Orders</h3>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Order Id
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Category
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Price
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Delivery Time
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Order Date
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Send Message
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {buyOrders.map((order) => {
                                    return (
                                        <tr
                                            className="bg-white dark:bg-gray-800 hover:bg-gray-50"
                                            key={order._id}
                                        >
                                            <th scope="row" className="px-6 py-4 ">
                                                <Link to={`/viewOrder/${order._id}`}> {order._id}</Link>
                                            </th>
                                            <th scope="row" className="px-6 py-4 font-medium">
                                                {order.selectedListing_title}
                                            </th>
                                            <td className="px-6 py-4">{order.listing_category}</td>
                                            <td className="px-6 py-4">{order.order_Price}</td>
                                            <td className="px-6 py-4">{order.selected_Package.delivery_Time}Days</td>
                                            <td className="px-6 py-4">{formatDate(order.order_Status.created.date)}</td>

                                            <td className="px-6 py-4 ">
                                                <Link
                                                    href={`/buyer/orders/messages/${order.id}`}
                                                    className="font-medium text-blue-600  hover:underline"
                                                >
                                                    Chat with {order.seller_id.userName}
                                                </Link>
                                            </td>
                                            {orderStatus(order)}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div >
                </div >
            )
                // : (
                // <h1>Currently You don't have any Buy Orders</h1>
                // )
            }
        </>
    )
}

export default BuyOrders