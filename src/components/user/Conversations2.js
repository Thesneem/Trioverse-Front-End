import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Conversations2 = ({ currentuser, chats }) => {
    const [receivers, setReceivers] = useState([])
    const [currentchat, setCurrentchat] = useState(null)

    //to get recievers
    const chatlist = () => {
        //console.log(typeof (currentuser._id))
        const newReceivers = chats?.reduce((receivers, chat) => {
            const members = chat.members.filter(member => member._id.toString() !== currentuser._id);
            console.log('Members', members);
            return [...receivers, ...members];
        }, []);
        console.log('HIHI', newReceivers)
        setReceivers(newReceivers);
        console.log(receivers)
    };


    useEffect(() => {
        chatlist()
    }, [chats])

    return (
        <>
            {currentuser && receivers && (
                < div className="w-1/4 bg-gray-100 p-4">
                    <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
                        <div>
                            <h2 className="text-xl font-bold">
                                {currentuser.userName}
                            </h2>
                            <p className="text-gray-500">Online</p>
                        </div>
                    </div>
                    <div className="relative">
                        <span className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M15.939 14.939l-2.12-2.122A5.99 5.99 0 0012 6a5.99 5.99 0 00-1.818 11.817l2.122 2.122a1 1 0 001.415 0l4.243-4.243a1 1 0 000-1.414zM12 8a4 4 0 110 8 4 4 0 010-8z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </span>
                        <input
                            type="text"
                            className="w-full px-10 py-2 rounded-md border-gray-300 focus:outline-none"
                            placeholder="Search"
                        />
                    </div>
                    <div className="mt-6">
                        <ul className="space-y-2">
                            <li className="flex items-center space-x-4">
                                <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                                {receivers.map((receiver, index) => (
                                    <div onClick={() => { setCurrentchat(receiver) }}>
                                        <h3 className="text-lg font-bold" key={index}>{receiver.userName}</h3>
                                        <p className="text-gray-500">Last message</p>
                                    </div>
                                ))}
                            </li>
                        </ul>
                    </div>
                </div >
            )}
        </>
    )
}

export default Conversations2