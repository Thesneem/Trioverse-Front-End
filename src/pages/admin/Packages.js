import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/admin/shared/Sidebar'
import Header from '../../components/admin/shared/Header'
import { useFormik } from 'formik'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
import { HiPencilAlt } from "react-icons/hi";
import AddPackageModal from '../../components/modals/AddPackageModal';
import { packageSchema } from '../../formSchemas/packageSchema'
import BlockModal from '../../components/modals/BlockModal'
import EditPackageModal from '../../components/modals/EditPackageModal'

const initialValues = {
    package: ''
}

const Packages = () => {

    const [showPackageModal, setshowPackageModal] = useState(false)
    const [packages, setpackages] = useState([])
    const [showblockModal, setshowblockModal] = useState(false)
    const [selectedPackage, setselectedPackage] = useState(null)
    const [showEditPackageModal, setshowEditPackageModal] = useState(false)

    const fetchPackages = async () => {
        try {
            const response = await axios.get(`/admin/packages`, {
                headers: {
                    'token': `Bearer ${localStorage.getItem('adminToken')}`

                }
            })
            setpackages(response.data.packages)

        }
        catch (err) {
            console.log(err);
        }

    }

    const handleshowPackageModal = async () => {
        setshowPackageModal(true)
    }

    const handleClosePackageModal = async () => {
        values.package = ''
        setshowPackageModal(false);
        await fetchPackages();
    }

    const handleAddPackage = async () => {
        try {
            console.log(values)

            const response = await axios.post(`/admin/addPackage`, {
                ...values,
            }, {
                headers: {
                    'token': `Bearer ${localStorage.getItem('adminToken')}`

                }
            }, {
                credentials: true
            });
            console.log(response);
            handleClosePackageModal();
            await fetchPackages();
            toast.success("Package Added Successfully")
        } catch (err) {
            console.log(err);
            toast.error('Package already exists')
        }
    };
    //block/list or unlist package
    const handleShowBlockModal = (id) => {
        setselectedPackage(id)
        setshowblockModal(true);
    }

    const handleCloseBlockModal = () => setshowblockModal(false);

    const handleBlockItem = async () => {
        try {
            console.log(selectedPackage)
            await axios.post(`/admin/listPackage/${selectedPackage}`)
            setselectedPackage(null)
            handleCloseBlockModal(false)
            //console.log(response)
            await fetchPackages()
            toast.success('Status changes successfully')
        }
        catch (err) {
            console.log(err)
            toast.err('something went wrong')
        }
    }


    const handleShowEditPackageModal = async (id) => {
        try {
            setselectedPackage(id)
            console.log('testionh', selectedPackage)
            console.log(id)
            const response = await axios.get(`/admin/getPackage/${id}`);
            console.log(response)
            const pack = response.data.package;
            values.package = pack.package.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')// Set the initial value for the form input
            setshowEditPackageModal(true);
        }
        catch (err) {
            console.log(err);
            toast.error('Something went wrong');
        }
    };


    const handleCloseEditPackageModal = () => {
        //values.category = ''
        setshowEditPackageModal(false);
    }

    const handleEditPackage = async () => {
        try {
            const response = await axios.post(`/admin/editPackage/${selectedPackage}`, {
                ...values,
            }, {
                credentials: true
            });
            console.log(response);
            handleCloseEditPackageModal();
            await fetchPackages();
            toast.success("Category Edited Successfully");
        } catch (err) {
            console.log(err);
            toast.error('Something went wrong');
        }
    };


    const { values, errors, touched, handleBlur, handleChange } =
        useFormik({
            initialValues,
            validationSchema: packageSchema,

        });

    useEffect(() => {

        fetchPackages();
    }, []);

    return (
        <div>
            <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
                <Sidebar />
                <div className="flex flex-col flex-1">
                    <Header />

                    <h1 className="text-3xl font-bold mt-8 ml-4">Packages</h1>
                    <Toaster />
                    <div className="flex justify-end">
                        {/* <button class="btn btn-primary w-30 text-center mr-10">Add Category</button> */}
                        <label htmlFor="my-modal-3" className="btn btn-primary w-30 text-center mr-10" onClick={handleshowPackageModal} > Add Package</label>
                    </div>
                    <div className="overflow-x-auto w-full my-10">
                        <table className="table w-full">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>
                                        #
                                    </th>
                                    <th>Name</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {packages.map((pack, index) => (
                                    <tr key={pack._id}>
                                        <td>
                                            {index + 1}
                                        </td>
                                        <td>

                                            {pack.package.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}

                                        </td>
                                        {pack.status === 'List' ? (
                                            <td className='text-green-500' >{pack.status} </td>) : (
                                            <td className='text-red-500' >{pack.status} </td>
                                        )}
                                        {
                                            pack.status === 'List' ? (
                                                < th className='flex items-center space-x-3'>
                                                    <button onClick={() => handleShowEditPackageModal(pack._id)}>
                                                        <HiPencilAlt />
                                                    </button>
                                                    <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded" onClick={() => handleShowBlockModal(pack._id)}>
                                                        UnList</button>
                                                </th>) : (
                                                < th className='flex items-center space-x-3'>
                                                    <button onClick={() => handleShowEditPackageModal(pack._id)}>
                                                        <HiPencilAlt />
                                                    </button>
                                                    <button className=" bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded" onClick={() => handleShowBlockModal(pack._id)}>
                                                        List</button>
                                                </th>
                                            )
                                        }
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <AddPackageModal
                showPackageModal={showPackageModal}
                handleBlur={handleBlur}
                handleChange={handleChange}
                values={values}
                errors={errors}
                touched={touched}
                handleAddPackage={handleAddPackage}
                handleClosePackageModal={handleClosePackageModal}
            />
            <BlockModal
                showBlockModal={showblockModal}
                handleCloseBlockModal={handleCloseBlockModal}
                handleBlockItem={handleBlockItem}
            />
            <EditPackageModal
                showEditPackageModal={showEditPackageModal}
                handleBlur={handleBlur}
                handleChange={handleChange}
                values={values}
                errors={errors}
                touched={touched}
                handleEditPackage={handleEditPackage}
                handleCloseEditPackageModal={handleCloseEditPackageModal}
            />

        </div >

    )
}

export default Packages