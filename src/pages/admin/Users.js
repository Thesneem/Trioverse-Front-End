import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/admin/shared/Sidebar'
import Header from '../../components/admin/shared/Header'
import axios from 'axios'
import BlockModal from '../../components/modals/BlockModal'
import { BASE_URL } from '../../config'


const Users = () => {

    const [users, setUsers] = useState([]);

    const [selectedUser, setSelectedUser] = useState(null)
    const [showBlockModal, setShowBlockModal] = useState(false);

    const handleShowBlockModal = (id) => {
        setSelectedUser(id)
        setShowBlockModal(true);
    }

    const handleCloseBlockModal = () => setShowBlockModal(false);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`/admin/users`, {
                headers: {
                    'token': `Bearer ${localStorage.getItem('adminToken')}`

                }
            });
            setUsers(response.data.users);
        } catch (err) {
            console.log(err);
        }
    };


    const handleBlockItem = async () => {
        console.log(selectedUser)
        const response = await axios.post(`/admin/editUser/${selectedUser}`, {
            headers: {
                'token': `Bearer ${localStorage.getItem('adminToken')}`

            }
        })
        setSelectedUser(null)
        setShowBlockModal(false)
        console.log(response)
        fetchUsers()
    }
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    useEffect(() => {

        fetchUsers();
    }, []);

    return (
        <div>
            <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
                <Sidebar />
                <div className="flex flex-col flex-1">
                    <Header />

                    <h1 className="text-3xl font-bold mt-8 ml-4">Users</h1>
                    <div className="overflow-x-auto w-full my-10">

                        <table className="table w-full">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>
                                        #
                                    </th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Joining Date</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (

                                    < tr key={user._id} >
                                        <td>
                                            {index + 1}
                                        </td>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={`${BASE_URL}/public/uploads/profilepics/${user?.profile_pic}`} alt="Avatar" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{user.firstName + ' ' + user.lastName}</div>
                                                    {/* <div className="text-sm opacity-50">United States</div> */}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {user.email}
                                            <br />
                                            {/* <span className="badge badge-ghost badge-sm">Desktop Support Technician</span> */}
                                        </td>
                                        <td>{formatDate(user.created_date)}</td>
                                        {user.status === 'Active' ? (
                                            <td className='text-green-500'>{user.status}</td>
                                        ) : (
                                            <td className='text-red-500' > {user.status}</td>
                                        )}

                                        {user.status === 'Active' ? (
                                            < th >
                                                <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
                                                    onClick={() => {
                                                        //setSelectedUser(user._id);
                                                        handleShowBlockModal(user._id);

                                                    }}> Block</button>
                                            </th>) : (
                                            < th >
                                                <button className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
                                                    onClick={() => {
                                                        //setSelectedUser(user._id);
                                                        handleShowBlockModal(user._id);

                                                    }} > Unblock</button>
                                            </th>
                                        )}

                                    </tr>
                                ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <div>
                        {/* modal */}
                        <BlockModal
                            showBlockModal={showBlockModal}
                            handleCloseBlockModal={handleCloseBlockModal}
                            handleBlockItem={handleBlockItem} />

                    </div>


                </div>
            </div>
        </div >
    )
}

export default Users