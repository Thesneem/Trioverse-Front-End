// import React, { useEffect, useState } from 'react'
// import Navbar from '../../components/user/Navbar'
// import axios from 'axios'
// import { BASE_URL } from '../../config'
// import { Link, useNavigate } from 'react-router-dom'
// import { FcApproval, FcCancel } from "react-icons/fc";
// import { RiSearchLine } from 'react-icons/ri';
// import { useSelector, useDispatch } from 'react-redux'
// import { setCategories } from '../../redux/categorySlice';


// const BrowseCategories = () => {
//     const navigate = useNavigate()
//     const [listings, setListings] = useState([])
//     //for search sort filter pagination purpose

//     const [searchQuery, setSearchQuery] = useState('');
//     const [selectedCategory, setSelectedCategory] = useState('');
//     const [selectedSortOption, setSelectedSortOption] = useState('');
//     const [currentPage, setCurrentPage] = useState(1);
//     const [lastPage, setLastPage] = useState(0);

//     const fetchListings = async () => {
//         try {
//             const response = await axios.get(`/allListings`, {
//                 params: {
//                     search: searchQuery,
//                     category: selectedCategory,
//                     sort: selectedSortOption,
//                     page: currentPage,
//                 }
//             })
//             console.log(response)
//             setListings(response.data.listings)
//             setLastPage(response.data.lastPage);
//         }
//         catch (err) {
//             console.log(err)
//         }
//     }

//     const fetchCategories = async () => {
//         try {

//             const response = await axios.get(`/categories`, {
//                 headers: {
//                     'token': `Bearer ${localStorage.getItem('userToken')} `
//                 }
//             },
//                 {
//                     credentials: true
//                 }

//             )
//             console.log("HELl ctegories", response)
//             dispatch(setCategories(response.data.categories))
//         }
//         catch (err) {
//             console.log(err)
//         }
//     }

//     const categories = useSelector((state) => state.categories.categories)
//     const dispatch = useDispatch()


//     useEffect(() => {
//         fetchListings()
//         fetchCategories()
//     }, [])

//     const handlePageChange = (page) => {
//         setCurrentPage(page);
//     };

//     const handleClick = (id) => {
//         console.log('listing ID', id)
//         navigate(`/viewListing/${id}`)
//     }

//     return (
//         <>
//             <Navbar />
//             {listings && (
//                 <div className="mx-24 mb-24">

//                     <h3 className="text-4xl mb-10">
//                         Listings    {/* Results for <strong>{q}</strong> */}
//                     </h3>

//                     <div className="flex gap-4">
//                         {/* search box */}
//                         <div className="relative">
//                             <input
//                                 type="text"
//                                 placeholder="Type here"
//                                 className="input input-bordered w-full max-w-xs pr-8"
//                                 value={searchQuery}
//                                 onChange={(e) => setSearchQuery(e.target.value)}
//                             />
//                             <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
//                                 <RiSearchLine className="text-gray-400" />
//                             </div>
//                         </div>
//                         {/* filter */}
//                         <div>
//                             <select className="select select-bordered w-full max-w-xs" value={selectedCategory}
//                                 onChange={(e) => setSelectedCategory(e.target.value)}>
//                                 <option disabled selected>Select Category</option>
//                                 <option value=''>All</option>
//                                 {categories?.map(({ category, _id }) => (
//                                     <option key={_id} value={_id}>{category}</option>
//                                 ))}
//                             </select>
//                         </div>
//                         {/* sort */}
//                         <select className="select select-bordered w-full max-w-xs" value={selectedSortOption}
//                             onChange={(e) => setSelectedSortOption(e.target.value)}
//                         >
//                             <option disabled selected>Sort by Price</option>
//                             <option value='asc'>From Low to High</option>
//                             <option value='desc'>From High to Low</option>
//                         </select>
//                         <button className='btn btn-success' onClick={fetchListings}>Apply</button>
//                     </div>
//                     <div>
//                         <div className="my-4">
//                             <span className="text-[#74767e] font-medium ">
//                                 {listings?.length} services available
//                             </span>
//                         </div>
//                         <div className="grid grid-cols-4">
//                             {listings?.map((listing) => (
//                                 // <SearchGridItem gig={gig} key={gig.id} />

