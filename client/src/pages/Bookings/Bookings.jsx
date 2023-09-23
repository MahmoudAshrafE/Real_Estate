import React, { useState } from 'react'
import Search from '../../components/Search/Search'
import '../Properties/properties.css'
import useProperties from '../../hooks/useProperties';
import  {PulseLoader} from 'react-spinners'
import { useDetailsContext } from '../../contexts/userDeatilesContext';
import PropertyCard from '../../components/PropertyCard/PropertyCard';

const Bookings = () => {

  const { data, isError, isLoading } = useProperties();
  const [filter, setFilter] = useState("")

  const {
    userDetails: { bookings },
  } = useDetailsContext();

  if (isError) {
    return(
      <div className='wrapper'>
        <span>Error while fetching data</span>
      </div>
    )
  }

  if (isLoading) {
    return(
      <div className="wrapper flexCenter" style= {{height: "60vh"}}>
        
        <PulseLoader color="var(--blue)" />
      </div>
    )
  }
  
  return (
    <div className='wrapper'>
      <div className="flexColCenter paddings innerWidth properties__container">

        <Search filter={filter} setFilter={setFilter} />

        <div className='paddings flexCenter properties'>
          {
            data.filter((property) =>
                bookings?.map((booking) => booking.id).includes(property._id)
              )
              
              .filter(
                (property) =>
                  property.title.toLowerCase().includes(filter.toLowerCase()) ||
                  property.city.toLowerCase().includes(filter.toLowerCase()) ||
                  property.country.toLowerCase().includes(filter.toLowerCase())
              )
              .map((card, i) => (
                <PropertyCard card={card} key={i} />
              ))
          }
        </div>
      </div>
      </div>
  )
}

export default Bookings 