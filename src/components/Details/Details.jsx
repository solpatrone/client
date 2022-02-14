import React, { useEffect, useState } from "react";
import {
  getRestoDetails,
  clearDetailsState,
  getRestaurantReviews,
} from "../../actions";
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
import Carousel from 'react-bootstrap/Carousel'

function Details() {
  const dispatch = useDispatch();
  const params = useParams();
  const myRestaurant = useSelector((state) => state.details);
  const [newReview, setNewReview] = useState(false);
  const hasReviews = useSelector((state) => state.reviews);

  const cookies = new Cookies();
  const usuario = cookies.get("username");

  console.log(params.id)
  useEffect(() => {
    dispatch(getRestoDetails(params.id));
    dispatch(getRestaurantReviews(params.id));
    return () => {
      dispatch(clearDetailsState());
    }; // eslint-disable-next-line
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
      { !myRestaurant.id ? (
        <Loading />
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <div className={styles.restaurantInfo}>
              <h2>{myRestaurant.name}</h2>

              <div className={styles.address_icons}>
                <div className={styles.address}>
                  <p>
                    Direccion:{" "}
                    {myRestaurant.address && myRestaurant.address.split(",", 1) +
                      ", " +
                      myRestaurant.neighborhood_info[0]}
                  </p>
                  {myRestaurant.email !== " - " && (
                    <p>
                      Contacto:
                      {" " + myRestaurant.email}
                    </p>
                  )}
                </div>
                <div className={styles.icons}>
                  <p>
                    {[...Array(Number(myRestaurant.rating)).keys()].map(
                      (key) => (
                        <RiStarFill
                          size={20}
                          style={{ fill: "#f2d349" }}
                          key={key}
                        />
                      )
                    )}
                  </p>
                  {myRestaurant.price && (
                    <p>
                      {[...myRestaurant.price.split("")].map((key) => (
                        <BsCurrencyDollar size={20} key={key} />
                      ))}
                    </p>
                  )}
                </div>
              </div>
              
 {myRestaurant.photo.length === 1 ?  <img
                src={myRestaurant.photo}
                alt="img not found"
                className={styles.restauranteImage}
                height="auto"
              /> : 
              <Carousel  >
 {myRestaurant && myRestaurant.photo.map((el, index) => {return ( 
 <Carousel.Item key={index}>
    <img
     className= {["d-block w-100", styles.restauranteImage]}
      
      src={el}
      alt="First slide"
    />
  </Carousel.Item>)})}
 
</Carousel> }

              {/* <img
                src={myRestaurant.photo}
                alt="img not found"
                className={styles.restauranteImage}
                height="auto"
              /> */}
              <span>
                {myRestaurant.cuisine.map((el, index) => (
                  <div key={index} className={styles.tag}>
                    {el}
                  </div>
                ))}
              </span>
              {myRestaurant.description && (
                <p className={styles.description}>
                  {myRestaurant.description}
                </p>
              )}
            </div>
            <div className={styles.reservations}>
              {myRestaurant.owner === "API" ? (
                <p>No puedes realizar reservas en este restaurant</p>
              ) : usuario ? (
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
                    <p className={styles.btn}>Dejá tu reseña</p>
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
