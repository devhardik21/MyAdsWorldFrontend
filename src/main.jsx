import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {RouterProvider,createBrowserRouter} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { CategoryPage } from './pages/CategoryPage.jsx'
import { BannerPage } from './pages/BannerPage.jsx'
import FeaturePage from './pages/FeaturePage.jsx'
import Subcategory from './pages/Subcategory.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import MenuPage from './components/MenuPage.jsx'
// import FeaturePage from './pages/FeaturePage.jsx'
const routes = createBrowserRouter([
  {
    path : '/',
    element : <DashboardPage></DashboardPage>
  },
  {
      path : '/category',
      element : <CategoryPage></CategoryPage>
  },
  {
      path : '/banner',
      element : <BannerPage></BannerPage>
  },
  {
    path : '/subcategory',
    element : <Subcategory></Subcategory>
  },
  {
    path : '/features',
    element : <FeaturePage></FeaturePage>
  },
  
 
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes}></RouterProvider>
  </StrictMode>,
)
