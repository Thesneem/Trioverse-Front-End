import React, { useEffect, useState } from 'react'
import Navbar from '../../components/user/Navbar'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../../config'

const UserHome = () => {

    const [categories, setCategories] = useState([])
    const links = [
        { name: 'Open freelancers', href: '#' },
        { name: 'Variouse services', href: '#' },
        { name: 'Seemsless functionality', href: '#' },
        { name: 'Expert services', href: '#' },
    ]
    const stats = [
        { name: 'Experts from worldwide', value: '12' },
        { name: 'Full-time colleagues', value: '300+' },
        { name: 'Finished Works', value: '40' },
        { name: 'Services', value: 'Unlimited' },
    ]

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`/categories`, {
                headers: {
                    'token': `Bearer ${localStorage.getItem('userToken')}`

                }
            });
            setCategories(response.data.categories.slice(0, 3));
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    return (
        <div>
            <Navbar />

            < div className="relative isolate overflow-hidden bg-gray-900 py-32 sm:py-24">
                <img
                    // src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
                    src='/bg-hero3.webp'
                    alt=""
                    className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
                />
                <div
                    className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
                    aria-hidden="true"
                >
                    <div
                        className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>
                <div
                    className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
                    aria-hidden="true"
                >
                    <div
                        className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Work with us</h2>
                        <p className="mt-6 text-lg leading-8 text-gray-300">
                            Find theperfect freelancers for your work just in a few clicks.
                        </p>
                    </div>
                    <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none mb-10">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
                            {links.map((link) => (
                                <a key={link.name} href={link.href}>
                                    {link.name} <span aria-hidden="true">&rarr;</span>
                                </a>
                            ))}
                        </div>
                        <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
                            {stats.map((stat) => (
                                <div key={stat.name} className="flex flex-col-reverse">
                                    <dt className="text-base leading-7 text-gray-300">{stat.name}</dt>
                                    <dd className="text-2xl font-bold leading-9 tracking-tight text-white">{stat.value}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>




                {/* <!-- Services Section --> */}
                < section className='' >
                    <div className="container mx-auto px-4 ">
                        <h2 className="text-white text-3xl font-semibold mb-8">How It Works</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {/* <!-- Service Item --> */}
                            <div className="bg-gray-200 p-6 rounded-lg shadow">
                                <h3 className="text-xl font-semibold mb-4">Post a Listing</h3>
                                <p className="text-gray-700">Describe your projects or services as a freelancers.</p>
                            </div>
                            {/* 
                        <!-- Service Item --> */}
                            <div className="bg-gray-200 p-6 rounded-lg shadow">
                                <h3 className="text-xl font-semibold mb-4">Browse Freelancers</h3>
                                <p className="text-gray-700">Explore our extensive database of freelancers and filter based on skills, ratings, and more.</p>
                            </div>

                            {/* <!-- Service Item --> */}
                            <div className="bg-gray-200 p-6 rounded-lg shadow">
                                <h3 className="text-xl font-semibold mb-4">Hire and Collaborate</h3>
                                <p className="text-gray-700">Select the right freelancer for your project and collaborate using our secure workspace.</p>
                            </div>


                            <div className="bg-gray-200 p-6 rounded-lg shadow">
                                <h3 className="text-xl font-semibold mb-4">Pay with Ease</h3>
                                <p className="text-gray-700">Enjoy hassle-free payments with our secure and reliable payment system.</p>
                            </div>
                        </div>
                    </div>
                </section >
                <div className="flex justify-center mt-6">
                    <Link to='/quickguide'><button className="btn bg-black text-white">Quick Guide</button></Link>
                </div>
            </div>

            <div className="bg-gray-100 mx-auto max-w-2xl py-10 sm:py-24 lg:max-w-none lg:py-10">
                <h2 className="text-2xl font-bold text-gray-900">Categories</h2>

                <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
                    {categories.map((category) => (
                        <div key={category.id} className="group relative">
                            <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                                <img src={`${BASE_URL}/public/uploads/profilepics/${category?.image}`} alt={category.category} className="h-full w-full object-cover object-center" />
                            </div>
                            <h3 className="mt-6 text-sm text-gray-500">
                                <Link to="/browse">
                                    <span className="absolute inset-0"></span>
                                    {category.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}
                                </Link>
                            </h3>
                            <p className="text-base font-semibold text-gray-900">{category.description}</p>
                        </div>
                    ))
                    }
                </div >

                <div className="flex justify-center ">
                    <button className="btn bg-black text-white">Browse More</button>
                </div>
            </div >


            <div className=" bg-gray-100 py-10 sm:py-10">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">Trusted by the world’s most innovative teams</h2>
                    <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                        <img className="col-span-2 max-h-12 w-full object-contain lg:col-span-1" src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg" alt="Transistor" width="158" height="48" />
                        <img className="col-span-2 max-h-12 w-full object-contain lg:col-span-1" src="https://tailwindui.com/img/logos/158x48/reform-logo-gray-900.svg" alt="Reform" width="158" height="48" />
                        <img className="col-span-2 max-h-12 w-full object-contain lg:col-span-1" src="https://tailwindui.com/img/logos/158x48/tuple-logo-gray-900.svg" alt="Tuple" width="158" height="48" />
                        <img className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1" src="https://tailwindui.com/img/logos/158x48/savvycal-logo-gray-900.svg" alt="SavvyCal" width="158" height="48" />
                        <img className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1" src="https://tailwindui.com/img/logos/158x48/statamic-logo-gray-900.svg" alt="Statamic" width="158" height="48" />
                    </div>
                </div>
            </div>




        </div >

    )
}

export default UserHome