//                                 <div
//                                     className="max-w-[300px] flex flex-col gap-2 p-1 cursor-pointer mb-8" onClick={() => handleClick(listing?._id)} >

//                                     <div className="relative w-64 h-40 " >
//                                         <img
//                                             src={`${BASE_URL}/public/uploads/listingImages/${listing?.images[0]}`}
//                                             alt="gig"
//                                             fill
//                                             className="rounded-xl"
//                                         />
//                                     </div>
//                                     <div className="flex items-center gap-2">
//                                         <div>
//                                             {listing?.seller_id?.profile_pic &&
//                                                 < img
//                                                     src={`${BASE_URL}/public/uploads/profilepics/${listing?.seller_id.profile_pic}`}
//                                                     alt="profile"
//                                                     height={30}
//                                                     width={30}
//                                                     className="rounded-full"
//                                                 />
//                                             }
//                                             {/* // ) : (
//                                             //     <div className="bg-purple-500 h-7 w-7 flex items-center justify-center rounded-full relative">
//                                             //         <span className="text-lg text-white">
//                                             //             {gig.createdBy.email[0].toUpperCase()}
//                                             //         </span>
//                                             //     </div>
//                                             // )} */}
//                                         </div>
//                                         <span className="text-md ">
//                                             <strong className="font-medium">{listing?.seller_id.userName}</strong>
//                                         </span>
//                                         <span className="ml-auto">{listing?.listing_status === 'Available' ? <FcApproval /> : <FcCancel />}</span>
//                                     </div>
//                                     <div>
//                                         <p className="line-clamp-2 text-[#404145]">{listing?.listingTitle}</p>
//                                     </div>
//                                     {/* <div className="flex items-center gap-1 text-yellow-400">
//                                         <FaStar />
//                                         <span>
//                                             <strong className="font-medium">{calculateRatings()}</strong>
//                                         </span>
//                                         <span className="text-[#74767e]">({gig.reviews.length})</span>
//                                     </div>
//                                     <div> */}
//                                     < strong className="font-medium" > From ${listing.packages[0].price}</strong>
//                                 </div>
//                                 // </div>
//                             ))}
//                         </div >
//                     </div >
//                     <div className="justify-center">
//                         <div className="join">
//                             <button
//                                 className="join-item btn"
//                                 onClick={() => handlePageChange(currentPage - 1)}
//                                 disabled={currentPage === 1}
//                             >
//                                 «
//                             </button>
//                             {[...Array(lastPage)].map((_, index) => (
//                                 <button
//                                     key={index}
//                                     className={`join-item btn ${currentPage === index + 1 ? 'active' : ''
//                                         }`}
//                                     onClick={() => handlePageChange(index + 1)}
//                                 >
//                                     Page {index + 1}
//                                 </button>
//                             ))}
//                             <button
//                                 className="join-item btn"
//                                 onClick={() => handlePageChange(currentPage + 1)}
//                                 disabled={currentPage === lastPage}
//                             >
//                                 »
//                             </button>
//                         </div>
//                     </div>

//                 </div >
//             )}

//         </>
//     )
// }

// export default BrowseCategories















import React, { useEffect, useState } from 'react';
import Navbar from '../../components/user/Navbar';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { Link, useNavigate } from 'react-router-dom';
import { FcApproval, FcCancel } from "react-icons/fc";
import { RiSearchLine } from 'react-icons/ri';
import { useSelector, useDispatch } from 'react-redux';
import { setCategories } from '../../redux/categorySlice';


