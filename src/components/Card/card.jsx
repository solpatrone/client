
import React from 'react';
import s from "./card.module.css"
import defaultImg from '../../assets/table.jpg'
import {RiStarFill} from 'react-icons/ri'


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
                <h4>{[...Array(Number(rating)).keys()].map(() => <RiStarFill/>)}</h4> 
            </div>
        </div>
        <div>
       
            <h4>{neighborhood && neighborhood.map((n,i) => {return n + (i < (neighborhood.length-1) ?  ', ' : '')})}</h4>
        </div>

    </div>
  )
 
}

export default card;