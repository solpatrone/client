
import React from 'react';
import s from "./card.module.css"
import defaultImg from '../../assets/table.jpg'


function card() {
  return (
    <div className={s.container}>
        <div>
            <div>
            <img src={defaultImg} alt = "img not found" width = "120px" height= "120px"/>
            </div>
            <div className={s.line}>
                <h4>$$</h4>
                <h4>4 estrellas</h4> 
            </div>
        </div>
        <div>
            <h2>McDonalds</h2>
            <h4>Palermo</h4>
        </div>

    </div>
  )
 
}

export default card;