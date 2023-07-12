import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/admin/shared/Sidebar'
import Header from '../../components/admin/shared/Header'
import { categorySchema } from '../../formSchemas/categorySchema'
import { useFormik } from 'formik'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
import { HiPencilAlt } from "react-icons/hi";
import AddCategoryModal from '../../components/modals/AddCategoryModal'
import EditCategoryModal from '../../components/modals/EditCategoryModal'
import BlockModal from '../../components/modals/BlockModal'
import { BASE_URL } from '../../config'

const initialValues = {
    category: '',
    image: ''
}

const Categories = () => {
    const [showCategoryModal, setshowCategoryModal] = useState(false)
    const [categories, setCategories] = useState([])


    const fetchCategories = async () => {
        try {
            const response = await axios.get(`/admin/categories`, {
                headers: {
                    'token': `Bearer ${localStorage.getItem('adminToken')}`

                }
            });
            console.log(response)
            setCategories(response.data.categories);
        } catch (err) {
            console.log(err);
        }
    };

    const handleShowCategoryModal = () => {
        setshowCategoryModal(true)
    }

    const handleCloseCategoryModal = () => {
        values.category = ''
        setshowCategoryModal(false);
    }

    const handleAddCategory = async () => {
        try {
            const formData = new FormData();
            formData.append('category', values.category);
            formData.append('image', values.image);
            console.log(formData)
            const response = await axios.post(`/admin/addCategory`,
                formData
                , {
                    headers: {
                        'token': `Bearer ${localStorage.getItem('adminToken')}`

                    }
                }, {
                credentials: true
            }
            );
            console.log(response);
            handleCloseCategoryModal();
            await fetchCategories();
            toast.success("Category Added Successfully")
        } catch (err) {
            console.log(err);
            toast.error()
        }
    };


    // EditCategory
    const [showEditCategoryModal, setshowEditCategoryModal] = useState(false)
    const [selectedCategory, setselectedCategory] = useState(null)
    const [showblockModal, setshowblockModal] = useState(false)


    const handleshowEditCategoryModal = async (id) => {
        try {
            setselectedCategory(id)
            console.log('testionh', selectedCategory)
            console.log(id)
            const response = await axios.get(`/admin/getCategory/${id}`);
            console.log(response)
            const category = response.data.category;
            values.category = category.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' '); // Set the initial value for the form input
            setshowEditCategoryModal(true);
        } catch (err) {
            console.log(err);
            toast.error('Something went wrong');
        }
    };


    const handleCloseEditCategoryModal = () => {
        //values.category = ''
        setshowEditCategoryModal(false);
    }

    const handleEditCategory = async () => {
        try {
            console.log('HIII')
            const formData = new FormData();
            formData.append('category', values.category);
            formData.append('image', values.image);
            console.log(formData)
            console.log('Editcategory', selectedCategory)
            const response = await axios.post(`/admin/editCategory/${selectedCategory}`,
                formData,
                {
                    headers: {
                        'token': `Bearer ${localStorage.getItem('adminToken')}`

                    }
                }, {
                credentials: true
            });
            console.log(response);
            handleCloseEditCategoryModal();
            await fetchCategories();
            toast.success("Category Edited Successfully");
        } catch (err) {
            console.log(err);
            toast.error('Something went wrong');
        }
    };
    //block/list or unlist category
    const handleShowBlockModal = (id) => {
        setselectedCategory(id)
        setshowblockModal(true);
    }

    const handleCloseBlockModal = () => setshowblockModal(false);

    const handleBlockItem = async () => {
        console.log(selectedCategory)
        await axios.post(`/admin/listCategory/${selectedCategory}`, {
            ...values,
        }, {
            headers: {
                'token': `Bearer ${localStorage.getItem('adminToken')}`

            }
        }, {
            credentials: true
        })


        setselectedCategory(null)
        handleCloseBlockModal(false)
        //console.log(response)
        await fetchCategories()
    }

    const { values, errors, touched, handleBlur, handleChange, setFieldValue } =
        useFormik({
            initialValues,
            validationSchema: categorySchema,

        });


    useEffect(() => {

        fetchCategories();
    }, []);

    console.log('ERROROS', errors)
    return (
        <div>
            <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
                <Sidebar />
                <div className="flex flex-col flex-1">
                    <Header />

                    <h1 className="text-3xl font-bold mt-8 ml-4" > Categories </h1>
                    <Toaster />
                    <div class="flex justify-end">
                        {/* <button class="btn btn-primary w-30 text-center mr-10">Add Category</button> */}
                        <label htmlFor="my-modal-3" className="btn btn-primary w-30 text-center mr-10" onClick={handleShowCategoryModal}>Add Category</label>
                    </div>
                    <div className="overflow-x-auto w-full my-10">

                        <table className="table w-full">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>
                                        #
                                    </th>
                                    <th>Category</th>
                                    <th>Sub-Categories</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category, index) => (
                                    <tr key={category._id}>
                                        <th>
                                            {index + 1}
                                        </th>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                {category?.image && (
                                                    <div className="mask mask-circle w-12 h-12 ">
                                                        <img src={`${BASE_URL}/public/uploads/profilepics/${category?.image}`} alt='Avatar' className="w-full h-full rounded-full object-cover" />

                                                    </div>
                                                )}
                                                <div>
                                                    {category.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {category.subcategories.map((subCategory) => (
                                                <div key={subCategory._id}>
                                                    {subCategory.subcategory}
                                                </div>
                                            ))}
                                        </td>
                                        {category.status === 'List' ? (
                                            < td className='text-green-500'>{category.status}</td>) : (
                                            < td className='text-red-500'>{category.status}</td>
                                        )}

                                        {category.status === 'List' ? (
                                            < th className='flex items-center space-x-3'>
                                                <button className="btn-icon" onClick={() => handleshowEditCategoryModal(category._id)} >
                                                    <HiPencilAlt />
                                                </button>
                                                <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded" onClick={() => handleShowBlockModal(category._id)}>Unlist</button>
                                            </th>) : (
                                            < th className='flex items-center space-x-3'>
                                                <button className="btn-icon" onClick={() => handleshowEditCategoryModal(category._id)} >
                                                    <HiPencilAlt />
                                                </button>
                                                <button className=" bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded" onClick={() => handleShowBlockModal(category._id)}>List</button>
                                            </th>)
                                        }
                                    </tr>
                                ))}
                            </tbody>


                        </table>
                    </div>
                </div>
            </div>
            {/* modal */}
            <AddCategoryModal
                showCategoryModal={showCategoryModal}
                handleBlur={handleBlur}
                handleChange={handleChange}
                values={values}
                errors={errors}
                touched={touched}
                setFieldValue={setFieldValue}
                handleAddCategory={handleAddCategory}
                handleCloseCategoryModal={handleCloseCategoryModal}

            />


            {/* Edit Category Modal */}

            <EditCategoryModal
                showEditCategoryModal={showEditCategoryModal}
                handleBlur={handleBlur}
                handleChange={handleChange}
                values={values}
                errors={errors}
                touched={touched}
                setFieldValue={setFieldValue}
                handleEditCategory={handleEditCategory}
                handleCloseEditCategoryModal={handleCloseEditCategoryModal}

            />
            <BlockModal
                showBlockModal={showblockModal}
                handleCloseBlockModal={handleCloseBlockModal}
                handleBlockItem={handleBlockItem}
            />

        </div >


    )
}

export default Categories