import React from "react"
import Card from "../Card/card"
import style from './Cards.module.css'
export default function Cards({restaurants}){
    return(
        <div>
            <section className={style.slider}>
        {

        restaurants && restaurants.map(r=> {return(
            <div className={style.box} key={r.id}>
            <Card name={r.name} photo={r.photo} neighborhood={r.neighborhood} rating={r.rating}/>
            </div>
            )})
    }
            </section>
    </div>
    )
}