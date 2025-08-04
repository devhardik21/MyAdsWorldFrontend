import { useState } from 'react'

import './App.css'

import { Card } from './components/Card'

import BannerCard from './components/BannerCard'
import { BannerPage } from './pages/BannerPage'
import { CategoryPage } from './pages/CategoryPage'
function App() {

  return (
    <>
      {/* <div className='flex flex-wrap justify-start items-start bg-zinc-100 min-h-screen p-8'>
        
        <Card Name="Web Development" url="https://plus.unsplash.com/premium_photo-1678565879444-f87c8bd9f241?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" NumberofCompanies="4" NumberofSub="5"></Card>
        <Card Name="Web Development" url="https://plus.unsplash.com/premium_photo-1678565879444-f87c8bd9f241?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" NumberofCompanies="4" NumberofSub="5"></Card>
        <Card Name="Web Development" url="https://plus.unsplash.com/premium_photo-1678565879444-f87c8bd9f241?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" NumberofCompanies="4" NumberofSub="5"></Card>
     

        <BannerCard url="https://plus.unsplash.com/premium_photo-1678565879444-f87c8bd9f241?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" ></BannerCard>
      </div> */}

    <div>
       {/* <CategoryPage></CategoryPage> */}
       <BannerPage></BannerPage>
    </div>
    </>
  )
}

export default App
