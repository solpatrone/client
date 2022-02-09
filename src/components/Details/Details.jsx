import React, { useEffect, useState } from "react";
import { getRestoDetails, clearDetailsState } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams,NavLink } from "react-router-dom";
import Navbar from "../NavBar/Navbar";
import { BsCurrencyDollar } from "react-icons/bs";
import { RiStarFill } from "react-icons/ri";
import styles from "./Details.module.css";
import { BiCommentDetail } from "react-icons/bi";
import ReviewsComments from "../ReviewsComments/ReviewsComments";
import Review from "../Reviews/Review";
import Loading from "../Loading/Loading";
import Cookies from "universal-cookie";

function Details() {
  const dispatch = useDispatch();
  const params = useParams();
  const myRestaurant = useSelector((state) => state.details);
  const [review, setReview] = useState(false);
  const [reviewForm, setReviewForm] = useState(false);
  const cookies= new Cookies()
  const usuario = cookies.get("username")

  useEffect(() => {
    dispatch(getRestoDetails(params.id));
    return () => {
      dispatch(clearDetailsState());
    };
  }, [params.id]);

  function handdleClick(e) {
    e.preventDefault();
    setReview(true);
  }

  return (
    <div>
      <Navbar />
      {myRestaurant.length === 0 ? (
        <Loading/>
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <div className={styles.restaurantInfo}>
              <h2>{myRestaurant[0].name}</h2>

              <div className={styles.address_icons}>
                <div className={styles.address}>
                  <p>
                    Direccion:{" "}
                    {myRestaurant[0].address.split(",", 1) +
                      ", " +
                      myRestaurant[0].neighborhood[0]}
                  </p>
                  <p>
                    Contacto:
                    {myRestaurant[0].email
                      ? myRestaurant[0].email
                      : " No disponible"}
                  </p>
                </div>
                <div className={styles.icons}>
                  <h3>
                    {[...Array(Number(myRestaurant[0].rating)).keys()].map(
                      (key) => (
                        <RiStarFill key={key} />
                      )
                    )}
                  </h3>
                  <h3>
                    {[...myRestaurant[0].price[0].split("")].map(() => (
                      <BsCurrencyDollar />
                    ))}
                  </h3>
                </div>
              </div>

              <img
                src={myRestaurant[0].photo}
                alt="img not found"
                className = {styles.restauranteImage}
                height="auto"
              />
              <p>
                {myRestaurant[0].cuisine.map((el) => (
                  <div className={styles.tag}>{el}</div>
                ))}
              </p>
              {myRestaurant[0].description && (
                <p className={styles.description}>
                  {myRestaurant[0].description}
                </p>
              )}
            </div>
            <div className={styles.reservations}>
                {
                  usuario?
                  <button className={styles.button}>Reservá tu mesa</button>:
                  <button >
                   <NavLink to="/login" >
                  <p className={styles.btn}>Reservá tu mesa</p>
                  </NavLink>
                  </button>
                }
                {
                  usuario?
                  <button
                    className={styles.button}
                    onClick={(e) => handdleClick(e)}
                    >
                    Dejá tu reseña <BiCommentDetail />{" "}
                  </button>:
                  <button >
                    <NavLink to="/login" >
                    <p className={styles.btn}>Dejá te reseña</p>
                    </NavLink>
                  </button>
                }

              {review && <Review />}
            </div>
          </div>
          {review && (
            <div className={styles.reviews}>
              <ReviewsComments />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Details;
