import React, { useState } from 'react';

const TestTable = () => {
    const packages = [
        { package: 'Basic' },
        { package: 'Standard' },
        // Add more packages as needed
    ];

    const [selectedPackages, setSelectedPackages] = useState([]);
    const [formData, setFormData] = useState([]);

    const handlePackageChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedPackages((prevSelectedPackages) => [...prevSelectedPackages, value]);
            setFormData((prevFormData) => [...prevFormData, { package: value, shortDescription: '', deliverables: '', deliveryTime: '', revisions: '', price: '' }]);
        } else {
            setSelectedPackages((prevSelectedPackages) =>
                prevSelectedPackages.filter((packageValue) => packageValue !== value)
            );
            setFormData((prevFormData) =>
                prevFormData.filter((data) => data.package !== value)
            );
        }
    };

    const handleInputChange = (event, packageValue) => {
        const { name, value } = event.target;
        setFormData((prevFormData) =>
            prevFormData.map((data) => {
                if (data.package === packageValue) {
                    return {
                        ...data,
                        [name]: value
                    };
                }
                return data;
            })
        );
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Prepare the data to be sent to the backend
        const data = {
            packages: formData
        };
        console.log('TEST', data)
        // Send the data to the backend
        // fetch('/api/your-backend-endpoint', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(data)
        // })
        //     .then((response) => response.json())
        //     .then((responseData) => {
        //         // Handle the response from the backend if needed
        //         console.log(responseData);
        //     })
        //     .catch((error) => {
        //         // Handle any errors that occur during the request
        //         console.error(error);
        //     });
    };

    return (
        <form onSubmit={handleSubmit}>
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
                                    className="border border-gray-300 rounded-md p-2 w-full"
                                    placeholder="Short Description"
                                    disabled={!selectedPackages.includes(pack.package)}
                                    value={formData.find((data) => data.package === pack.package)?.shortDescription || ''}
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
                                    type="text" name='deliverables'
                                    className="border border-gray-300 rounded-md p-2 w-full"
                                    placeholder="Deliverables"
                                    disabled={!selectedPackages.includes(pack.package)}
                                    value={formData.find((data) => data.package === pack.package)?.deliverables || ''}
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
                                    type="Number" name='deliveryTime'
                                    className="border border-gray-300 rounded-md p-2 w-full"
                                    placeholder="Delivery Time"
                                    disabled={!selectedPackages.includes(pack.package)}
                                    value={formData.find((data) => data.package === pack.package)?.deliveryTime || ''}
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
                                    type="number" name='revisions'
                                    className="border border-gray-300 rounded-md p-2 w-full"
                                    placeholder="Revisions"
                                    disabled={!selectedPackages.includes(pack.package)}
                                    value={formData.find((data) => data.package === pack.package)?.revisions || ''}
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
                                    type="number" name='price'
                                    className="border border-gray-300 rounded-md p-2 w-full"
                                    placeholder="Price"
                                    disabled={!selectedPackages.includes(pack.package)}
                                    value={formData.find((data) => data.package === pack.package)?.price || ''}
                                    onChange={(event) => handleInputChange(event, pack.package)}
                                />
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
            <button type="submit">Submit</button>
        </form>
    );
};

export default TestTable;
