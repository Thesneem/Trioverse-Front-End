import React, { useState, useEffect } from 'react'
import Navbar from '../../components/user/Navbar'
import Conversation from '../../components/user/Conversation'
import Chatbox from '../../components/user/Chatbox'
import Chatdetails from '../../components/user/Chatdetails'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { setUserDetails } from '../../redux/userSlice';

const Chatpage = () => {
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
            setChats(response.data);
            console.log('tgt', response.data)

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
            dispatch(setUserDetails(response.data.user))
        }
        catch (err) {
            console.log(err)
        }
    }

    const { user } = useSelector((state) => state.user)
    console.log('hi redux', user)
    const dispatch = useDispatch()

    const [chats, setChats] = useState([])

    useEffect(() => {
        getChats()
        fetchProfile()
    }, [])

    return (
        <>
            <Navbar />
            <div className="flex h-screen">
                {/* Left Section */}
                <Conversation chats={chats} currentuser={user} />

                {/* Middle Section */}
                <Chatbox />

                {/* Right Section */}
                <Chatdetails />
            </div>

        </>
    )
}

export default Chatpage