import React, { useEffect, useState } from "react";
import {
  getRestoDetails,
  clearDetailsState,
  getRestaurantReviews,
  addFavorite,
  getUserFavorites,
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
import Carousel from "react-bootstrap/Carousel";
import defaultImage from "../../assets/no_food.png";
import { BsHeart } from "react-icons/bs";
import { BsHeartFill } from "react-icons/bs";
import { FcCheckmark } from "react-icons/fc";
import { AiOutlineClose } from "react-icons/ai";
import { BsJournalBookmark } from "react-icons/bs";

function Details() {
  const dispatch = useDispatch();
  const params = useParams();
  const myRestaurant = useSelector((state) => state.details);
  const [newReview, setNewReview] = useState(false);
  const [newReservations, setNewReservations] = useState(false);
  const hasReviews = useSelector((state) => state.reviews);
  const userFavorites = useSelector((state) => state.userFavorites);
  const [favorite, setFavorite] = useState(false);
  const cookies = new Cookies();
  const usuario = cookies.get("username");
  const userId = cookies.get("id");
  let userFavorite = { favorite: params.id };

  useEffect(() => {
    dispatch(getRestoDetails(params.id));
    dispatch(getRestaurantReviews(params.id));
    dispatch(getUserFavorites(userId));
    return () => {
      dispatch(clearDetailsState());
    }; // eslint-disable-next-line
  }, [params.id]);

  useEffect(() => {
    const findFavorite = userFavorites.find(el => el.name === myRestaurant.name)
    console.log('findFAv', findFavorite)
    if (findFavorite) {
      setFavorite(true)
    }
    // eslint-disable-next-line
  }, [userFavorites]);

  function handdleClick(e) {
    e.preventDefault();
    setNewReview(!newReview);
  }

  function handleFavorite(e) {
    e.preventDefault();
    if (!favorite) {
      dispatch(addFavorite(userFavorite, userId));
      setFavorite(true);
    }
  }

  function handleClickReservations(e) {
    e.preventDefault();
    setNewReservations(!newReservations);
  }

  return (
    <div>
      <Navbar />
      {!myRestaurant.id ? (
        <Loading />
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.main}>
            <div className={styles.container}>
              <div className={styles.restaurantInfo}>
                <div className={styles.header}>
                  <h2>{myRestaurant.name}</h2>

                  {userId && (
                    <button
                      style={{ backgroundColor: "white", border:"none" }}
                      onClick={(e) => handleFavorite(e)}
                    >
                      {favorite ? (
                        <BsHeartFill
                          style={{
                            display: "inline-block",
                            fontSize: "25px",
                            color: "var(--error-color)",
                          }}
                        />
                      ) : (
                        <BsHeart
                          style={{
                            display: "inline-block",
                            fontSize: "25px",
                          }}
                        />
                      )}
                    </button>
                  )}
                </div>
                <div className={styles.infoCont}>
                  <div className={styles.address_icons}>
                    <div className={styles.address}>
                      <div className={styles.text}>
                        <strong>Dirección:</strong>
                        <p>
                          {myRestaurant.address &&
                            myRestaurant.address.split(",", 1) +
                              ", " +
                              myRestaurant.neighborhood_info[0]}
                          .
                        </p>
                      </div>
                      <div className={styles.text}>
                        {myRestaurant.email !== " - " && (
                          <>
                            <strong>Contacto:</strong>
                            <p>{" " + myRestaurant.email}</p>
                          </>
                        )}
                      </div>
                    </div>
                    <div className={styles.icons}>
                      <p>
                        {[...Array(Number(myRestaurant.rating)).keys()].map(
                          (key) => (
                            <RiStarFill
                              size={15}
                              style={{ fill: "#f2d349" }}
                              key={key}
                            />
                          )
                        )}
                      </p>
                      {myRestaurant.price && (
                        <p>
                          {[...myRestaurant.price.split("")].map(
                            (elem, key) => (
                              <BsCurrencyDollar size={15} key={key} />
                            )
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className={styles.hash}>
                    <div className={styles.cuisines}>
                      {myRestaurant.cuisine.map((el, index) => (
                        <div key={index} className={styles.tag}>
                          <FcCheckmark /> {el}
                        </div>
                      ))}
                    </div>
                    {myRestaurant.owner === "API" && (
                      <div>
                        <AiOutlineClose
                          style={{ color: "var(--error-color)" }}
                        />
                        No acepta reservas
                      </div>
                    )}
                  </div>
                </div>

                {myRestaurant.photo[0] ? (
                  myRestaurant.photo.length === 1 ? (
                    <img
                      src={myRestaurant.photo}
                      alt="img not found"
                      className={styles.restauranteImage}
                      height="auto"
                    />
                  ) : (
                    <Carousel>
                      {myRestaurant &&
                        myRestaurant.photo?.map((el, index) => {
                          return (
                            <Carousel.Item key={index}>
                              <img
                                className={[
                                  // "d-block w-100",
                                  styles.restauranteImage,
                                ]}
                                src={el}
                                alt="First slide"
                              />
                            </Carousel.Item>
                          );
                        })}
                    </Carousel>
                  )
                ) : (
                  <img src={defaultImage} alt="img not found" width="240px" />
                )}

                {myRestaurant.description && (
                  <p className={styles.description}>
                    {myRestaurant.description}
                  </p>
                )}
              </div>

              {/* reservas */}
              <div className={styles.reservations}>
                {myRestaurant.owner === "API" ? (
                  <p className={styles.empty}>
                    No puedes realizar reservas en este restaurant
                  </p>
                ) : usuario ? (
                  <button
                    className={styles.btn}
                    onClick={(e) => handleClickReservations(e)}
                  >
                    Reservá tu mesa <BsJournalBookmark />
                  </button>
                ) : (
                  <div className={styles.btnCont}>
                    <NavLink to="/login" className={styles.btn}>
                      Reservá tu mesa <BsJournalBookmark />
                    </NavLink>
                  </div>
                )}
              </div>
              <div className={styles.reservations}>
                {newReservations && (
                  <Reservations
                    restoId={myRestaurant}
                    userId={cookies.cookies.email}
                  />
                )}
              </div>
              {/* reseñas */}
              <div className={styles.reviewsCont}>
                <div className={styles.setNewReview}>
                  {newReview && <ReviewForm setNewReview={setNewReview} />}
                </div>
                {hasReviews.length > 0 && (
                  <div className={styles.reviews}>
                    <h3>Reseñas</h3>
                    <Review reviews={hasReviews} />
                  </div>
                )}

                <div className={styles.btnCont}>
                  {usuario ? (
                    <button
                      className={styles.btn}
                      onClick={(e) => handdleClick(e)}
                    >
                      Dejá tu reseña <BiCommentDetail />
                    </button>
                  ) : (
                    <NavLink to="/login" className={styles.btn}>
                      Dejá tu reseña
                    </NavLink>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Details;
