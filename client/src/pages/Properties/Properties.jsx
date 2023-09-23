import React, { useState } from 'react'
import Search from '../../components/Search/Search'
import './properties.css'
import useProperties from '../../hooks/useProperties';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import  {PulseLoader} from 'react-spinners'
import { useFilterContext } from '../../contexts/filterContext';

const Properties = () => {

  const { data, isError, isLoading } = useProperties();

  const { filter, setFilter } = useFilterContext();

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
        {data?.filter((property) => property.title.toLowerCase()?.includes(filter.toLocaleLowerCase()) 
        ||
        property.city.toLowerCase()?.includes(filter.toLocaleLowerCase()) 
        ||
        property.country.toLowerCase()?.includes(filter.toLocaleLowerCase()) 
        )
        ?.map((card, i) => (<PropertyCard card={card} key={i}/>))}
        </div>
      </div>
      </div>
  )
}

export default Properties