import React from 'react'
import { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar'
import axios from 'axios';
import NavbarHorizontal from '../components/NavbarHorizontal'
import { Card } from '../components/Card';
import { URL } from '../constants/api';
const Subcategory = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [reload, setReload] = useState(false);
    const [subcategories, setSubCategories] = useState([]);
    const [DisplayError, SetDisplayError] = useState("");
    useEffect(() => {
        const FetchSubCategoryData = async () => {
            try {
                const response = await axios.get(`${URL}/api_app/get-subcategory`);
                setSubCategories(response.data);
                setLoading(false);

                console.log(response.data);
            } catch (err) {
                setError(true);
                setLoading(false);
                SetDisplayError(err.message);
                console.log(err);
            }
        };
        FetchSubCategoryData();
    }, [reload]);

    const DeleteSubCat = async (id) => {
        try {
            const response = await axios.delete(`${URL}/api_admin/delete-subcategory/${id}`);
            console.log(response.data);
            setReload((prev)=>!prev);
        } catch (error) {
            console.log(`we got an error deleting the sub category ${error}`);

        }
    }
    if (loading) {
        return <h2> Your Sub Categories are loading</h2>;
    }

    if (error) {
        return (
            <p className="text-red-600">
                We got error while loading the sub category ie {DisplayError}
            </p>
        );
    }


    return (
        <div className='flex'>
            <Navbar></Navbar>
            <div className='bg-zinc-100 flex-1'>
                <NavbarHorizontal></NavbarHorizontal>

                <div className='grid grid-cols-3'>
                    {
                        subcategories.AllSubCategory.map((subcategory, idx) => {
                            return (
                                <Card key={idx} url={subcategory.SubCategoryIcon} Name={subcategory.SubCategoryName} NumberofCompanies={4} NumberofSub={2} DBid={subcategory._id} onDelete={DeleteSubCat}>

                                </Card>
                            )
                        })
                    }
                </div>


            </div>
        </div>

    )
}

export default Subcategory