import React from 'react'
import ReactDOM from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'

import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom'

import { App } from './App.tsx'
import { AppTwo } from './AppTwo.tsx'
import { AppThree } from './AppThree.tsx'
import { Alic3 } from './Alic3.tsx'

import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/2',
    element: <AppTwo />,
  },
  {
    path: '/3',
    element: <AppThree />,
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
