import s from "./UserReview.module.css"
import {RiStarFill }from 'react-icons/ri'
import { AiOutlineDelete, AiOutlineShop } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { deleteReview, getRestaurantReviews, putRating, getUserReviews } from "../../actions";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Swal from "sweetalert2";
import {Link} from "react-router-dom"

export default function UserReview(props) {

    const dispatch = useDispatch()
    const elem = props.elem;
    const allRestaurants = useSelector(state => state.allRestaurants)
    const restaurant = allRestaurants.find(el => el.id === elem.RestaurantId)
    const reviews = useSelector(state => state.reviews)

   
    useEffect(()=>{
        dispatch(getUserReviews(elem.UserId))
        // eslint-disable-next-line
    },[reviews])


    function handleDelete(e){
        e.preventDefault()
        Swal.fire({
          text: `Vas a eliminar tu reseña`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#8aa899",
          cancelButtonColor: "#d33",
          confirmButtonText: "Eliminar reseña",
        }).then((result) => {
          if (result.isConfirmed) {
            function changeRating (){
              let newRating = {};
             if(reviews.length === 1){    
          
               newRating = {rating: "0", owner: restaurant.owner }
          
             }else if (reviews.length > 1){     
                let reviewRaw = reviews.filter(el => el.id !== elem.id)  
              let ratingRev = reviewRaw.map(el => Number(el.rating))
              let sum =  ratingRev.reduce((acc,curr) => acc + curr, 0)
              let prom = Math.round(sum /ratingRev.length)
               newRating = {rating:String(prom), owner: restaurant.owner }
             }
          
              return newRating
            }

              dispatch(deleteReview(elem.UserId, elem.id))
              dispatch(putRating(restaurant.id,changeRating()));
          
            Swal.fire({
              text: `Reseña eliminada con éxito`,
              confirmButtonColor: "#8aa899",
            }).then(
            dispatch(getRestaurantReviews(restaurant.id))
            ).then(window.location.reload(false))
          } else if (result.dismiss === "cancel") {
            Swal.fire({
              text: "No se guardaron los cambios",
              confirmButtonColor: "#8aa899"
            });
          }
        });
      }
       

    return (
        <div className={s.review}>
            <div className={s.topRow} >
                <div className={s.a}>
                      <div className={s.restoIcon}>
                        <AiOutlineShop size={25} style={{ fill:"#8aa899" }}/>
                <Link to = {`/restaurants/${elem.RestaurantId}`} className={s.restoName}>
                      {elem.restaurant}
                      </Link>
                      </div>
                      <div className={s.rating} > 
                        {[...Array(Number(elem.rating)).keys()].map((index) => (
                          <RiStarFill size={20} style={{ fill: "#f2d349" }} key={index} />
                          ))}
                      </div>
                </div>

                  <div>
                      <button onClick={ e => handleDelete(e)} className={s.btn}>
                          <AiOutlineDelete
                            style={{
                              color: "var(--error-color)",
                              fontSize: "25px",
                              float: "left",
                              backgroundColor: "var(-white-color)"
                            }}
                            />
                      </button>
                  </div>
            </div>
            <div className={s.text}>
                <p>{elem.description}</p>
            </div>
        </div> 
    
    )
}
