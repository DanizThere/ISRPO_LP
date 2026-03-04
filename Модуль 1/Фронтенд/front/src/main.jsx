import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainPage from './main/MainPage'
import './css/mainStyle.css'
import Auth from './main/Auth/Auth'
import Reg from './main/Auth/Reg'
import GetRequests from './main/RequestAndUser/GetRequests'

const router = createBrowserRouter([
  {
    path:"/",
    element: <MainPage/>
  },
  {
    path:"/auth",
    element: <Auth/>
  },
  {
    path:"/reg",
    element: <Reg/>
  },
  {
    path:"/request",
    children:[
      {
        path:"",
        element: <GetRequests/>
      },]
    }
  //     {
  //       path:"create",
  //       element: <CreateRequest/>
  //     },
  //     {
  //       path:"update/:id",
  //       element: <UpdateRequest/>
  //     },
  //     {
  //       path:"comms",
  //       children:[
  //         {
  //           path:"",
  //           element: <GetCommentaries/>
  //         },
  //       ]
  //     }
  //   ]
  // }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
