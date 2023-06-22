import React, { useEffect } from 'react'
import Navbar from "../../components/user/Navbar";
import ListingDetails from '../../components/user/Listing/ListingDetails';
import ListingPricing from '../../components/user/Listing/ListingPricing';
import { useSelector, useDispatch } from 'react-redux';
import { setListingDetails } from '../../redux/listingSlice'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { setUserDetails } from '../../redux/userSlice'


const ViewListing = () => {
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

    useEffect(() => {
        fetchListing()
        fetchProfile()
    }, [])

    const { listing } = useSelector((state) => state.listing)
    const { user } = useSelector((state) => state.user)

    // console.log('hi redux', listing)
    const dispatch = useDispatch()

    return (
        <div>
            <Navbar />
            <div className="grid grid-cols-3 mx-32 gap-20">
                <ListingDetails />
                < ListingPricing />
            </div>
        </div >
    )
}

export default ViewListing