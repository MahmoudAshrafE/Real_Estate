import React, { useEffect, useState } from 'react'
import { AiFillHeart } from 'react-icons/ai'
import { toFav } from '../../utils/api'
import useAuthCheck from '../../hooks/useAuthCheck'
import { useAuth0 } from '@auth0/auth0-react'
import { useMutation } from 'react-query'
import { useDetailsContext } from '../../contexts/userDeatilesContext'
import { checkFavorites, updateFavorites } from '../../utils/common'
import './heart.css'
import { useNavigate } from 'react-router-dom'
import { app_url } from '../../config/api'

const Heart = ({ id }) => {
    const [HeartColor, setHeartColor] = useState("white")

    const Navigate = useNavigate();

    const {validateLogin} = useAuthCheck()

    const {user} = useAuth0()

    const {
        userDetails: { favorites, token },
        setUserDetails,
    } = useDetailsContext();


    const {mutate} = useMutation({
        mutationFn: () => toFav(id, user?.email, token),
        onSuccess: ()=> {
            setUserDetails((prev)=> (
                {
                    ...prev,
                    favorites: updateFavorites(id, prev.favorites)
                }
            ))
        }
    })

    useEffect(()=> {
        setHeartColor(()=> checkFavorites(id, favorites))
  },[favorites])

    const handleHeart = () =>{
        if (validateLogin()) {
            mutate()
            setHeartColor((Heart) => Heart === "rgb(244, 19, 90)" ? "white" : "rgb(244, 19, 90)" )
        }
    }

  return (
    <AiFillHeart color={HeartColor} size={24} onClick={(e) => {
        e.stopPropagation()
        handleHeart()}}/>
  )
}

export default Heart