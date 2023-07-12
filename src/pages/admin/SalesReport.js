import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/admin/shared/Sidebar'
import Header from '../../components/admin/shared/Header'
import { useFormik } from 'formik'
import axios from 'axios'
import { Toaster, toast } from 'react-hot-toast'




const SalesReport = () => {
    const [salesData, setSalesData] = useState([]);

    // Calculate the total order price
    const totalOrderPrice = salesData?.reduce((total, sale) => total + sale.order_Price, 0);


    const { handleSubmit, handleBlur, handleChange, values, errors } = useFormik({
        initialValues: {
            from: '',
            to: '',
        },
        onSubmit: (values) => {

            getSalesReport(values)
        }
    })

    const getSalesReport = async () => {
        try {
            const response = await axios.post(`/admin/salesreport?from=${values.from}&to=${values.to}`);
            console.log(response)
            setSalesData(response.data.salesData);

        }
        catch (err) {
            console.log(err)
            toast.error('Cannot fetch the report ')
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleBeforePrint = () => {
        // Custom logic before printing, if needed
        // Hide non-printable elements
        const nonPrintableElements = document.querySelectorAll('.non-printable');
        nonPrintableElements.forEach((element) => {
            element.style.display = 'none';
        });
    };

    const handlePrint = () => {
        window.print();
    };

    useEffect(() => {
        // Add event listener for print
        window.addEventListener('beforeprint', handleBeforePrint);
        return () => {
            // Cleanup event listener
            window.removeEventListener('beforeprint', handleBeforePrint);
        };
    }, []);

    return (
        <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">

            <Sidebar />
            <div className="flex flex-col flex-1">
                <Header />
                <div className="flex-1 p-4 min-h-0 overflow-auto">
                    <Toaster />
                    {/* <div className='px-5 w-full h-full mx-5  py-10 font-poppins flex flex-col place-content-start place-items-center bg-white shadow-xl rounded-xl'> */}

                    <div className=" h-20 w-full flex place-content-start place-items-center px-5">
                        <h3 className='font-semibold text-primaryViolet text-2xl text-start'>Sales Report</h3>
                    </div>
                    <div className='w-full px-5 flex flex-col gap-5' >
                        <h3 className='text-md font-semibold'>Select the date range</h3>
                        <form className='flex flex-col  gap-3 ' onSubmit={handleSubmit}>
                            <div className='flex place-content-between gap-3'>
                                <div className="w-3/5">
                                    {/* <label htmlFor="from" className='mb-2 text-lg  text-gray-900'>
                                        Select from date
                                    </label> */}
                                    <input label='Select the date from' variant='static' type='date' name='from' onChange={handleChange} onBlur={handleBlur} value={values.from} />
                                </div>
                                <div className="w-3/5">
                                    <input label='Select the date to' variant='static' type='date' name='to' onChange={handleChange} onBlur={handleBlur} value={values.to} />
                                </div>
                            </div>
                            <div className="w-full">
                                <button className='text-white bg-success px-4 py-3 w-1/6' type='submit'>View Report</button>
                            </div>
                        </form>
                    </div>

                    {/* table */}
                    {salesData && (
                        <div className="mt-5">
                            <h3 className="text-md font-semibold">Sales Data</h3>
                            <table className="w-full table-auto">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 bg-gray-100">Order Date</th>
                                        <th className="py-2 px-4 bg-gray-100">Buyer</th>
                                        <th className="py-2 px-4 bg-gray-100">Seller</th>
                                        <th className="py-2 px-4 bg-gray-100">Listing Title</th>
                                        <th className="py-2 px-4 bg-gray-100">Order Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {salesData.map((sale) => (
                                        <tr key={sale._id} className="hover:bg-gray-100">
                                            <td className="py-2 px-4 text-center">{formatDate(sale.order_Status.created.date)}</td>
                                            <td className="py-2 px-4 text-center">{sale.buyer[0].userName}</td>
                                            <td className="py-2 px-4 text-center">{sale.seller[0].userName}</td>
                                            <td className="py-2 px-4 text-center">{sale.selectedListing_title}</td>
                                            <td className="py-2 px-4 text-center">{sale.order_Price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="mt-4">
                                <p className="text-right font-semibold">Total Order Price: {totalOrderPrice}</p>
                            </div>
                            <div className="mt-4">
                                <button className="text-white bg-blue-500 px-4 py-2 rounded-md" onClick={handlePrint}>
                                    Print Report
                                </button>
                            </div>
                        </div>

                    )}
                </div>
            </div>
        </div >

    )
}

export default SalesReport