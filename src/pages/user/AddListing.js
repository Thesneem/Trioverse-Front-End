// import React, { useEffect, useState, } from 'react'
// import axios from 'axios'
// import Navbar from '../../components/user/Navbar'
// import { useSelector, useDispatch } from 'react-redux'
// import { setCategories } from '../../redux/categorySlice';
// import { setPackages } from '../../redux/packageSlice'
// import TestTable from '../../components/user/TestTable';


// const AddListing = () => {
//     const [selectedcategory, setselectedCategory] = useState([])
//     const [selectedPackages, setSelectedPackages] = useState([]);
//     const [files, setFile] = useState([]);
//     const [features, setfeatures] = useState([]);
//     const [formData, setFormData] = useState([]);

//     const handlePackageChange = (event) => {
//         const { value, checked } = event.target;
//         if (checked) {
//             setSelectedPackages((prevSelectedPackages) => [...prevSelectedPackages, value]);
//             setFormData((prevFormData) => [...prevFormData, { package: value, shortDescription: '', deliverables: '', delivery_Time: '', revisions: '', price: '' }]);
//         } else {
//             setSelectedPackages((prevSelectedPackages) =>
//                 prevSelectedPackages.filter((packageValue) => packageValue !== value)
//             );
//             setFormData((prevFormData) =>
//                 prevFormData.filter((data) => data.package !== value)
//             );
//         }
//     };

//     const handleChangecategory = (value) => {
//         console.log(value)
//     }

//     const handleInputChange = (event, packageValue) => {
//         const { name, value } = event.target;
//         setFormData((prevFormData) =>
//             prevFormData.map((data) => {
//                 if (data.package === packageValue) {
//                     return {
//                         ...data,
//                         [name]: value
//                     };
//                 }
//                 return data;
//             })
//         );
//     };

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
//             console.log("HELl ctegories", response.data.categories)
//             dispatch(setCategories(response.data.categories))
//         }
//         catch (err) {
//             console.log(err)
//         }
//     }
//     // const selectcategory = gigdata.category
//     const fetchPackages = async () => {
//         try {
//             const response = await axios.get(`/packages`, {
//                 headers: {
//                     'token': `Bearer ${localStorage.getItem('userToken')} `
//                 }
//             },
//                 {
//                     credentials: true
//                 }

//             )
//             console.log("Hipackage", response.data.packages)
//             dispatch(setPackages(response.data.packages))
//         }
//         catch (err) {
//             console.log(err)
//         }
//     }

//     const categories = useSelector((state) => state.categories.categories)
//     const subcategories = categories.subcategories

//     const packages = useSelector((state) => state.packages.packages)
//     const dispatch = useDispatch()
//     console.log('PACKAGES', packages)
//     console.log('CATEGORIESS', categories)



//     useEffect(() => {
//         fetchCategories()
//         fetchPackages()

//     }, [dispatch])



//     const [data, setData] = useState({
//         title: "",
//         category: "",
//         subcategory: "",
//         description: "",
//         time: 0,
//         revisions: 0,
//         feature: "",
//         price: 0,
//         shortDesc: "",
//     });
//     const removeFeature = (index) => {
//         const clonedFeatures = [...features];
//         clonedFeatures.splice(index, 1);
//         setfeatures(clonedFeatures);
//     };
//     const handleChange = (e) => {
//         setData({ ...data, [e.target.name]: e.target.value });
//     };

