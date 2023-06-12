import React from 'react'

const Chatbox = () => {
    return (
        <>
            <Navbar />
            <div className="flex-1 bg-white p-4">
                <div className="h-full border border-gray-300 rounded-md p-4 flex flex-col justify-between">
                    <div className="flex-1 overflow-y-auto">
                        {/* Display Messages */}
                        <div className="mb-4">
                            <div className="flex items-start mb-2">
                                <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
                                <div className="bg-gray-200 rounded-lg p-2">
                                    <p className="text-sm">Message 1</p>
                                    <p className="text-xs text-gray-500">Time</p>
                                </div>
                            </div>
                            <div className="flex items-start mb-2">
                                <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
                                <div className="bg-gray-200 rounded-lg p-2">
                                    <p className="text-sm">Message 2</p>
                                    <p className="text-xs text-gray-500">Time</p>
                                </div>
                            </div>
                            <div className="flex items-end justify-end mb-2">
                                <div className="bg-green-500 rounded-lg p-2">
                                    <p className="text-sm text-white">Your Message</p>
                                    <p className="text-xs text-white">Time</p>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-gray-300 ml-3"></div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        {/* Message Input */}
                        <div className="flex">
                            <input
                                type="text"
                                className="flex-1 px-4 py-2 rounded-md border-gray-300 focus:outline-none"
                                placeholder="Type your message..."
                            />
                            <button className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md">
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Chatbox