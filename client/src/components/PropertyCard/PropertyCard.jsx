import React from 'react'
import './propertyCard.css'
import { truncate } from 'lodash'
import { useNavigate } from 'react-router-dom'
import { PATHS } from '../../pages/Router/paths'
import Heart from '../Heart/Heart'
const PropertyCard = ({ card }) => {

  const Navigate = useNavigate();

  const navigateToProperty = () => {
    Navigate((PATHS.PROPERTIES.VIEW).replace(":id", card?._id))
  }

  return (
    <div className="flexColStart r-card" onClick={ navigateToProperty}>
      <Heart id={card?._id}/>
      <img src={card.image} alt="home" />
      <span className="secondaryText r-price">
        <span style={{ color: "orange" }}>$</span>
        <span>{card.price}</span>
      </span>
      <span className="primaryText">{truncate(card.title, {length: 15})}</span>
      <span className="secondaryText">{truncate(card.description, {length: 80})}</span>
  </div>
  )
}

export default PropertyCard