import React, { useEffect, useState } from 'react'
import BannerCard from '../components/BannerCard'
import { URL } from '../constants/api.js';
import axios from 'axios';

export const BannerPage = () => {
    const [error, SetError] = useState(false);
    const [DisplayError, SetDisplayError] = useState('');
    const [loading, SetLoading] = useState(true);
    const [banners, SetBanners] = useState([]);

    useEffect(() => {

        const FetchBanner = async () => {
            try {
                const response = await axios.get(`${URL}/api_app/get-banners`);
                console.log(response);
                console.log(response.data);

                SetBanners(response.data)
            } catch (error) {
                SetError(true);
                console.log(`Error is :- ${error}`);
                SetDisplayError(error.message)
            }
            finally {
                SetLoading(false)
                console.log("finally block");

            }
        }

        FetchBanner()
    }, [])

    if (loading) {
        return (
            <h3>Your Banners are loading </h3>
        )
    }
    if (error) {
        return (
            <h3 className='text-xl text-red-500'> We got an error fetching the data {DisplayError}</h3>
        )
    }

    return (
        <div className=' bg-zinc-100 '>
            <div className='grid grid-cols-3'>
                {
                    banners.BannerDetails.map((banner, idx) => {
                        return <BannerCard url={banner.BannerUrl} BannerName={banner.BannerName} key={idx}></BannerCard>
                    })
                }

            </div>
        </div>
    )

}
