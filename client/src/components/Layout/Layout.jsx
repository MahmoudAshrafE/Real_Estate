import React, { useEffect } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import './layout.css'
import { useAuth0 } from '@auth0/auth0-react'
import { useDetailsContext } from '../../contexts/userDeatilesContext'
import { useMutation } from 'react-query'
import { createUser } from '../../utils/api'
import useFavs from '../../hooks/useFavs'
import useBookings from '../../hooks/useBookings'
import { api_url } from '../../config/api'

const Layout = () => {

  useFavs();
  useBookings()

  const { isAuthenticated, user, getAccessTokenSilently} = useAuth0()

  const { setUserDetails } = useDetailsContext()
  
  const { mutate } = useMutation({
    mutationKey: [user?.email],
    mutationFn: (token) => createUser(user?.email, token)
  })

  useEffect(() => {
    
    const getTokenAndRegister = async () => {
      const res = await getAccessTokenSilently({
        authorizationParams: { 
        audience:api_url,
        scope: "openid profile email"
        }
      })
    localStorage.setItem("access_token", res);
    setUserDetails((prev) => ({...prev, token: res}));
    mutate(res)
    }

    
    isAuthenticated && getTokenAndRegister()


  },[isAuthenticated])

  return (
    <>
    <div className='black__color'>
    <Header/>
    <Outlet />
    </div>
    <Footer/>
    </>
  )
}

export default Layout