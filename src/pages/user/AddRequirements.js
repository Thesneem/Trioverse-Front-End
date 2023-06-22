import React, { useEffect } from 'react'
import Navbar from "../../components/user/Navbar";
import { Navigate, useLocation } from 'react-router-dom';
import RequirementsAdd from '../../components/user/Requirements/RequirementsAdd';
import SelectedDetails from '../../components/user/Requirements/SelectedDetails';
import { useNavigate } from 'react-router-dom';

const AddRequirements = () => {
    const location = useLocation()
    const navigate = useNavigate()
    let data = location?.state

    const redirect = () => {
        if (!data?.packageId) {
            navigate('/home')
        }
        else {
            console.log('packageID', data?.packageId)
        }

    }

    useEffect(() => {
        redirect()
    }, [])

    return (
        <>

            <div>
                < Navbar />
                <div className="grid grid-cols-3 mx-32 gap-20">
                    <RequirementsAdd />
                    < SelectedDetails selectedPackage={data?.packageId} />
                </div>
            </div>

        </>

    )
}

export default AddRequirements