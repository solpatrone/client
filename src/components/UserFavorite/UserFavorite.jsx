import s from "./UserFavorite.module.css"
import {RiStarFill }from 'react-icons/ri'
import { BsHeart } from "react-icons/bs";
import { BsHeartFill } from "react-icons/bs";
import { useState } from "react";


export default function UserFavorite(props) {

    const [favorite, setFavorite] = useState(true)

    function handleFavorite(e) {
        e.preventDefault()
        setFavorite(false)
      }

    const elem = props.elem;
    return (
        <div className={s.review}>
            <div className={s.topRow} >
                <h4 >{elem.restaurant}</h4>      
                 
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
