import s from "./UserFavorite.module.css"
import {RiStarFill }from 'react-icons/ri'
import { BsHeart } from "react-icons/bs";
import { BsHeartFill } from "react-icons/bs";
import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
import { deleteFavorite } from "../../actions";
import { useDispatch } from "react-redux";
import { getUserFavorites } from "../../actions";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import { FcCheckmark } from "react-icons/fc";
import { AiOutlineShop } from "react-icons/ai"




export default function UserFavorite(props) {
  
  const elem = props.elem;
  const cookies = new Cookies();
  const dispatch = useDispatch()
  // const favorites = useSelector((state)=>state.userFavorites);
  const userId = cookies.get("id");
  
 

   
  useEffect(()=>{
   dispatch(getUserFavorites(userId))
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
        <div className={s.favorite}>
            <div className={s.topRow} >
                <div className={s.a}>
                  <div className={s.rating} > 
                  <div className={s.restoIcon}>
                  <AiOutlineShop size={25} style={{ fill:"#8aa899" }} />  
                  <Link className={s.restoName} to = {`/restaurants/${elem.id}`} >
                     {elem.name}
                  </Link>
                  </div> 
                  <div className={s.stars}>
                    {[...Array(Number(elem.rating)).keys()].map((index) => (
                        <RiStarFill size={18} style={{ fill: "#f2d349" }} key={index} />
                    ))}

                    </div>
                  </div>
                </div>
                <div className={s.btn}>
                    <button  style={{backgroundColor: "white",
                                border: "none"}} onClick={e => handleFavorite(e)}>
                            {favorite  ? <BsHeartFill
                              style={{
                                display: "inline-block",
                                fontSize: "25px",

                                color: "var(--error-color)",
                                
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
                          <div className={s.hash} >
                            <div className={s.cuisines}  >{elem.cuisine.map(el => (
                              <div >
                              <FcCheckmark /> {el} 
                            </div>
                            ))}</div>      
                          </div>
        </div> 
    
    )
}