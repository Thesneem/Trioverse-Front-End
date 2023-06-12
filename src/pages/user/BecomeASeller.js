import React, { useEffect, useState } from 'react'
import { Link, useNavigate, NavLink } from 'react-router-dom'
import Navbar from '../../components/user/Navbar'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { setUserDetails } from '../../redux/userSlice';
import toast, { Toaster } from 'react-hot-toast';



const BecomeASeller = () => {
    const navigate = useNavigate()
    const inputClassName =
        "block p-4 w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:ring-blue-500 focus:border-blue-500";
    const labelClassName =
        "mb-2 text-lg font-medium text-gray-900  dark:text-white";
    const [features, setfeatures] = useState([]);
    const [file, setFile] = useState(null);
    // const [skill, setskill] = useState([]);
    const [data, setData] = useState({
        occupation: "",
        experience: 0,
        education: "",
        personal_Website: "",
        social_media_platform: "",
        social_media_links: "",
        feature: "",
        //skills: "",
    });





    const checkFileExtension = (filename) => {
        const allowedExtensions = /(\.doc|\.docx|\.pdf|\.txt)$/i;
        return allowedExtensions.test(filename);
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && checkFileExtension(selectedFile.name)) {
            setFile(selectedFile);
            //toast.success("File Upload success")
        } else {
            setFile(null);
            // setMessage(
            //     "Invalid file type. Please select a .doc, .docx, .pdf, or .txt file."
            // );
            toast.error("Incorrect file type")
        }
    };

    const removeFeature = (index) => {
        const clonedFeatures = [...features];
        clonedFeatures.splice(index, 1);
        setfeatures(clonedFeatures);
    };

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const addSkill = () => {
        if (data.feature) {
            setfeatures([...features, data.feature]);
            setData({ ...data, feature: "" });
            console.log(features)
        }
    };

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

    const createSeller = async () => {
        console.log("hiii")
        const { occupation, experience, education, personal_Website, social_media_platform, social_media_links } = data
        console.log(data)
        if (
            occupation &&
            experience > 0 &&
            education &&
            features.length &&
            file
        ) {
            const formData = new FormData();
            const skills = features
            formData.append("idProof", file);
            const sellerData = {
                occupation,
                experience,
                education,
                personal_Website,
                social_media_links,
                skills,
                social_media_platform,


            }
            console.log(sellerData)
            const response = await axios.post(`/createSeller`, formData,

                {
                    credentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                        'token': `Bearer ${localStorage.getItem('userToken')} `
                    }
                    ,
                    params: sellerData

                })

            if (response.status === 201) {
                toast.success('Seller Profile submitted')
                navigate("/sellerprofile");
            }
        }
    }

    return (
        <>

            < div >
                <Navbar />
            </div >

            <div className='flex justify-center m-5'>
                <ul className="steps">


                    <li className={`step ${user?.isProfile_set ? ' step-success' : ''} mr-2`}>
                        <Link to='/overview'><span>Set User Profile</span></Link>
                    </li>

                    <li className={`step ${user?.isSellerProfile_set ? 'step-success' : ''} mr-2`}>Set seller profile</li>
                    <li className={`step  mr-2`}> Approval of seller Profile</li>
                    <li className={`step  mr-2`}>You're a seller Now</li>
                </ul>
            </div >
            <Toaster />
            <div className="min-h-[80vh] my-10 mt-0 px-32">
                <h1 className="text-6xl text-gray-900 mb-5">Create your seller profile</h1>
                <h3 className="text-3xl text-gray-900 mb-5">
                    Enter the details to become a Seller
                </h3>
                <form action="" className="flex flex-col gap-5 mt-10">
                    <div className="grid grid-cols-2 gap-11">
                        <div>
                            <label htmlFor="occupation" className={labelClassName}>
                                Occupation
                            </label>
                            <input
                                name="occupation"
                                value={data.occupation}
                                type="text"
                                id="occupation"
                                className={inputClassName}
                                placeholder='Occupation'
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="experience" className={labelClassName}>
                                Experience in Years
                            </label>
                            <input
                                type='number'
                                id="experience"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
                                name="experience"
                                placeholder='Experience in years'
                                onChange={handleChange}
                                value={data.experience}
                            />
                        </div>
                    </div >
                    <div>
                        <label htmlFor="education" className={labelClassName}>
                            Education
                        </label>
                        <input
                            name="education"
                            value={data.education}
                            onChange={handleChange}
                            type="text"
                            id="education"
                            className={inputClassName}
                            placeholder='Education'
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="personal_Website" className={labelClassName}>
                            Personal WebSite
                        </label>
                        <input
                            name="personal_Website"
                            value={data.personal_Website}
                            onChange={handleChange}
                            type="text"
                            id="personal_Website"
                            className={inputClassName}
                            placeholder='Link to your personal website'
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-11">
                        <div>
                            <label htmlFor="social_media_platform" className={labelClassName}>Social Media Presence</label>
                            <select
                                id="social_media_platform"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
                                name="social_media_platform"
                                onChange={handleChange}
                                defaultValue="Choose"
                            >
                                <option value="Choose" disabled>
                                    Choose
                                </option>
                                <option value="LinkedIn">
                                    LinkedIn
                                </option>

                            </select>
                        </div>
                        <div>
                            <label htmlFor="social_media_links" className={labelClassName}>
                                Link
                            </label>
                            <input
                                type="text"
                                id="social_media_links"
                                className={inputClassName}
                                placeholder="Social Media Links"
                                name="social_media_links"
                                value={data.social_media_links}
                                onChange={handleChange}
                                disabled={!data.social_media_platform} // Disable if no value selected
                            />
                        </div>
                    </div >
                    <div className="grid grid-cols-2 gap-11">
                        <div>
                            <label htmlFor="features" className={labelClassName}>
                                Features
                            </label>
                            <div className="flex gap-3 items-center mb-5">
                                <input
                                    type="text"
                                    id="features"
                                    className={inputClassName}
                                    placeholder="Enter Skills"
                                    name="feature"
                                    value={data.feature}
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800  font-medium  text-lg px-10 py-3 rounded-md "
                                    onClick={addSkill}
                                >
                                    Add
                                </button>
                            </div>
                            <ul className="flex gap-2 flex-wrap">
                                {features.map((feature, index) => {
                                    return (
                                        <li
                                            key={feature + index.toString()}
                                            className="flex gap-2 items-center py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 cursor-pointer hover:border-red-200"
                                        >
                                            <span>{feature}</span>
                                            <span
                                                className="text-red-700"
                                                onClick={() => removeFeature(index)}
                                            >
                                                X
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        <div>
                            <label className={labelClassName}>ID Proof</label>
                            <input name='idProof'
                                type="file"
                                onChange={handleFileChange}
                                className={inputClassName}
                                accept="application/pdf,application/docx,application/doc"
                            />
                        </div>
                    </div >

                    <div>
                        <button
                            className="border   text-lg font-semibold px-5 py-3   border-[#1DBF73] bg-[#1DBF73] text-white rounded-md"
                            type="button"
                            onClick={createSeller}
                        >
                            Create
                        </button>
                    </div>
                </form >
            </div >


        </>
    )
}

export default BecomeASeller