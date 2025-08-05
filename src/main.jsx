import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {RouterProvider,createBrowserRouter} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { CategoryPage } from './pages/CategoryPage.jsx'
import { BannerPage } from './pages/BannerPage.jsx'
const routes = createBrowserRouter([
  {
    path : '/',
    element : <App></App>
  },
  {
      path : '/category',
      element : <CategoryPage></CategoryPage>
  },
  {
      path : '/banner',
      element : <BannerPage></BannerPage>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes}></RouterProvider>
  </StrictMode>,
)
