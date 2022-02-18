import s from "./UserReview.module.css"
import {RiStarFill }from 'react-icons/ri'
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { deleteReview, getRestaurantReviews, putRating, getUserReviews } from "../../actions";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Swal from "sweetalert2";

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
              setTimeout(() => {
                dispatch(getRestaurantReviews(restaurant.id))
                dispatch(putRating(restaurant.id,changeRating()))
              }, 1000);
            Swal.fire({
              text: `Reseña elilmiada con éxito`,
              confirmButtonColor: "#8aa899",
            });
          } else if (result.dismiss === "cancel") {
            Swal.fire({
              text: "No se guardaron los cambios",
            });
          }
        });
      }
       

    return (
        <div className={s.review}>
            <div className={s.topRow} >
                <div className={s.a}>
                      <h4 >{elem.restaurant}</h4>
                      <div className={elem.rating} > 
                        {[...Array(Number(elem.rating)).keys()].map((index) => (
                          <RiStarFill size={20} style={{ fill: "#f2d349" }} key={index} />
                          ))}
                      </div>
                </div>

                  <div className={s.btn}>
                      <button onClick={ e => handleDelete(e)}>
                          <AiOutlineDelete
                            style={{
                              color: "var(--error-color)",
                              fontSize: "25px",
                              float: "left",
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
