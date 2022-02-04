
import React from 'react';
import s from "./card.module.css"
import defaultImg from '../../assets/table.jpg'


function card({name, photo, neighborhood, rating}) {
  return (
    <div className={s.container}>
        <div>
          
            <div>
            <h2>{name}</h2>
            </div>
            <div>
            <img src={photo? photo :  defaultImg} alt = "img not found" width = "120px" height= "120px"/>
            </div>
            <div className={s.line}>
                <h4>{rating}</h4> 
            </div>
        </div>
        <div>
       
            <h4>{neighborhood && neighborhood.map((n,i) => {return n + (i < (neighborhood.length-1) ?  ', ' : '')})}</h4>
        </div>

    </div>
  )
 
}

export default card;