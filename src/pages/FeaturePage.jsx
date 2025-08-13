import React, { useEffect, useState } from 'react'
import { Navbar } from '../components/Navbar'
import NavbarHorizontal from '../components/NavbarHorizontal'
import { URL } from '../constants/api'
import axios from 'axios'
import FeatureCard from '../components/FeatureCard'
const FeaturePage = () => {
    const [features, setFeatures] = useState([]);
    const [error, setErrors] = useState(false);
    const [loading, setLoading] = useState(true);
    const [DisplayError, SetDisplayError] = useState('');

    useEffect(() => {
        const FetchFeatureData = async () => {
            try {
                const response = await axios.get(`${URL}/api_admin/get-feature`);
                console.log('Feature data successfully fetched');
                setFeatures(response.data);
                setLoading(false);

            }
            catch (error) {
                console.log(error);
                setErrors(true);
                SetDisplayError(error.message)
            }
        }

        FetchFeatureData() ; 
    }, [])

    if (loading) {
        return(
            <p>Your feature section is loading</p>
        )
    }

    if (error) {
        return(
            <p className='text-red-500'> We got an error : {DisplayError}</p>
        )
    }

    return (
        <div className='bg-zinc-100 min-h-screen flex'>
            <Navbar></Navbar>
            <div>
                <NavbarHorizontal></NavbarHorizontal>
                <div className=' grid grid-cols-3'>
                    {
                        features.AllFeatures.map((feature)=>{
                            return (
                                <FeatureCard Name={feature.Name}></FeatureCard>
                            )
                        })
                    }
                </div>
            </div>

        </div>
    )
}

export default FeaturePage