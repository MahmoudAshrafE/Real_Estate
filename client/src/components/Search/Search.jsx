import React from 'react'
import { HiLocationMarker } from "react-icons/hi";
import './search.css'
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../pages/Router/paths';
const Search = ({ filter, setFilter}) => {

  const Navigate = useNavigate()

  return (
    <div className="flexCenter search__bar">
    <HiLocationMarker color="var(--blue)" size={25} />
    <input placeholder='search by title/city/country' type="text" value={filter} onChange={(e) => setFilter(e.target.value)}/>
    <button className="button" onClick={() =>  Navigate(PATHS.PROPERTIES.ROOT)} disabled={!filter.trim()}>Search</button>
  </div>

  )
}

export default Search