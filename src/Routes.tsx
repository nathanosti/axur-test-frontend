import React from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './pages/Home';
import Inspection from './pages/Inspection';

import Layout from './components/Layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Home />
      </Layout>
    )
  },
  {
    path: '/:inspectionID',
    element: (
      <Layout>
        <Inspection />
      </Layout>
    ),
  }
]);

export default function Routes() {
  return <RouterProvider router={router} />
}