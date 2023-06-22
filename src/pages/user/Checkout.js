import React, { useEffect, useState } from 'react'
import Navbar from '../../components/user/Navbar'
import CheckoutForm from '../../components/user/CheckoutForm'
import axios from 'axios'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";


const stripePromise = loadStripe("pk_test_51NDgqzSIOUjJA1ZELXBf4ajowfcVE0UOiXCfYrc6YwIzxab2ldmfDLMfLvU4OJ109M1QqBX3YzmP6Sh00dGOUaXV00DB6Zgn5C");

const Checkout = () => {
    const [clientSecret, setClientSecret] = useState("");

    const createOrderIntent = async () => {
        try {
            const { data } = await axios.post(`/createOrder`, {
                headers: {
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
        }
    }

    useEffect(() => {
        createOrderIntent()
    }, [])


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
                <h1 className="text-3xl">
                    Please complete the payment to place the order.
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