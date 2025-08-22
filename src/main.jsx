import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { CategoryPage } from './pages/CategoryPage.jsx'
import { BannerPage } from './pages/BannerPage.jsx'
import FeaturePage from './pages/FeaturePage.jsx'
import Subcategory from './pages/Subcategory.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import { ListingPage } from './pages/ListingPage.jsx'
import AddBanner from './components/AddBanner.jsx'
// import FeaturePage from './pages/FeaturePage.jsx'
import EditPage from './pages/EditPage.jsx'
import LoadingPage from './pages/LoadingPage.jsx'
import EditCategory from './pages/EditCategory.jsx'
import EditBanner from './pages/EditBanner.jsx'
import EditSubCategory from './pages/EditSubCategory.jsx'
import EditListing from './pages/EditListing.jsx'
const routes = createBrowserRouter([
  {
    path: '/',
    element: <DashboardPage></DashboardPage>
  },
  {
    path: '/category',
    element: <CategoryPage></CategoryPage>
  },
  {
    path: '/banner',
    element: <BannerPage></BannerPage>
  },
  {
    path: '/subcategory',
    element: <Subcategory></Subcategory>
  },
  {
    path: '/features',
    element: <FeaturePage></FeaturePage>
  },
  {
    path: '/listing',
    element: <ListingPage></ListingPage>
  },
  {
    path: '/app',
    element: <App></App>
  },
  {
    path: '/Load',
    element: <LoadingPage></LoadingPage>
  },
  {
    path: '/edit-cat/:id',
    element: <EditCategory></EditCategory>
  },
  {
    path: '/edit-banner/:id',
    element: <EditBanner></EditBanner>
  },

  {
    path: '/edit-subcat/:id',
    element: <EditSubCategory></EditSubCategory>
  },

  {
    path: '/edit-listing/:id',
    element: <EditListing>

    </EditListing>
  }



])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes}></RouterProvider>
  </StrictMode>,
)
