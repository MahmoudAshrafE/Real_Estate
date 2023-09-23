import React, { useEffect, useState } from 'react'
import Loading from '../../components/Loading/Loading';
import Routers from '../Router';
import useAuthCheck from '../../hooks/useAuthCheck';
import { useAuth0 } from '@auth0/auth0-react';

const LoadingPage = () => {
    const [loading, setLoading] = useState(true)
    const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0()

    
    useEffect(() => {
        if (user) {
            return setLoading(false)
        }
        setTimeout(() => {
          setLoading(false); 
        }, 3000);
      }, []);
      return (
        <div>
          {loading ? <Loading /> : <Routers />} 
        </div>
      );
}

export default LoadingPage