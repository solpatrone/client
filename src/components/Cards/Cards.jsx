import React from "react"
import Card from "../Card/card"
import {Link} from 'react-router-dom'

import style from './Cards.module.css'
export default function Cards({restaurants}){
    return(
        <div>
            <section className={style.slider}>
        {

        restaurants && restaurants.map(r=> {return(

            <div key={r.id}>
            <Link to= {`/restaurants/${r.id}`}>
            <div className={style.box} key={r.id}>
            <Card name={r.name} photo={r.photo} neighborhood={r.neighborhood} rating={r.rating}/>
            </div>
            </Link>
            
            </div>
            )})
    }
            </section>
    </div>
    )
}