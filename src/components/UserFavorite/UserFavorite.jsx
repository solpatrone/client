import s from "./UserFavorite.module.css"
import {RiStarFill }from 'react-icons/ri'
import { BsHeart } from "react-icons/bs";
import { BsHeartFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { deleteFavorite } from "../../actions";
import { useDispatch } from "react-redux";
import { getUserFavorites } from "../../actions";
import Cookies from "universal-cookie";



export default function UserFavorite(props) {
  
  const elem = props.elem;
  const cookies = new Cookies();
  const dispatch = useDispatch()
  const favorites = useSelector((state)=>state.userFavorites);
  console.log('favoritos', favorites)
  const userId = cookies.get("id");
  console.log('cookie ',userId)
  
 

   
  useEffect(()=>{
   dispatch(getUserFavorites(userId))
   console.log('get', elem.UserId)

    // eslint-disable-next-line
},[])


    const favorite = useState(true)
   

    function handleFavorite(e) {
        e.preventDefault()
       
        
        
       // setFavorite(false)
        dispatch(deleteFavorite(userId, elem.id))
        setTimeout(() => {
          dispatch(getUserFavorites(userId))
        }, 100);
      }

      return (
        <div className={s.review}>
            <div className={s.topRow} >
                <div className={s.a}>
                  <h4 >{elem.name}</h4>
                  <div className={elem.rating} > 
                    {[...Array(Number(elem.rating)).keys()].map((index) => (
                        <RiStarFill size={20} style={{ fill: "#f2d349" }} key={index} />
                    ))}
                  </div>
                </div>
                <div className={s.btn}>
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
            </div>
                          <div >
                            <h4 className={s.cuisines}  >{elem.cuisine.join(', ')}</h4>      
                          </div>
            <div className={s.text}>
                <p>{elem.description}</p>
            </div>
        </div> 
    
    )
}