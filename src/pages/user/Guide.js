import React from 'react'
import Navbar from '../../components/user/Navbar'
import { ArrowPathIcon } from '@heroicons/react/24/outline'


const Guide = () => {
    return (
        <div>
            <Navbar />
            <div>
                <hr />
                <div className="bg-white py-2">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:text-center">
                            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                Everything you need to know about Trioverse
                            </p>
                            <p className="mt-2 text-lg leading-8 text-gray-600">
                                A quick introduction to the Trioverse concepts
                            </p>
                        </div>
                        <div className="mx-auto mt-8 max-w-2xl sm:mt-10 lg:mt-10 lg:max-w-4xl">
                            <dl className="grid max-w-xl grid-cols-1 gap-x-4 gap-y-3 lg:max-w-none lg:grid-cols-2 lg:gap-y-4">
                                <div className="relative pl-5 flex items-start">
                                    <dt className="text-base font-semibold leading-7 text-gray-900">
                                        <div className="absolute left-0 top-0 flex h-5 w-5 items-center justify-center rounded-lg bg-indigo-600">
                                            <ArrowPathIcon className="h-4 w-4 text-white" aria-hidden="true" />
                                        </div>
                                    </dt>
                                    <dd className="ml-8 mt-1 text-base leading-7 text-gray-600">Every user is, by default, a buyer.User who provides/sells services/listings is called a Seller</dd>
                                </div>
                                <div className="relative pl-5 flex items-start">
                                    <dt className="text-base font-semibold leading-7 text-gray-900">
                                        <div className="absolute left-0 top-0 flex h-5 w-5 items-center justify-center rounded-lg bg-indigo-600">
                                            <ArrowPathIcon className="h-4 w-4 text-white" aria-hidden="true" />
                                        </div>
                                    </dt>
                                    <dd className="ml-8 mt-1 text-base leading-7 text-gray-600">To become a seller, user has to submit seller profile. Admin will verify the profile</dd>
                                </div>
                                <div className="relative pl-5 flex items-start">
                                    <dt className="text-base font-semibold leading-7 text-gray-900">
                                        <div className="absolute left-0 top-0 flex h-5 w-5 items-center justify-center rounded-lg bg-indigo-600">
                                            <ArrowPathIcon className="h-4 w-4 text-white" aria-hidden="true" />
                                        </div>
                                    </dt>
                                    <dd className="ml-8 mt-1 text-base leading-7 text-gray-600">A seller can create Listing with 3 different packages, basic, standard and permium. Each package will have different deliverables, revisions, delivery days and price.</dd>
                                </div>
                                <div className="relative pl-5 flex items-start">
                                    <dt className="text-base font-semibold leading-7 text-gray-900">
                                        <div className="absolute left-0 top-0 flex h-5 w-5 items-center justify-center rounded-lg bg-indigo-600">
                                            <ArrowPathIcon className="h-4 w-4 text-white" aria-hidden="true" />
                                        </div>
                                    </dt>
                                    <dd className="ml-8 mt-1 text-base leading-7 text-gray-600">A buyer can browse the listings in variouse categories. He/she can chat with seller regarding the listing</dd>
                                </div>
                                <div className="relative pl-5 flex items-start">
                                    <dt className="text-base font-semibold leading-7 text-gray-900">
                                        <div className="absolute left-0 top-0 flex h-5 w-5 items-center justify-center rounded-lg bg-indigo-600">
                                            <ArrowPathIcon className="h-4 w-4 text-white" aria-hidden="true" />
                                        </div>
                                    </dt>
                                    <dd className="ml-8 mt-1 text-base leading-7 text-gray-600">It is always recommended to chat with seller prior to order placement.</dd>
                                </div>
                                <div className="relative pl-5 flex items-start">
                                    <dt className="text-base font-semibold leading-7 text-gray-900">
                                        <div className="absolute left-0 top-0 flex h-5 w-5 items-center justify-center rounded-lg bg-indigo-600">
                                            <ArrowPathIcon className="h-4 w-4 text-white" aria-hidden="true" />
                                        </div>
                                    </dt>
                                    <dd className="ml-8 mt-1 text-base leading-7 text-gray-600">Select a package, give the requirements requested by the seller and do the secure payment.</dd>
                                </div>
                                <div className="relative pl-5 flex items-start">
                                    <dt className="text-base font-semibold leading-7 text-gray-900">
                                        <div className="absolute left-0 top-0 flex h-5 w-5 items-center justify-center rounded-lg bg-indigo-600">
                                            <ArrowPathIcon className="h-4 w-4 text-white" aria-hidden="true" />
                                        </div>
                                    </dt>
                                    <dd className="ml-8 mt-1 text-base leading-7 text-gray-600">Once the order is placed, the Seller has to start working on the listing. Upon changing the status to Started, the countdown will start. </dd>
                                </div>
                                <div className="relative pl-5 flex items-start">
                                    <dt className="text-base font-semibold leading-7 text-gray-900">
                                        <div className="absolute left-0 top-0 flex h-5 w-5 items-center justify-center rounded-lg bg-indigo-600">
                                            <ArrowPathIcon className="h-4 w-4 text-white" aria-hidden="true" />
                                        </div>
                                    </dt>
                                    <dd className="ml-8 mt-1 text-base leading-7 text-gray-600">The seller must deliver the product wihing the delivery days. Once delivered, the buyer can either accept or return for revision</dd>
                                </div>
                                <div className="relative pl-5 flex items-start">
                                    <dt className="text-base font-semibold leading-7 text-gray-900">
                                        <div className="absolute left-0 top-0 flex h-5 w-5 items-center justify-center rounded-lg bg-indigo-600">
                                            <ArrowPathIcon className="h-4 w-4 text-white" aria-hidden="true" />
                                        </div>
                                    </dt>
                                    <dd className="ml-8 mt-1 text-base leading-7 text-gray-600">Once accepted, the order is considered as completed</dd>
                                </div>
                                <div className="relative pl-5 flex items-start">
                                    <dt className="text-base font-semibold leading-7 text-gray-900">
                                        <div className="absolute left-0 top-0 flex h-5 w-5 items-center justify-center rounded-lg bg-indigo-600">
                                            <ArrowPathIcon className="h-4 w-4 text-white" aria-hidden="true" />
                                        </div>
                                    </dt>
                                    <dd className="ml-8 mt-1 text-base leading-7 text-gray-600">Tada!! Your work is done</dd>
                                </div>
                            </dl>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Guide