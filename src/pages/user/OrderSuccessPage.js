import React, { useEffect } from 'react'
import Navbar from '../../components/user/Navbar'
import axios from 'axios'
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom'

const OrderSuccessPage = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const email = new URLSearchParams(location.search).get('email')
    //console.log('emailll', email)
    const [searchParams] = useSearchParams()
    const payment = searchParams.get('payment_intent')
    console.log('PI', payment)


    const updateOrderStatus = async () => {
        try {
            const response = await axios.put(`/confirmOrder`, { paymentIntent: payment, order_email: email })
            console.log(response)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        updateOrderStatus()
        setTimeout(() => navigate('/buyOrders'), 5000)
    }, [])
    return (
        <>
            <Navbar />
            <h1 className="text-4xl text-center">
                Payment successful. You are being redirected to the orders page.
            </h1>
            <h1 className="text-4xl text-center">Please do not close the page.</h1>
        </>
    )
}

export default OrderSuccessPage