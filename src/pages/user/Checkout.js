import React, { useEffect, useState } from 'react'
import Navbar from '../../components/user/Navbar'
import CheckoutForm from '../../components/user/CheckoutForm'
import axios from 'axios'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';



const Checkout = () => {
    const location = useLocation()
    const { requirement, file, listing, item } = location?.state
    console.log("URLpassed States", requirement, file, listing, item)
    const [stripePromise, setStripePromise] = useState(null)
    const [clientSecret, setClientSecret] = useState("");

    //appending the data got using useLocation to formdata as the image file needs to be send in the post request
    const formData = new FormData()
    formData.append('requirement', requirement);
    formData.append('file', file);
    formData.append('listing', JSON.stringify(listing));
    formData.append('item', JSON.stringify(item));

    console.log(...formData)

    const createOrderIntent = async () => {
        try {
            const { data } = await axios.post(`/createOrder`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'token': `Bearer ${localStorage.getItem('userToken')} `
                    }
                },

                {
                    credentials: true
                }

            )
            console.log('clientSecret', data.clientSecret)
            setClientSecret(data.clientSecret);
        }
        catch (err) {
            console.log(err)
            toast.error('Something went wrong.Please try after sometime')
        }
    }

    // useEffect(() => {


    //     axios.get(`/stripe/publish_key`)

    //         .then((res) => {
    //             console.log('HEYY', res.data.result)
    //             setStripePromise(loadStripe(res.data.result))
    //             createOrderIntent()
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })

    // }, [])

    useEffect(() => {
        const fetchStripePublishKey = () => {
            try {
                axios.get('/stripe/publish_key')
                    .then(res => {
                        console.log('TEST Stripe', res);
                        if (res.data.result) {
                            setStripePromise(loadStripe(res.data.result));
                            // createOrderIntent()
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } catch (err) {
                console.log(err);
            }
        };

        fetchStripePublishKey();
    }, []);


    // useEffect(() => {
    //     console.log('STRIPEPROMISE', stripePromise)



    // }, [])


    const appearance = {
        theme: "stripe",
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <>
            <Navbar />
            <div className="min-h-[80vh] max-w-full mx-20 flex flex-col gap-10 items-center">
                <Toaster />
                <h1 className="text-3xl">
                    Please complete the payment to place the order. Make sure to stay in the page
                </h1>
                {clientSecret && (
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>
                )}
            </div>
        </>
    )
}

export default Checkout