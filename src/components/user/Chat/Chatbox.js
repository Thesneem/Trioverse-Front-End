import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { BASE_URL } from '../../../config'
import axios from 'axios'
import { format } from "timeago.js";
import InputEmoji from 'react-input-emoji'


const Chatbox = ({ chat, currentUser, setSendMessage, receivedMessage }) => {
    const [receiverData, setReceiverData] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')


    const getReceiver = () => {
        const receiver = chat?.members?.find((member => member?._id?.toString() !== currentUser?._id))
        console.log("RECEIVERRR", receiver)
        setReceiverData(receiver)
    }

    useEffect(() => {
        if (chat !== null) {
            getReceiver()
            console.log(receiverData)
        }

    }, [chat, currentUser])

    const fetchMessages = async () => {
        try {
            const response = await axios.get(`/getmessages/${chat._id}`, {
                headers: {
                    'token': `Bearer ${localStorage.getItem('userToken')} `
                }
            },
                {
                    credentials: true
                }
            )
            console.log(response)
            setMessages(response.data)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (chat !== null) {
            fetchMessages()
        }
    }, [chat])

    const handleChange = (newMessage) => {
        setNewMessage(newMessage)
    }



    const handleSend = async (e) => {
        e.preventDefault()
        const message = {
            senderId: currentUser?._id,
            text: newMessage,
            chatId: chat?._id,
        }
        console.log('message', message)
        const recepient = chat?.members?.find((member => member?._id?.toString() !== currentUser?._id))
        const receiverId = recepient?._id
        console.log('This is Receiver', receiverId)

        setSendMessage({ ...message, receiverId })
        //send message to db
        try {
            const { data } = await axios.post(`/addmessage`, message, {

                headers: {
                    'token': `Bearer ${localStorage.getItem('userToken')} `
                }
            },
                {
                    credentials: true
                }
            );
            setMessages([...messages, data]);
            setNewMessage("");
        }
        catch (err) {
            console.log("error")
            console.log(err)
        }

    }





    // Always scroll to last Message
    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages])




    // Receive Message from parent component
    useEffect(() => {
        console.log("Message Arrived: ", receivedMessage)
        if (receivedMessage !== null && receivedMessage?.chatId === chat?._id) {
            setMessages([...messages, receivedMessage]);
        }

    }, [receivedMessage])

    const scroll = useRef();
    const imageRef = useRef();




    return (
        <>
            <div className="bg-gray-200 rounded-lg p-2 ">
                {chat && receiverData ? (
                    <>
                        {/* chat-header */}
                        <div className="chat-header">
                            <div className="follower flex items-center">
                                <div>
                                    <img
                                        src={`${BASE_URL}/public/uploads/profilepics/${receiverData?.profile_pic}`}
                                        alt="Profile"
                                        className="followerImage"
                                        style={{ width: "50px", height: "50px" }}
                                    />
                                    <div className="name text-sm">
                                        <span>
                                            {receiverData?.userName ? receiverData?.userName : `${receiverData?.firstName} ${receiverData?.lastName}`}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <hr className="border-gray-300 my-4" />
                        </div>
                        {/* chat-body */}
                        <div className="chat-body flex flex-col gap-2 overflow-auto max-h-screen flex-grow">
                            {messages?.map((message) => (
                                <div
                                    ref={scroll}
                                    className={`message  text-black p-2 my-2  mx-2 max-w-xs w-fit flex flex-col gap-2 ${message.senderId === currentUser._id ? 'self-end bg-blue-200 rounded-tl-lg rounded-tr-lg rounded-bl-lg' : 'bg-yellow-200 rounded-tl-lg rounded-tr-lg rounded-br-lg'}`}
                                    key={message?._id}
                                >
                                    {message?.text && <span>{message?.text}</span>}{" "}
                                    <span className="text-xs text-textColor self-end w-fit">
                                        {format(message?.createdAt)}
                                    </span>
                                </div>

                            ))}
                        </div>
                        {/* chat-sender */}
                        <div className="chat-sender bg-white flex items-center justify-between p-2 rounded-lg">
                            <div
                                onClick={() => imageRef.current.click()}
                                className="bg-gray-300 rounded-lg flex items-center justify-center font-bold cursor-pointer"
                            >
                                +
                            </div>
                            <InputEmoji
                                value={newMessage}
                                onChange={handleChange}
                            />
                            <div
                                className="send-button button bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer"
                                onClick={handleSend}
                            >
                                Send
                            </div>
                            <input
                                type="file"
                                name=""
                                id=""
                                className="hidden"
                                ref={imageRef}
                            />
                        </div>{" "}
                    </>
                ) : (
                    <span className="chatbox-empty-message">
                        Tap on a chat to start a conversation...
                    </span>
                )}
            </div>
        </>

    )
}

export default Chatbox