//     const addFeature = () => {
//         if (data.feature) {
//             setfeatures([...features, data.feature]);
//             setData({ ...data, feature: "" });
//         }
//     };
//     const addGig = async () => {
//         const { category, description, price, revisions, time, title, shortDesc } =
//             data;
//         if (
//             category &&
//             description &&
//             title &&
//             features.length &&
//             files.length &&
//             price > 0 &&
//             shortDesc.length &&
//             revisions > 0 &&
//             time > 0
//         ) {
//             const formData = new FormData();
//             files.forEach((file) => formData.append("images", file));
//             const gigData = {
//                 title,
//                 description,
//                 category,
//                 features,
//                 price,
//                 revisions,
//                 time,
//                 shortDesc,
//             };
//             // const response = await axios.post(ADD_GIG_ROUTE, formData, {
//             //     withCredentials: true,
//             //     headers: {
//             //         "Content-Type": "multipart/form-data",
//             //         Authorization: `Bearer ${cookies.jwt}`,
//             //     },
//             //     params: gigData,
//             // });
//             // if (response.status === 201) {
//             //     router.push("/seller/gigs");
//             // }
//         }
//     };

//     const inputClassName =
//         "block p-4 w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:ring-blue-500 focus:border-blue-500";
//     const labelClassName =
//         "mb-2 text-lg font-medium text-gray-900  dark:text-white";
//     return (

//         <div>
//             <Navbar />
//             <div className="min-h-[80vh] my-10 mt-0 px-32">
//                 <h1 className="text-6xl text-gray-900 mb-5">Create a new Listing</h1>
//                 <h3 className="text-3xl text-gray-900 mb-5">
//                     Enter the details to create the listing
//                 </h3>
//                 <form action="" className="flex flex-col gap-5 mt-10">
//                     <div className="grid grid-cols-2 gap-11">
//                         <div>
//                             <label htmlFor="title" className={labelClassName}>
//                                 Gig Title
//                             </label>
//                             <input
//                                 name="listingTitle"
//                                 value={data.listingTitle}
//                                 onChange={handleChange}
//                                 type="text"
//                                 id="title"
//                                 className={inputClassName}
//                                 placeholder="e.g. I will do something I'm really good at"
//                                 required
//                             />
//                         </div>
//                         <div className="grid grid-cols-2 gap-11">

//                             <div>
//                                 <label htmlFor="categories" className={labelClassName}>
//                                     Select a Category
//                                 </label>
//                                 <select
//                                     id="categories"
//                                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
//                                     name="category"
//                                     onChange={(e) => { handleChangecategory(e.target.value) }}

//                                 >
//                                     <option value=''>Select Category</option>
//                                     {categories.map(({ selectcategory, _id }) => (
//                                         <option key={_id} value={selectcategory}>
//                                             {selectcategory}
//                                         </option>
//                                     ))}
//                                 </select>

//                             </div>

//                             <div>
//                                 <label htmlFor="subcategories" className={labelClassName}>
//                                     Select a SubCategory
//                                 </label>
//                                 <select
//                                     id="subcategories"
//                                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
//                                     name="subcategory"
//                                     onChange={handleChange}
//                                     defaultValue="Choose a SubCategory"
//                                 >
//                                     {/* {selectcategory.subcategories.map((subcategory) => (

//                                         < option key={subcategory._id} value={subcategory} >
//                                             {subcategory}
//                                         </option>

//                                     ))} */}



//                                 </select>
//                             </div>

//                         </div>
//                     </div>
//                     <div>
//                         <label htmlFor="description" className={labelClassName}>
//                             Gig Description
//                         </label>
//                         <textarea
//                             id="description"
//                             className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
//                             placeholder="Write a short description"
//                             name="description"
//                             value={data.description}
//                             onChange={handleChange}
//                         ></textarea>
//                     </div>

