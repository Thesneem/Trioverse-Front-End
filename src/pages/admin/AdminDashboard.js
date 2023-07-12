
import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/admin/shared/Sidebar'
import Header from '../../components/admin/shared/Header'
import Barchart from '../../components/admin/Barchart'
import axios from 'axios'

const AdminDashboard = () => {

    const [users, setUsers] = useState('')
    const [sellers, setSellers] = useState('')
    const [orders, setOrders] = useState('')
    const [pending, setPending] = useState('')
    const [salesCount, setSalesCount] = useState([])
    const [salesData, setSalesData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Weekly Sales',
                data: [],
                backgroundColor: [
                    'rgba(75, 192, 192, 1)',
                    '#ecf0f1',
                    '#50AF95',
                    '#f3ba2f',
                    '#2a71d0',
                ],
                borderColor: 'black',
                borderWidth: 2,
            },
        ],
    });
    const fetchDashboardData = async () => {
        try {
            const response = await axios.get(`/admin/getDashboardData`, {
                headers: {
                    'token': `Bearer ${localStorage.getItem('adminToken')}`

                }
            })
            setUsers(response.data.userCount)
            setSellers(response.data.sellerCount)
            setOrders(response.data.orderCount)
            setPending(response.data.pendingCount)
            setSalesCount(response.data.salesCounts)
            console.log(response)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchDashboardData()
    }, [])

    useEffect(() => {
        // Update salesData whenever salesCount changes
        setSalesData((prevData) => ({
            ...prevData,
            labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            datasets: [
                {
                    ...prevData.datasets[0],
                    data: salesCount,
                },
            ],
        }));
    }, [salesCount]);


    return (
        <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
            <Sidebar />
            <div className="flex flex-col flex-1">
                <Header />
                <div className="flex-1 p-4 min-h-0 overflow-auto">
                    {/* <Outlet /> */}
                    <div className='flex gap-3 justify-evenly'>
                        <div className="stats shadow">
                            <div className="stat bg-red-300">
                                <div className="stat-title">Total Users</div>
                                <div className="stat-value">{users}</div>
                            </div>
                        </div>
                        <div className="stats shadow">
                            <div className="stat bg-orange-300">
                                <div className="stat-title ">Total Sellers</div>
                                <div className="stat-value">{sellers}</div>
                            </div>
                        </div>
                        <div className="stats shadow">
                            <div className="stat bg-amber-300">
                                <div className="stat-title">Total Orders</div>
                                <div className="stat-value">{orders}</div>
                            </div>
                        </div>
                        <div className="stats shadow">
                            <div className="stat bg-lime-300">
                                <div className="stat-title">Total Pending Payments</div>
                                <div className="stat-value">{pending}</div>
                            </div>
                        </div>
                    </div>
                    {/* chart area */}
                    <div className='mt-10' >
                        <h3 className='font-bold text-xl'>Weekly Sales Chart</h3>
                    </div>
                    <div classname='mt-10 justify-center' style={{ width: 700 }}>
                        <Barchart chartData={salesData} />
                    </div>
                </div>
            </div >
        </div >
    )
}

export default AdminDashboard