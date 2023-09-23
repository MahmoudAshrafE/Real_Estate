import React, { useState } from 'react'
import './profile.css'
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../pages/Router/paths';


const ProfileMenu = ({user, logout, setMenuOpened}) => {

    const [open, setOpen] =useState(false);
    const Navigate = useNavigate()
  return (
    <div className='profile'>
            <img className='userName' src={user.picture} onClick={() => setOpen(!open)}/>
        {open && 
        <ul className='profileMenu'>
            <li className='profile__li' onClick={() => { 
              Navigate(PATHS.FAVORITES)
              setOpen(false)
              setMenuOpened(false)
            }}>Favorite</li>
            <li className='profile__li' onClick={() => {
              Navigate(PATHS.BOOKINGS)
              setOpen(false)
              setMenuOpened(false)
              }}>Bookings</li>
            <li className='profile__li' onClick={() => {
              localStorage.clear();
              logout()
              setMenuOpened(false)
            }}>Logout</li>
        </ul>
    }

    </div>
  )
}

export default ProfileMenu