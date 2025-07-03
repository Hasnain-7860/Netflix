import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const navigate = useNavigate();
  const {id} = useParams();
  const [apiData, setApiData]= useState({
    name:"",
    key:"",
    published_at:"",
    typeof:""
  })

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOTU3NWZmYWEzY2MyNmMwMzU1ZDdhZWYxNWU2OWQyMCIsIm5iZiI6MTc1MTQ0NDM2OC4zMjA5OTk5LCJzdWIiOiI2ODY0ZWI5MDJhYTQzMGE2ZDU3ODQwMzciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.WypgpzHeNN6FieiU5t06v0GvtIjzNO4n59es7DhG2vE'
  }
};
useEffect(()=>{
fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results[0]))
  .catch(err => console.error(err));
},[]) 

  

  return (
    <div className='player'>
      <img onClick={()=>{navigate(-2)}} src={back_arrow_icon} alt="" />

      <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apiData.key}`} title='trailer' frameBorder='0' allowFullScreen></iframe> 
      <div className='player-info'>
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player