const BrowseCategories = () => {
    const navigate = useNavigate();
    const [listings, setListings] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSortOption, setSelectedSortOption] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const fetchListings = async () => {
        try {
            const response = await axios.get(`/allListings`, {
                params: {
                    search: searchQuery,
                    category: selectedCategory,
                    sort: selectedSortOption,
                    page: currentPage,
                }
            });
            setListings(response.data.listings);
            setTotalPages(response.data.totalPages);
        } catch (err) {
            console.log(err);
        }
    };

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`/categories`, {
                    headers: {
                        'token': `Bearer ${localStorage.getItem('userToken')} `
                    },
                    credentials: true
                });
                dispatch(setCategories(response.data.categories));
            } catch (err) {
                console.log(err);
            }
        };
        fetchCategories();
        fetchListings()
    }, [currentPage]);

    const categories = useSelector((state) => state.categories.categories);
    const dispatch = useDispatch();

    const handlePageChange = (page) => {
        setCurrentPage(page);
        console.log(page)
    };

    const handleClick = (id) => {
        console.log('listing ID', id);
        navigate(`/viewListing/${id}`);
    };

    return (
        <>
            <Navbar />
            {listings && (
                <div className="mx-24 mb-24">
                    <h3 className="text-4xl mb-10">
                        Listings
                    </h3>
                    <div className="flex gap-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered w-full max-w-xs pr-8"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <RiSearchLine className="text-gray-400" />
                            </div>
                        </div>
                        <div>
                            <select
                                className="select select-bordered w-full max-w-xs"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                <option disabled value=''>Select Category</option>
                                <option value=''>All</option>
                                {categories?.map(({ category, _id }) => (
                                    <option key={_id} value={_id}>{category}</option>
                                ))}
                            </select>
                        </div>
                        <select
                            className="select select-bordered w-full max-w-xs"
                            value={selectedSortOption}
                            onChange={(e) => setSelectedSortOption(e.target.value)}
                        >
                            <option disabled value=''>Sort by Price</option>
                            <option value='asc'>From Low to High</option>
                            <option value='desc'>From High to Low</option>
                        </select>
                        <button className='btn btn-success' onClick={fetchListings}>Apply</button>
                    </div>
                    <div>
                        <div className="my-4">
                            <span className="text-[#74767e] font-medium">
                                {listings?.length} services available
                            </span>
                        </div>
                        <div className="grid grid-cols-4">
                            {listings?.map((listing) => (
                                <div
                                    key={listing._id}
                                    className="max-w-[300px] flex flex-col gap-2 p-1 cursor-pointer mb-8"
                                    onClick={() => handleClick(listing._id)}
                                >
                                    <div className="relative w-64 h-40 mb-3">
                                        <img
                                            src={`${BASE_URL}/public/uploads/listingImages/${listing?.images[0]}`}
                                            alt="gig"
                                            fill
                                            className="rounded-xl w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div>
                                            {listing?.seller_id?.profile_pic && (
                                                <img
                                                    src={`${BASE_URL}/public/uploads/profilepics/${listing?.seller_id.profile_pic}`}
                                                    alt="profile"
                                                    height={30}
                                                    width={30}
                                                    className="rounded-full"
                                                />
                                            )}
                                        </div>
                                        <span className="text-md">
                                            <strong className="font-medium">{listing?.seller_id.userName}</strong>
                                        </span>
                                        <span className="ml-auto">
                                            {listing?.listing_status === 'Available' ? <FcApproval /> : <FcCancel />}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="line-clamp-2 text-[#404145]">{listing?.listingTitle}</p>
                                    </div>
                                    <strong className="font-medium">From ${listing.packages[0].price}</strong>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="justify-center">
                        <div className="join">
                            <button
                                className="join-item btn"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                «
                            </button>
                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index + 1}
                                    className={`join-item btn ${currentPage === index + 1 ? 'active' : ''}`}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    Page {index + 1}
                                </button>
                            ))}
                            <button
                                className="join-item btn"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                »
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default BrowseCategories;




