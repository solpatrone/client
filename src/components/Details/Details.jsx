import React, { useEffect, useState } from "react";
import { getRestoDetails, clearDetailsState, getRestaurantReviews } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import Navbar from "../NavBar/Navbar";
import { BsCurrencyDollar } from "react-icons/bs";
import { RiStarFill } from "react-icons/ri";
import styles from "./Details.module.css";
import { BiCommentDetail } from "react-icons/bi";
import Review from "../Review/Review";
import ReviewForm from "../ReviewForm/ReviewForm";
import Loading from "../Loading/Loading";
import Cookies from "universal-cookie";
import Reservations from "../Reservation/Reservations";

function Details() {
  const dispatch = useDispatch();
  const params = useParams();
  const myRestaurant = useSelector((state) => state.details);
  const [newReview, setNewReview] = useState(false);
  const hasReviews = useSelector(state => state.reviews)
  const cookies= new Cookies()
  const usuario = cookies.get("username")

  useEffect(() => {
    dispatch(getRestoDetails(params.id))
    dispatch(getRestaurantReviews(params.id))
    return () => {
      dispatch(clearDetailsState());
    };
  }, [params.id]);

  function handdleClick(e) {
    e.preventDefault();
    setNewReview(!newReview);
  }

//   function handlePreviousImage(e) {
//     e.preventDefault();
//     setCurrentImage(--currentImage)
// }

  return (
    <div>
      <Navbar />
      {myRestaurant.length === 0 ? (
        <Loading />
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <div className={styles.restaurantInfo}>
              <h2>{myRestaurant[0].name}</h2>

              <div className={styles.address_icons}>
                <div className={styles.address}>
                  <p>
                    Direccion: {" "} 
                    {myRestaurant[0].address.split(",", 1) +
                      ", " +
                      myRestaurant[0].neighborhood_info[0]}
                  </p>
                   {myRestaurant[0].email !== " - " && <p>Contacto:
                    {" " + myRestaurant[0].email}</p> }
                    
                </div>
                <div className={styles.icons}>
                  <p>
                    {[...Array(Number(myRestaurant[0].rating)).keys()].map(
                      (key) => (
                        <RiStarFill size={20} style={{ fill: '#f2d349' }} key={key} />
                      )
                    )}
                  </p>
                  {myRestaurant[0].price &&
                  <p>
                  {[...myRestaurant[0].price.split("")].map(() => (
                    <BsCurrencyDollar size={20} />
                  ))}
                </p> }
                  
                </div>
              </div>
              
              {/* <div>
                    {currentPhoto > 1 && <button onClick={e => handlePreviousImage(e)}> Previous </button>}
                    <span > aca iria la photo actual </span>
                    {currentPhoto < maxPhoto && <button onClick={e => handleNextPhoto(e)}>  Next</button>}

                </div> */}


              <img
                src={myRestaurant[0].photo}
                alt="img not found"
                className={styles.restauranteImage}
                height="auto"
              />
              <span>
                {myRestaurant[0].cuisine.map((el, index) => (
                  <div key={index} className={styles.tag}>{el}</div>
                ))}
              </span>
              {myRestaurant[0].description && (
                <p className={styles.description}>
                  {myRestaurant[0].description}
                </p>
              )}
            </div>
            <div className={styles.reservations}>
              {usuario ? (
                <Reservations
                  restoId={myRestaurant}
                  userId={cookies.cookies.email}
                />
              ) : (
                <button>
                  <NavLink to="/login">
                    <p className={styles.btn}>Reservá tu mesa</p>
                  </NavLink>
                </button>
              )}
              {usuario ? (
                <button
                  className={styles.button}
                  onClick={(e) => handdleClick(e)}
                >
                  Dejá tu reseña <BiCommentDetail />
                </button>
              ) : (
                <button>
                  <NavLink to="/login">
                    <p className={styles.btn}>Dejá te reseña</p>
                  </NavLink>
                </button>
              )}

              {newReview && <ReviewForm setNewReview={setNewReview} />}
            </div>
          </div>
          <div>
          {hasReviews.length > 0 && (
            <div className={styles.reviews}>
              <h3>Opiniones</h3>                    
              <Review reviews={hasReviews} />
            </div>
          )}
          </div>
        </div>
      )}
    </div>
  );
}
export default Details;