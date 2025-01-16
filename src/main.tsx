import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom'

import { Analytics } from '@vercel/analytics/react'

import { Intro, App, AppTwo, AppThree, AppFour } from '@/apps'
import { Alic3 } from '@/Alic3.tsx'

import '@/index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppThree />,
  },
  {
    path: '/intro',
    element: <Intro />,
  },
  {
    path: '/2',
    element: <App />,
  },
  {
    path: '/3',
    element: <AppTwo />,
  },
  {
    path: '/4',
    element: <AppFour />,
  },
  {
    path: '*',
    loader: async (): Promise<Response> => {
      return redirect('/')
    },
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <div className="alic3-title">
      <Alic3 />
    </div>
    <Analytics />
  </React.StrictMode>,
)
