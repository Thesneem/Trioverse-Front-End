import React, { useEffect } from 'react'
import Navbar from '../../components/user/Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { setUserDetails } from '../../redux/userSlice';
import { Link } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../../config'
import toast, { Toaster } from 'react-hot-toast';


const SellerProfile = () => {
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
    // const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        console.log('TESTINGUSEEFFECT')
        fetchProfile()
        // setIsLoaded(true)
    }, [dispatch])


    return (
        <>
            <div>
                <Navbar />
            </div>

            <div className="flex justify-center text-center m-5">
                {user?.sellerProfileStatus.pending_Approval.state && (!user.sellerProfileStatus.approved.state && !user.sellerProfileStatus.rejected.state) && (
                    <div className="flex justify-center alert alert-info text-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="stroke-current shrink-0 w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                        </svg>
                        <span>
                            Your Seller Application has been submitted for approval. You can create listings once it gets approved
                        </span>
                    </div>
                )}
            </div>



            <div className='flex justify-center m-5'>
                <Toaster />
                <ul className="steps">
                    <li className={`step ${user?.isProfile_set ? ' step-success' : ''} mr-2`}>
                        <Link to='/overview'><span>Set User Profile</span>
                        </Link></li>
                    <li className={`step ${user?.isSellerProfile_set ? 'step-success' : ''} mr-2`}>Set seller profile</li>
                    <li className={`step ${user?.sellerProfileStatus.approved.state ? 'step-success' : ''} mr-2`}> Approval of seller Profile</li>
                    <li className={`step ${user?.sellerProfileStatus.approved.state ? 'step-success' : ''} mr-2`}>You're a seller Now.You can create your Listings</li>
                </ul>
            </div >
            {/* <div>
                {!(user?.isSellerProfile_set) ? (
                    <div className='flex justify-end mr-4 '>
                        <Link to='/createListing'>< button className=' btn btn-success hover:btn-warning'>Create a Listing</button></Link>
                    </div>
                ) : null}
                <div className='flex justify-end mr-4 '>
                    {(user?.sellerProfileStatus.approved.state || user?.sellerProfileStatus.rejected.state) ? (
                        <Link to='/createListing'>< button className=' btn btn-success hover:btn-warning'>Create a Listing</button></Link>
                    ) : null}
                </div >
            </div> */}


            < div >
                {!user?.isSellerProfile_set && (
                    <div className='flex justify-end mr-4'>
                        <Link to='/becomeASeller'>
                            <button className='btn btn-success hover:btn-warning'>Create Seller Profile</button>
                        </Link>
                    </div>
                )
                }
                {
                    user?.sellerProfileStatus.approved.state || user?.sellerProfileStatus.rejected.state ? (
                        <div className='flex justify-end mr-4'>
                            <Link to='/createListing'>
                                <button className='btn btn-success hover:btn-warning'>Create a Listing</button>
                            </Link>
                        </div>
                    ) : null
                }
            </div >



            <div className="flex flex-col items-center justify-start min-h-[80vh] gap-3">
                <div className='text-center'>
                    <h2 className="text-3xl font-bold mb-4">Seller Profile</h2>
                </div>
                <div className="bg-purple-500 h-36 w-36 flex items-center justify-center rounded-full relative" >
                    {user && `${user.profile_pic} ` ? (
                        < img
                            src={`${BASE_URL}/public/uploads/profilepics/${user.profile_pic}`}
                            alt="profile"
                            fill
                            className="rounded-full"
                        />) : (

                        <span className="text-6xl text-white">
                            {user && `${user.email} `}
                        </span>
                    )}
                </div>

                <div className="container mx-auto p-6 flex justify-center text-center">
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <p className="mb-2">
                            <span className="font-semibold">Username:{user?.userName}</span>
                        </p>
                        <p className="mb-2">
                            <span className="font-semibold">About:</span>{user?.about}
                        </p>
                        <p className="mb-2">
                            <span className="font-semibold">Occupation:</span>{user?.occupation}
                        </p>
                        <p className="mb-2">
                            <span className="font-semibold">Experience:</span>{user?.experience}
                        </p>
                        <p className="mb-2">

                            <span className="font-semibold">Skills:</span>
                            {user?.skills.map((skill, index) => (
                                <span key={index}>{skill}, </span>
                            ))}
                        </p>
                        <p className="mb-2">
                            <span className="font-semibold">Education:</span>{user?.education}
                        </p>
                        <p className="mb-2">
                            <span className="font-semibold">Personal Website:</span>
                            <a href={user?.personal_Website} target="_blank" rel="noopener noreferrer">
                                {user?.personal_Website}
                            </a>
                        </p>
                        <p className="mb-2">
                            <span className="font-semibold">Social Media Platform:</span>
                            {user?.social_media[0]?.social_media_platform}

                        </p>
                        <p className="mb-2">
                            <span className="font-semibold">Social Media Links:</span>
                            <a href={user?.social_media[0]?.social_media_links} target="_blank" rel="noopener noreferrer">
                                {user?.social_media[0]?.social_media_links}
                            </a>
                        </p>
                        <p className="mb-2">
                            <span className="font-semibold">IDProof:</span>
                            <a href={`${BASE_URL}/public/files/IDProofs/${user?.idProof}`} target="_blank" rel="noopener noreferrer">
                                {user?.idProof}
                            </a>
                        </p>
                        {/* Add more fields as needed */}
                    </div>
                </div>

            </div >
        </>
    )
}

export default SellerProfile