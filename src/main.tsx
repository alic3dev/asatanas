import React from 'react'
import ReactDOM from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'

import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom'

import { Intro } from './Intro.tsx'
import { App } from './App.tsx'
import { AppTwo } from './AppTwo.tsx'
import { AppThree } from './AppThree.tsx'
import { Alic3 } from './Alic3.tsx'

import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
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
