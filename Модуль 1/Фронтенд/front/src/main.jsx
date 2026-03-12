import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainPage from './main/MainPage'
import './css/mainStyle.css'
import Auth from './main/Auth/Auth'
import Reg from './main/Auth/Reg'
import GetRequests from './main/RequestAndUser/GetRequests'
import ErrorPage from './main/ErrorPage'
import CreateRequest from './main/RequestAndUser/CreateRequest'
import CommentsRequest from './main/RequestAndUser/CommentsRequest'
import UpdateRequest from './main/RequestAndUser/UpdateRequest'

const router = createBrowserRouter([
  {
    path:"/",
    element: <MainPage/>,
    errorElement: <ErrorPage/>
  },
  {
    path:"/auth",
    element: <Auth/>,
    errorElement: <ErrorPage/>
  },
  {
    path:"/reg",
    element: <Reg/>,
    errorElement: <ErrorPage/>
  },
  {
    path:"/request",
    errorElement: <ErrorPage/>,
    children:[
      {
        path:"",
        element: <GetRequests/>
      },
      {
        path:"create",
        element: <CreateRequest/>
      },
      {
        path:"update/:id",
        element: <UpdateRequest/>
      },
      {
        path:"comms/:id",
        element: <CommentsRequest/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
