import React, { useEffect, useState } from 'react'
import Navbar from "../../components/user/Navbar";
import ListingDetails from '../../components/user/Listing/ListingDetails';
import ListingPricing from '../../components/user/Listing/ListingPricing';
import { useSelector, useDispatch } from 'react-redux';
import { setListingDetails } from '../../redux/listingSlice'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { setUserDetails } from '../../redux/userSlice'


const ViewListing = () => {
    const [activeOrder, setActiveOrder] = useState('')
    //to check if there is finished/canceled orders, then show add review portion 
    const [hasOrdered, setHasOrdered] = useState(false)

    //getting id pssed as parameter 
    const { id } = useParams()
    console.log(id)
    const fetchListing = async () => {
        try {
            const response = await axios.get(`/getListing/${id}`, {
                headers: {
                    'Content-Type': 'multipart/form-data', // set the correct Content-Type header for form data
                    'token': `Bearer ${localStorage.getItem('userToken')} `
                }
            }, {
                credentials: true
            })
            console.log(response)
            dispatch(setListingDetails(response.data.listing))

        }
        catch (err) {

        }
    }

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

    //to check if an order exists for the current listing,we are fectching the order
    const fetchActiveOrder = async () => {
        try {
            const response = await axios.get(`/getActiveOrder/${id}`, {
                headers: {
                    'token': `Bearer ${localStorage.getItem('userToken')} `
                }
            },
                {
                    credentials: true
                }

            )
            console.log('ActiveOrderResponse', response.data.ActiveOrder)
            setActiveOrder(response.data.ActiveOrder)
        }
        catch (err) {
            console.log(err)
        }
    }

    const checkUserOrdered = async () => {
        try {
            console.log('rerere')
            const response = await axios.get(`/checkUserOrdered/${id}`, {
                headers: {
                    'token': `Bearer ${localStorage.getItem('userToken')} `
                }
            }, {
                credentials: true
            }

            )
            console.log('Im mad', response)
            if (response.data.hasOrdered.length > 0) {
                setHasOrdered(true)
            }

        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchListing()
        fetchProfile()
        fetchActiveOrder()
        checkUserOrdered()
    }, [])

    const { listing } = useSelector((state) => state.listing)
    const { user } = useSelector((state) => state.user)

    // console.log('hi redux', listing)
    const dispatch = useDispatch()

    return (
        <div>
            <Navbar />
            {listing && (
                <div className="grid grid-cols-3 mx-32 gap-20">
                    <ListingDetails hasOrdered={hasOrdered} />
                    < ListingPricing ActiveOrder={activeOrder} />
                </div>
            )}
        </div >
    )
}

export default ViewListing