//                     <div className="grid grid-cols-2 gap-11">
//                         <div>
//                             <label htmlFor="features" className={labelClassName}>
//                                 Features
//                             </label>
//                             <div className="flex gap-3 items-center mb-5">
//                                 <input
//                                     type="text"
//                                     id="features"
//                                     className={inputClassName}
//                                     placeholder="Enter a Feature Name"
//                                     name="feature"
//                                     value={data.feature}
//                                     onChange={handleChange}
//                                 />
//                                 <button
//                                     type="button"
//                                     className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800  font-medium  text-lg px-10 py-3 rounded-md "
//                                     onClick={addFeature}
//                                 >
//                                     Add
//                                 </button>
//                             </div>
//                             <ul className="flex gap-2 flex-wrap">
//                                 {features.map((feature, index) => {
//                                     return (
//                                         <li
//                                             key={feature + index.toString()}
//                                             className="flex gap-2 items-center py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 cursor-pointer hover:border-red-200"
//                                         >
//                                             <span>{feature}</span>
//                                             <span
//                                                 className="text-red-700"
//                                                 onClick={() => removeFeature(index)}
//                                             >
//                                                 X
//                                             </span>
//                                         </li>
//                                     );
//                                 })}
//                             </ul>
//                         </div>
//                         <div className="grid grid-cols-2 gap-11">

//                             <div>
//                                 <label htmlFor="image" className={labelClassName}>
//                                     Gig Images
//                                 </label>
//                                 <div>
//                                     <input type='file' multiple name='images' />
//                                 </div>
//                             </div>
//                             <div>
//                                 <label htmlFor="video" className={labelClassName}>
//                                     Gig Videos
//                                 </label>
//                                 <div>
//                                     <input type='file' name='videos' />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     {/* tableStart */}
//                     <table className="w-full border border-gray-300">
//                         <thead>
//                             <tr>
//                                 <th className="bg-gray-200 text-left py-2 px-4">Options</th>
//                                 {packages.map((pack) => (
//                                     <th key={pack.package} className="bg-gray-200 text-left py-2 px-4">
//                                         <input
//                                             type="checkbox"
//                                             id={pack.package}
//                                             name="package"
//                                             value={pack.package}
//                                             checked={selectedPackages.includes(pack.package)}
//                                             onChange={handlePackageChange}
//                                         />
//                                         <label htmlFor={pack.package}> {pack.package}</label>
//                                     </th>
//                                 ))}
//                             </tr>
//                         </thead>
//                         <tbody>
//                             <tr>
//                                 <td className="py-2 px-4">Short description</td>
//                                 {packages.map((pack) => (
//                                     <td key={pack.package} className="py-2 px-4">
//                                         <input
//                                             type="text"
//                                             name='shortDescription'
//                                             className="border border-gray-300 rounded-md p-2 w-full"
//                                             placeholder="Short Description"
//                                             disabled={!selectedPackages.includes(pack.package)}
//                                             value={formData.find((data) => data.package === pack.package)?.shortDescription || ''}
//                                             onChange={(event) => handleInputChange(event, pack.package)}
//                                         />
//                                     </td>
//                                 ))}
//                             </tr>
//                             <tr>
//                                 <td className="py-2 px-4">Deliverables</td>
//                                 {packages.map((pack) => (
//                                     <td key={pack.package} className="py-2 px-4">
//                                         <input
//                                             type="text" name='deliverables'
//                                             className="border border-gray-300 rounded-md p-2 w-full"
//                                             placeholder="Deliverables"
//                                             disabled={!selectedPackages.includes(pack.package)}
//                                             value={formData.find((data) => data.package === pack.package)?.deliverables || ''}
//                                             onChange={(event) => handleInputChange(event, pack.package)}
//                                         />
//                                     </td>
//                                 ))}
//                             </tr>
//                             <tr>
//                                 <td className="py-2 px-4">Delivery Time</td>
//                                 {packages.map((pack) => (
//                                     <td key={pack.package} className="py-2 px-4">
//                                         <input
//                                             type="Number" name='delivery_Time'
//                                             className="border border-gray-300 rounded-md p-2 w-full"
//                                             placeholder="Delivery Time"
//                                             disabled={!selectedPackages.includes(pack.package)}
//                                             value={formData.find((data) => data.package === pack.package)?.delivery_Time || ''}
//                                             onChange={(event) => handleInputChange(event, pack.package)}
//                                         />
//                                     </td>
//                                 ))}
//                             </tr>
//                             <tr>
//                                 <td className="py-2 px-4">Revisions</td>
//                                 {packages.map((pack) => (
//                                     <td key={pack.package} className="py-2 px-4">
//                                         <input
//                                             type="number" name='revisions'
//                                             className="border border-gray-300 rounded-md p-2 w-full"
//                                             placeholder="Revisions"
//                                             disabled={!selectedPackages.includes(pack.package)}
//                                             value={formData.find((data) => data.package === pack.package)?.revisions || ''}
//                                             onChange={(event) => handleInputChange(event, pack.package)}
//                                         />
//                                     </td>
//                                 ))}
//                             </tr>
//                             <tr>
//                                 <td className="py-2 px-4">Price</td>
//                                 {packages.map((pack) => (
//                                     <td key={pack.package} className="py-2 px-4">
//                                         <input
//                                             type="number" name='price'
//                                             className="border border-gray-300 rounded-md p-2 w-full"
//                                             placeholder="Price"
//                                             disabled={!selectedPackages.includes(pack.package)}
//                                             value={formData.find((data) => data.package === pack.package)?.price || ''}
//                                             onChange={(event) => handleInputChange(event, pack.package)}
//                                         />
//                                     </td>
//                                 ))}
//                             </tr>
//                         </tbody>
//                     </table>
//                     {/* tableend */}

