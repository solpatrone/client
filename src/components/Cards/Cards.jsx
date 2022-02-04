import React from "react"
import Card from "../Card/card"
import {Link} from 'react-router-dom'

export default function Cards({restaurants}){
    return(
        <div>
        {
        restaurants && restaurants.map(r=> {return(

            <div key={r.id}>
            <Link to= {`/restaurants/${r.id}`}>
            <Card name={r.name} photo={r.photo} neighborhood={r.neighborhood} rating={r.rating}/>
            </Link>
            
            </div>
            )})
    }
    </div>
    )
}