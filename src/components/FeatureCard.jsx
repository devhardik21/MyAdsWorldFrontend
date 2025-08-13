import React from 'react'

const FeatureCard = (props) => {
  return (
    <div className='bg-blue-200 h-24 flex justify-between max-w-72 rounded-2xl shadow-xl shadow-zinc-200 hover:shadow-2xl m-4'>
        <div className='text-2xl flex items-center mx-4 p-5'>
                {props.Name}
        </div>
        <div className='mr-4 mt-2'>
          <button> <img src='src\assets\menu.png' className='w-5'></img></button>
        </div>
    </div>
  )
}

export default FeatureCard