//                     <textarea placeholder="Requirements" className="textarea textarea-bordered textarea-lg w-full " ></textarea>

//                     <div>
//                         <button
//                             className="border   text-lg font-semibold px-5 py-3   border-[#1DBF73] bg-[#1DBF73] text-white rounded-md"
//                             type="button"
//                             onClick={addGig}
//                         >
//                             Create
//                         </button>
//                     </div>
//                 </form>
//             </div >
//         </div >
//     )
// }

// export default AddListing


import React, { useEffect, useState, } from 'react'
import axios from 'axios'
import Navbar from '../../components/user/Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { setCategories } from '../../redux/categorySlice';
import { setPackages } from '../../redux/packageSlice'
import { useFormik } from 'formik'
import { createListSchema } from '../../formSchemas/createListSchema'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const initialValues = {
    listingTitle: '',
    description: '',
    category: '',
    subcategory: '',
    delivery_Time: '',
    revisions: '',
    deliverables: '',
    price: '',
    shortDescription: '',
    features: '',
    images: '',
    videos: '',
    coverImage: '',
    requirements: '',
    package: ''
}



const CreateListing = () => {

    const navigate = useNavigate()

    const [selectCategory, setSelectCategory] = useState([])
    const [Features, setFeatures] = useState([]);
    const [selectedPackages, setSelectedPackages] = useState([]);
    const [packageData, setpackageData] = useState([])


    //Add feature 
    const removeFeature = (index) => {
        const clonedFeatures = [...Features];
        clonedFeatures.splice(index, 1);
        setFeatures(clonedFeatures);
    };
    const addFeature = () => {
        if (values.features) {
            setFeatures([...Features, values.features]);
            values.features = [...Features, values.features];

            // setData({ ...data, feature: "" });
            // values.features = Features

        }
    };

    const handlePackageChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedPackages((prevSelectedPackages) => [...prevSelectedPackages, value]);
            setpackageData((prevpackageData) => [...prevpackageData, { package: value, shortDescription: '', deliverables: '', delivery_Time: '', revisions: '', price: '' }]);
        } else {
            setSelectedPackages((prevSelectedPackages) =>
                prevSelectedPackages.filter((packageValue) => packageValue !== value)
            );
            setpackageData((prevpackageData) =>
                prevpackageData.filter((data) => data.package !== value)
            );
        }
    };


    const handleInputChange = (event, packageValue) => {
        const { name, value } = event.target;
        setpackageData((prevpackageData) =>
            prevpackageData.map((data) => {
                if (data.package === packageValue) {
                    const updatedData = {
                        ...data,
                        [name]: value
                    };
                    console.log(updatedData); // Log the updated data object
                    return updatedData;
                }
                return data;
            })

        )
    };


    const handleChangecategory = async (e) => {
        try {
            console.log(e)
            const response = await axios.get(`/selectcategory/${e.target.value}`)
            console.log('selectcategoryResp', response)
            setSelectCategory(response.data.selectcategory)
            console.log(selectCategory)
            handleChange(e)
        }
        catch (err) {
            console.log(err)
        }

    }

    const fetchCategories = async () => {
        try {

            const response = await axios.get(`/categories`, {
                headers: {
                    'token': `Bearer ${localStorage.getItem('userToken')} `
                }
            },
                {
                    credentials: true
                }

            )
            console.log("HELl ctegories", response.data.categories)
            dispatch(setCategories(response.data.categories))
        }
        catch (err) {
            console.log(err)
        }
    }

    const fetchPackages = async () => {
        try {
            const response = await axios.get(`/packages`, {
                headers: {
                    'token': `Bearer ${localStorage.getItem('userToken')} `
                }
            },
                {
                    credentials: true
                }

            )
            console.log("Hipackage", response.data.packages)
            dispatch(setPackages(response.data.packages))
        }
        catch (err) {
            console.log(err)
        }
    }



    const categories = useSelector((state) => state.categories.categories)
    const packages = useSelector((state) => state.packages.packages)
    //console.log(categories)
    const dispatch = useDispatch()

    useEffect(() => {
        fetchCategories()
        fetchPackages()

    }, [])


    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues,
        validationSchema: createListSchema,
        onSubmit: async (values, action) => {
            try {
                console.log('form')
                console.log('packagdata', packageData)
                values.package = packageData
                window.scrollTo({ top: 0, behavior: 'smooth' });
                //const formData = new FormData(); // create a new FormData object
                // formData.append('coverImage', values.coverImage); // append the coverImage field to the FormData
                // formData.append('images', values.images)
                const response = await axios.post(`/createList`,
                    values
                    ,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data', // set the correct Content-Type header for form data
                            'token': `Bearer ${localStorage.getItem('userToken')} `
                        }
                    }, {
                    credentials: true
                });

                console.log(response.data);
                if (response.data.success === true) {
                    toast.success('Listing created')
                    navigate('/sellerprofile')
                }
                else {
                    toast.error('Something went wrong.Please try again')
                }
                //             // action.resetForm();
                //             console.log(errors);
                //             // console.log('FORMDATA', formData);
            } catch (err) {
                //             // Handle error

                console.log(err)
            }
        },
    });




    const inputClassName =
        "block p-4 w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:ring-blue-500 focus:border-blue-500";
    const labelClassName =
        "mb-2 text-lg font-medium text-gray-900  dark:text-white";

    return (
        <div>
            <Navbar />
            <div className="min-h-[80vh] my-10 mt-0 px-32">
                <Toaster />
                <h1 className="text-6xl text-gray-900 mb-5">Create a new Listing</h1>
                <h3 className="text-3xl text-gray-900 mb-5">
                    Enter the details to create the listing
                </h3>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-10">
                    <div className="grid grid-cols-2 gap-11">
                        <div>
                            <label htmlFor="title" className={labelClassName}>
                                Gig Title
                            </label>
                            <input
                                name="listingTitle"
                                value={values.listingTitle}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                type="text"
                                id="title"
                                className={inputClassName}
                                placeholder="e.g. I will do something I'm really good at"
                                required
                            />
                            {errors.listingTitle && touched.listingTitle ? (
                                <p className="form-error text-red-500">{errors.listingTitle}</p>
                            ) : null}
                        </div>
                        <div className="grid grid-cols-2 gap-11">

                            <div>
                                <label htmlFor="categories" className={labelClassName}>
                                    Select a Category
                                </label>
                                <select
                                    id="categories"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
                                    name="category"
                                    onBlur={handleBlur}
                                    onChange={(e) => {
                                        handleChangecategory(e);

                                    }}

                                >
                                    <option value=''>Select Category</option>
                                    {categories.map(({ category, _id }) => (
                                        <option key={_id} value={_id}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                                {errors.category && touched.category ? (
                                    <p className="form-error text-red-500">{errors.category}</p>
                                ) : null}
                            </div>

                            <div>
                                <label htmlFor="subcategories" className={labelClassName}>
                                    Select a SubCategory
                                </label>
                                <select
                                    id="subcategories"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
                                    name="subcategory"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    defaultValue="Choose a SubCategory"
                                >
                                    <option value='Choose a SubCategory'>Choose a SubCategory</option>

                                    {selectCategory && selectCategory.map((category) => (
                                        category.subcategories && category.subcategories.map((subcategory, index) => (
                                            <option key={index} value={subcategory.subcategory}>
                                                {subcategory.subcategory}
                                            </option>
                                        ))
                                    ))}
                                </select>
                                {errors.subcategory && touched.subcategory ? (
                                    <p className="form-error text-red-500">{errors.subcategory}</p>
                                ) : null}
                            </div>

                        </div>
                    </div>
                    <div>
                        <label htmlFor="description" className={labelClassName}>
                            Gig Description
                        </label>
                        <textarea
                            id="description"
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Write a short description"
                            name="description"
                            onBlur={handleBlur}
                            value={values.description}
                            onChange={handleChange}
                        >

                        </textarea>
                        {errors.description && touched.description ? (
                            <p className="form-error text-red-500">{errors.description}</p>
                        ) : null}

                    </div>

                    <div className="grid grid-cols-2 gap-11">
                        <div>
                            <label htmlFor="Features" className={labelClassName}>
                                Features
                            </label>
                            <div className="flex gap-3 items-center mb-5">
                                <input
                                    type="text"
                                    id="Features"
                                    onBlur={handleBlur}
                                    className={inputClassName}
                                    placeholder="Enter a Feature Name"
                                    name="features"
                                    value={values.features}
                                    onChange={handleChange}
                                />

                                <button
                                    type="button"
                                    className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800  font-medium  text-lg px-10 py-3 rounded-md "
                                    onClick={addFeature}

                                >
                                    Add
                                </button>
                            </div>
                            {errors.features && touched.features ? (
                                <p className="form-error text-red-500">{errors.features}</p>
                            ) : null}

                            <div>
                                <ul className="flex gap-2 flex-wrap">
                                    {Features.map((feature, index) => {
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
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="grid grid-cols-3 gap-11">
                            <div>
                                <label htmlFor="coverImage" className={labelClassName}>
                                    Cover Image
                                </label>
                                <div>
                                    <input type='file'
                                        name='coverImage'
                                        id='coverImage'
                                        className={inputClassName}
                                        onChange={(e) => setFieldValue('coverImage', e.target.files[0])}
                                        accept="image/jpeg, image/png, image/gif, image/jpg"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="image" className={labelClassName}>
                                    Images
                                </label>
                                <div>
                                    <input type='file'
                                        id='images' multiple
                                        name='images'
                                        className={inputClassName}
                                        onChange={(e) => setFieldValue('images', e.target.files)}
                                        accept="image/jpeg, image/png, image/gif, image/jpg"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="videos" className={labelClassName}>
                                    Gig Videos
                                </label>
                                <div>
                                    <input type='file'
                                        id='videos'
                                        name='videos'
                                        className={inputClassName}
                                        onChange={(e) => setFieldValue('videos', e.target.files)}
                                        accept="video/mp4, video/webm, video/ogg"

                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* tableStart */}
                    <table className="w-full border border-gray-300">
                        <thead>
                            <tr>
                                <th className="bg-gray-200 text-left py-2 px-4">Options</th>
                                {packages.map((pack) => (
                                    <th key={pack.package} className="bg-gray-200 text-left py-2 px-4">
                                        <input
                                            type="checkbox"
                                            id={pack.package}
                                            name="package"
                                            onBlur={handleBlur}
                                            value={pack.package}
                                            checked={selectedPackages.includes(pack.package)}
                                            onChange={handlePackageChange}
                                        />
                                        <label htmlFor={pack.package}> {pack.package}</label>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="py-2 px-4">Short description</td>
                                {packages.map((pack) => (
                                    <td key={pack.package} className="py-2 px-4">
                                        <input
                                            type="text"
                                            name='shortDescription'
                                            onBlur={handleBlur}
                                            className="border border-gray-300 rounded-md p-2 w-full"
                                            placeholder="Short Description"
                                            disabled={!selectedPackages.includes(pack.package)}
                                            value={packageData.find((data) => data.package === pack.package)?.shortDescription || ''}
                                            onChange={(event) => handleInputChange(event, pack.package)}
                                        />
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td className="py-2 px-4">Deliverables</td>
                                {packages.map((pack) => (
                                    <td key={pack.package} className="py-2 px-4">
                                        <input
                                            type="text"
                                            name='deliverables'
                                            onBlur={handleBlur}
                                            className="border border-gray-300 rounded-md p-2 w-full"
                                            placeholder="Deliverables"
                                            disabled={!selectedPackages.includes(pack.package)}
                                            value={packageData.find((data) => data.package === pack.package)?.deliverables || ''}
                                            onChange={(event) => handleInputChange(event, pack.package)}
                                        />
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td className="py-2 px-4">Delivery Time</td>
                                {packages.map((pack) => (
                                    <td key={pack.package} className="py-2 px-4">
                                        <input
                                            type="Number"
                                            name='delivery_Time'
                                            onBlur={handleBlur}
                                            className="border border-gray-300 rounded-md p-2 w-full"
                                            placeholder="Delivery Time"
                                            disabled={!selectedPackages.includes(pack.package)}
                                            value={packageData.find((data) => data.package === pack.package)?.delivery_Time || ''}
                                            onChange={(event) => handleInputChange(event, pack.package)}
                                        />
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td className="py-2 px-4">Revisions</td>
                                {packages.map((pack) => (
                                    <td key={pack.package} className="py-2 px-4">
                                        <input
                                            type="number"
                                            name='revisions'
                                            onBlur={handleBlur}
                                            className="border border-gray-300 rounded-md p-2 w-full"
                                            placeholder="Revisions"
                                            disabled={!selectedPackages.includes(pack.package)}
                                            value={packageData.find((data) => data.package === pack.package)?.revisions || ''}
                                            onChange={(event) => handleInputChange(event, pack.package)}
                                        />
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td className="py-2 px-4">Price</td>
                                {packages.map((pack) => (
                                    <td key={pack.package} className="py-2 px-4">
                                        <input
                                            type="number"
                                            name='price'
                                            onBlur={handleBlur}
                                            className="border border-gray-300 rounded-md p-2 w-full"
                                            placeholder="Price"
                                            disabled={!selectedPackages.includes(pack.package)}
                                            value={packageData.find((data) => data.package === pack.package)?.price || ''}
                                            onChange={(event) => handleInputChange(event, pack.package)}
                                        />
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                    {/* tableend */}

                    <textarea placeholder="Requirements"
                        name='requirements'
                        onBlur={handleBlur}
                        value={values.requirements}
                        onChange={handleChange}
                        className="textarea textarea-bordered textarea-lg w-full " ></textarea>
                    {errors.requirements && touched.requirements ? (
                        <p className="form-error text-red-500">{errors.requirements}</p>
                    ) : null}


                    <div>
                        <button
                            className="border   text-lg font-semibold px-5 py-3   border-[#1DBF73] bg-[#1DBF73] text-white rounded-md"
                            type="submit"

                        >
                            Create
                        </button>
                    </div>
                </form>
            </div >

        </div >
    )
}

export default CreateListing