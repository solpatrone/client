import s from "./UserFavorite.module.css"
import {RiStarFill }from 'react-icons/ri'
import { BsHeart } from "react-icons/bs";
import { BsHeartFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
//import { deleteFavorite } from "../../actions";
import { useDispatch } from "react-redux";
import { getUserFavorites } from "../../actions";

import { deleteFavorite } from "../../actions";



export default function UserFavorite(props) {

  const dispatch = useDispatch()
  const favorites = useSelector((state)=>state.userFavorites);
  console.log('aca estan los favoritos', favorites)
   
  useEffect(()=>{
    dispatch(getUserFavorites(elem.UserId))
    // eslint-disable-next-line
},[favorites])


    const [favorite, setFavorite] = useState(true)
   

    function handleFavorite(e) {
        e.preventDefault()
        setFavorite(false)
        dispatch(deleteFavorite())
      }

    const elem = props.elem;
    return (
        <div className={s.review}>
            <div className={s.topRow} >
                <h4 >{elem.name}</h4>
                <h4 >{elem.cuisine}</h4>      

                <div className={elem.rating} > 

                    {[...Array(Number(elem.rating)).keys()].map((index) => (
                        <RiStarFill size={20} style={{ fill: "#f2d349" }} key={index} />
                    ))}
                </div>
                <button onClick={e => handleFavorite(e)}>
            {favorite  ? <BsHeartFill
                          style={{
                            display: "inline-block",
                            fontSize: "25px",
                            color: "var(--error-color)"
                          }}
                        /> :  <BsHeart
                          style={{
                            display: "inline-block",
                            fontSize: "25px",
                          }}
                        />
                      }
                
              </button>
            </div>
            <div className={s.text}>
                <p>{elem.description}</p>
            </div>
        </div> 
    
    )
}
