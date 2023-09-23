import React from 'react'
import { Navigate, Outlet } from "react-router-dom";
import { PATHS } from './paths';
import Website from '../Home/Website';
import Layout from '../../components/Layout/Layout';
import Properties from '../Properties/Properties';
import Property from '../Property/Property';
import Bookings from '../Bookings/Bookings';
import Favorites from '../Favorites/Favorites';
import Contact from '../Contact/Contact';




const routes  = [
    {
        path: PATHS.HOME,
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Website />
            },
        ]
    },
    {
        path: PATHS.PROPERTIES.ROOT,
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Properties />
            },
            {
                path: PATHS.PROPERTIES.VIEW,
                element: <Property />
            },
        ]
    },
    {
        path: PATHS.BOOKINGS,
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Bookings />
            },
        ]
    },
    {
        path: PATHS.FAVORITES,
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Favorites />
            },
        ]
    },
    {
        path: PATHS.CONTACT,
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Contact />
            },
        ]
    },
    {
        path: PATHS.ERRORS.NOT_FOUND,
        element: <h1>Not Found</h1>
    },
    {
        path: '*',
        element: <Navigate to={PATHS.ERRORS.NOT_FOUND} replace= {true} />
    },
]

export {
    routes,
}