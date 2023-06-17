import React, { useEffect, useState } from 'react'
// import axios from 'axios'
import { BASE_URL } from '../../config'

const Conversations2 = ({ currentUser, chat, online }) => {
    const [receiver, setReceiver] = useState([])
    // const [currentchat, setCurrentchat] = useState(null)

    //to get recievers
    const chatlist = () => {
        console.log('CHAtSCONVO')
        const newReceiver =
            chat.members.find(member => member._id.toString() !== currentUser._id);
        console.log('HIHI', newReceiver)
        setReceiver(newReceiver);
        console.log(receiver)
    };


    useEffect(() => {
        chatlist()
    }, [])

    return (
        <>
            <div>
                <div className="follower conversation hover:bg-gray-200">
                    <div className="relative flex items-center">
                        <div className={`online-dot ${receiver.status === 'Online' ? 'online' : 'offline'}`}></div>

                        <img
                            src={`${BASE_URL}/public/uploads/profilepics/${receiver.profile_pic}`}
                            alt="Profile"
                            className="followerImage w-12 h-12"
                        />
                        <div className="name text-xs ml-3 flex flex-col">
                            <span className="text-gray-800">
                                {receiver?.userName ? receiver.userName : `${receiver.firstName} ${receiver.lastName}`}
                            </span>
                            <span
                                className={`text-green-500 ${receiver.status === 'Online' ? 'Online' : 'Offline'}`}>
                                online  {/* {receiver.status} */}
                            </span>
                        </div>
                    </div>
                </div>
            </div >
            <hr className="w-95 border-gray-300 border-t-0.5 " />
        </>


    )
}

export default Conversations2