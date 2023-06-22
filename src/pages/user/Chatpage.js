import React, { useState, useEffect, useRef } from 'react'
import Navbar from '../../components/user/Navbar'
import Conversations2 from '../../components/user/Chat/Conversations2'
import Chatbox from '../../components/user/Chat/Chatbox'
import Chatdetails from '../../components/user/Chat/Chatdetails'
import axios from 'axios'
import { io } from "socket.io-client";
import { SOCKET_URL } from '../../config'



const Chatpage = () => {

    const [currentUser, setCurrentUser] = useState(null)
    const [chats, setChats] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [sendMessage, setSendMessage] = useState(null);
    const [receivedMessage, setReceivedMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([])


    const socket = useRef();

    const getChats = async () => {
        try {
            const response = await axios.get(`/allchats`, {
                headers: {
                    'token': `Bearer ${localStorage.getItem('userToken')} `
                }
            },
                {
                    credentials: true
                }
            );
            console.log('tgt', response.data)
            setChats(response.data)

        } catch (error) {
            console.log(error);
        }
    };
    const fetchProfile = async () => {
        try {
            console.log('HelloooProfileurl')
            const response = await axios.get(`/profile`, {
                headers: {
                    'token': `Bearer ${localStorage.getItem('userToken')} `
                }
            },
                {
                    credentials: true
                }

            )
            console.log("HELOO", response.data.user)
            setCurrentUser(prevUser => {
                console.log('CURRENTUSER', prevUser);
                return response.data.user;
            });
            console.log('CU', currentUser)
        }
        catch (err) {
            console.log(err)
        }
    }





    useEffect(() => {
        fetchProfile()

    }, [])

    useEffect(() => {
        getChats()

    }, [currentUser])

    // Connect to Socket.io
    useEffect(() => {
        socket.current = io(`${SOCKET_URL}`);
        socket.current.emit("new-user-add", currentUser?._id);
        socket.current.on("get-users", (users) => {
            setOnlineUsers(users);
            console.log('ONLINE', onlineUsers)
        });
    }, [currentUser]);



    // Get the message from socket server
    useEffect(() => {
        socket.current.on("recieve-message", (data) => {
            console.log('recieve mesages', data)
            setReceivedMessage(data);
        }

        );
    });


    // Send Message to socket server
    useEffect(() => {
        if (sendMessage !== null) {
            socket.current.emit("send-message", sendMessage);
        }
    }, [sendMessage]);

    const checkOnlineStatus = (chat) => {
        const chatMember = chat.members.find((member) => member !== currentUser._id);
        const online = onlineUsers.find((user) => user.userId === chatMember);
        return online ? true : false;
    };




    return (
        <>
            <Navbar />
            {chats &&
                < div className="Chat grid grid-cols-1 md:grid-cols-12 gap-4">
                    {/* Left Side */}
                    <div className="Left-side-chat col-span-3 md:col-span-2 flex flex-col gap-4">
                        {/* <LogoSearch /> */}
                        <div className="Chat-container bg-cardColor rounded-lg p-4 h-auto min-h-screen overflow-y-auto">
                            <h2 className="text-xl font-semibold">Chats</h2>
                            <div className="Chat-list flex flex-col gap-4">
                                {chats && chats?.map((chat, index) => (

                                    < div
                                        key={index}
                                        onClick={() =>
                                            setCurrentChat(chat)
                                        }
                                        className="cursor-pointer"
                                    >
                                        {console.log('TRIEL', chat)}
                                        < Conversations2 chat={chat}
                                            currentUser={currentUser}
                                            online={checkOnlineStatus(chat)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Middle Part */}
                    <div className="Right-side-chat col-span-6 md:col-span-8 flex flex-col gap-4">
                        <div className="w-80 self-end"></div>
                        <Chatbox
                            chat={currentChat}
                            currentUser={currentUser}
                            setSendMessage={setSendMessage}
                            receivedMessage={receivedMessage}
                        />
                    </div>

                    {/* Right Side */}
                    <div className="col-span-3 md:col-span-2">
                        <Chatdetails />
                    </div>
                </div >
            }
        </>

    )
}

export default Chatpage