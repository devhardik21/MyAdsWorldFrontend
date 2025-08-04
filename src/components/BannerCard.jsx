import React from 'react'

const BannerCard = (props) => {
  return (
    <div className=' flex bg-white p-1.5 rounded-2xl shadow-2xl shadow-gray-300 hover:shadow-gray-400 transition-shadow duration-200 mx-3 my-2 h-[15rem] w-[22rem]'>
        {/* image section */}
        <div className='p-4 mr-5'>
            <img src={props.url} className=' h-40 w-80 rounded-2xl'></img>
            <div> {props.BannerName}</div>
        </div>



        <div className='flex flex-col justify-between items-end p-3'> 
           <div className=' p-0.5 rounded-xs '> 
            <img src='src\assets\compose.png'  className=' h-7 w-7'></img>
            </div>
            <div className='p-0.5 rounded-xs '>
            <img src='src\assets\delete.png'  className=' h-7 w-7'></img>
            </div>
        </div>
    </div>
  )
}

export default BannerCard