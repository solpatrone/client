import React from "react"
import Card from "../Card/card"

export default function Cards({restaurants}){
    return(
        <div>
        {
        restaurants && restaurants.map(r=> {return(
            <div key={r.id}>
            <Card name={r.name} photo={r.photo} neighborhood={r.neighborhood} rating={r.rating} price={r.price}/>
            </div>
            )})
    }
    </div>
    )
}