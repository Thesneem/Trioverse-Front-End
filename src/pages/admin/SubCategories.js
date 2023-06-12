
import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/admin/shared/Sidebar'
import Header from '../../components/admin/shared/Header'
import { useFormik } from 'formik'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
import { HiPencilAlt } from "react-icons/hi";
import AddSubCategoryModal from '../../components/modals/AddSubCategoryModal'
import { subcategorySchema } from '../../formSchemas/subCategorySchema'
import EditSubCategoryModal from '../../components/modals/EditSubCategoryModal'
import BlockModal from '../../components/modals/BlockModal'



const initialValues = {
    subcategory: '',
    category: ''
}

const SubCategories = () => {

    const [showSubCategoryModal, setshowSubCategoryModal] = useState(false)
    const [subcategories, setsubcategories] = useState([])
    const [categories, setcategories] = useState([])

    const fetchSubCategories = async () => {
        try {
            const response = await axios.get(`/admin/subcategories`, {
                headers: {
                    'token': `Bearer ${localStorage.getItem('adminToken')}`

                }
            });
            setsubcategories(response.data.subcategories[0].subcategories)
            console.log(response.data)
        } catch (err) {
            console.log(err);
        }
    };

    const handleShowSubCategoryModal = async () => {
        console.log('HiConsole')
        const response = await axios.get(`/admin/categories`, {
            headers: {
                'token': `Bearer ${localStorage.getItem('adminToken')}`

            }
        })
        setcategories(response.data.categories)
        setshowSubCategoryModal(true)
    }

    const handleCloseSubCategoryModal = () => {
        values.category = ''
        values.subcategory = ''
        setshowSubCategoryModal(false);
    }

    const handleAddSubCategory = async () => {
        try {
            console.log(values)

            const response = await axios.post(`/admin/addSubCategory`, {
                ...values,
            }, {
                headers: {
                    'token': `Bearer ${localStorage.getItem('adminToken')}`

                }
            }, {
                credentials: true
            });
            console.log(response);
            handleCloseSubCategoryModal();
            await fetchSubCategories();
            toast.success("SubCategory Added Successfully")
        } catch (err) {
            console.log(err);
            toast.error('Subactegory already exists')
        }
    };

    const { values, errors, touched, handleBlur, handleChange } =
        useFormik({
            initialValues,
            validationSchema: subcategorySchema,

        });

    //editSubCategory
    const [selectedSubCategory, setselectedSubCategory] = useState(null)
    const [showEditSubCategoryModal, setshowEditSubCategoryModal] = useState(false)
    const [showblockModal, setshowblockModal] = useState(false)
    const [selectedCategory, setselectedCategory] = useState(null)

    const handleshowEditSubCategoryModal = async (id) => {
        try {
            console.log('HiConsole')
            setselectedSubCategory(id)
            console.log(id)
            const response = await axios.get(`/admin/getSubCategory/${id}`)
            const subcategory = response.data.foundSubcategory
            console.log(subcategory)
            values.subcategory = subcategory[0].subcategory
            values.category = subcategory[0].category.category
            console.log(values.subcategory)
            console.log(values.category)
            setshowEditSubCategoryModal(true)
        }
        catch (err) {
            console.log(err);
            toast.error('Something went wrong');
        }
    }

    const handleCloseEditSubCategoryModal = () => {
        // values.category = ''
        values.subcategory = ''
        setshowEditSubCategoryModal(false);
    }
    const handleEditSubCategory = async () => {
        try {

            const response = await axios.post(`/admin/editSubCategory/${selectedSubCategory}`, {
                ...values,
            }, {
                credentials: true
            });
            console.log(response);
            handleCloseEditSubCategoryModal();
            await fetchSubCategories();
            toast.success("Subcategory Edited Successfully");
        } catch (err) {
            console.log(err);
            toast.error('Something went wrong');
        }
    }
    //List or unlist subcategory

    const handleShowBlockModal = (subCatid, catid) => {
        console.log('CATID', catid)
        setselectedCategory(catid)
        setselectedSubCategory(subCatid)
        setshowblockModal(true);
    }

    const handleCloseBlockModal = () => setshowblockModal(false);

    const handleBlockItem = async () => {
        const subcategoryId = selectedSubCategory
        const categoryId = selectedCategory
        const queryString = `?subcategory=${subcategoryId}&category=${categoryId}`
        await axios.post(`/admin/listSubCategory${queryString}`)
        setselectedSubCategory(null)
        handleCloseBlockModal(false)
        //console.log(response)
        toast.success('Status changed successfully')
        await fetchSubCategories()
    }


    useEffect(() => {

        fetchSubCategories();
    }, []);

    return (
        <div>
            <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
                <Sidebar />
                <div className="flex flex-col flex-1">
                    <Header />

                    <h1 className="text-3xl font-bold mt-8 ml-4"> SubCategories </h1>
                    <Toaster />
                    <div className="flex justify-end">
                        {/* <button class="btn btn-primary w-30 text-center mr-10">Add Category</button> */}
                        <label htmlFor="my-modal-3" className="btn btn-primary w-30 text-center mr-10" onClick={handleShowSubCategoryModal}> Add SubCategory</label>
                    </div>
                    <div className="overflow-x-auto w-full my-10">

                        <table className="table w-full">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>
                                        #
                                    </th>
                                    <th>SubCategory</th>
                                    <th>Parent Category</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {subcategories.map((subcategory, index) => (
                                    <tr key={subcategory.id}>

                                        <th>
                                            {index + 1}
                                        </th>
                                        <td>
                                            {subcategory.subcategory}
                                        </td>
                                        <td>
                                            {subcategory.category.category}
                                        </td>
                                        {subcategory.status === 'List' ? (
                                            <td className='text-green-500'>{subcategory.status}</td>) : (
                                            <td className='text-red-500'>{subcategory.status}</td>
                                        )}
                                        {subcategory.status === 'List' ? (
                                            <th className='flex items-center space-x-3'>
                                                <button className="btn-icon" onClick={() => handleshowEditSubCategoryModal(subcategory.id)} >
                                                    <HiPencilAlt />
                                                </button>
                                                <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded" onClick={() => handleShowBlockModal(subcategory.id, subcategory.category.id)}>Unlist</button>
                                            </th>) : (
                                            <th className='flex items-center space-x-3'>
                                                <button className="btn-icon" onClick={() => handleshowEditSubCategoryModal(subcategory.id)} >
                                                    <HiPencilAlt />
                                                </button>
                                                <button className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded" onClick={() => handleShowBlockModal(subcategory.id, subcategory.category.id)}>List</button>
                                            </th>
                                        )}
                                    </tr>
                                ))}

                            </tbody>


                        </table>
                    </div>
                </div>
            </div>
            <div>
                <AddSubCategoryModal
                    showSubCategoryModal={showSubCategoryModal}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleAddSubCategory={handleAddSubCategory}
                    handleCloseSubCategoryModal={handleCloseSubCategoryModal}
                    categories={categories}
                />

                <EditSubCategoryModal
                    showEditSubCategoryModal={showEditSubCategoryModal}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleEditSubCategory={handleEditSubCategory}
                    handleCloseEditSubCategoryModal={handleCloseEditSubCategoryModal}
                    categories={categories}
                />
                <BlockModal
                    showBlockModal={showblockModal}
                    handleCloseBlockModal={handleCloseBlockModal}
                    handleBlockItem={handleBlockItem}
                />
            </div>
        </div >
    )
}

export default SubCategories