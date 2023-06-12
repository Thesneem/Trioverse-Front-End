import React from 'react'
import Navbar from '../../components/user/Navbar'
import { Link } from 'react-router-dom'

const UserHome = () => {
    return (
        <div>
            <Navbar />
            {/* 
            <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12" style={{ backgroundImage: 'url(/office.jpg)' }} >
                <h1 className="text-green-500 text-2xl md:text-3xl lg:text-4xl font-bold p-4">Welcome to Trioverse</h1>
            </div> */}

            {/* <!-- Hero Section --> */}
            <section class=" py-16" style={{
                backgroundImage: "url('/bgimage.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>

                <div class="container mx-auto px-4">
                    <div class="text-center">
                        <h1 class="text-4xl font-semibold mb-4">Find the Perfect Freelancers for Your Projects</h1>
                        <p class="text-gray-700 text-lg">Browse through our talented pool of freelancers and get your work done efficiently.</p>
                        <Link to="" class="mt-8 inline-block bg-blue-500 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-600">Get Started</Link>
                    </div>
                </div>
            </section >

            {/* <!-- Services Section --> */}
            < section class="py-16" >
                <div class="container mx-auto px-4">
                    <h2 class="text-3xl font-semibold mb-8">How It Works</h2>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* <!-- Service Item --> */}
                        <div class="bg-white p-6 rounded-lg shadow">
                            <h3 class="text-xl font-semibold mb-4">Post a Job</h3>
                            <p class="text-gray-700">Describe your project requirements and receive proposals from qualified freelancers.</p>
                        </div>
                        {/* 
                        <!-- Service Item --> */}
                        <div class="bg-white p-6 rounded-lg shadow">
                            <h3 class="text-xl font-semibold mb-4">Browse Freelancers</h3>
                            <p class="text-gray-700">Explore our extensive database of freelancers and filter based on skills, ratings, and more.</p>
                        </div>

                        {/* <!-- Service Item --> */}
                        <div class="bg-white p-6 rounded-lg shadow">
                            <h3 class="text-xl font-semibold mb-4">Hire and Collaborate</h3>
                            <p class="text-gray-700">Select the right freelancer for your project and collaborate using our secure workspace.</p>
                        </div>


                        <div class="bg-white p-6 rounded-lg shadow">
                            <h3 class="text-xl font-semibold mb-4">Pay with Ease</h3>
                            <p class="text-gray-700">Enjoy hassle-free payments with our secure and reliable payment system.</p>
                        </div>
                    </div>
                </div>
            </section >

        </div >
    )
}

export default UserHome