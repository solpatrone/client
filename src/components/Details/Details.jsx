import React, {useEffect} from 'react';
import {getRestoDetails}  from '../../actions'
import {useDispatch, useSelector } from "react-redux";
import {Link, useParams } from "react-router-dom";


function Details() {
const dispatch = useDispatch()
const params = useParams()
const restaurants = useSelector((state) => state.restaurants)
console.log(restaurants)
console.log(params.id)
useEffect(() => {
  dispatch(getRestoDetails(params.id));
}, [dispatch, params.id]);


  return(
    <div>
        {
            restaurants.lenght > 0 ? 
            <div>
                <div>
                    <h2>{restaurants[0].name}</h2>
                </div>
            </div>
              :
              <h3>Los detalles del restaurant no estan disponibles</h3>
        }
      
    </div>
  )
   
}

export default Details;
