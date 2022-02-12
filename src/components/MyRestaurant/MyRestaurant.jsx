import React, { useEffect } from "react";
import {
  getRestoDetails,
  clearDetailsState,
  getRestaurantReviews,
  getRestoReservations,
} from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../NavBar/Navbar";

import Loading from "../Loading/Loading";
import s from "./MyRestaurant.module.css";
import { RiStarFill } from "react-icons/ri";
import { BsCurrencyDollar } from "react-icons/bs";
import Review from "../Review/Review";
import RestoReservations from "../RestoReservations/RestoReservations";

export default function Restaurant() {
  const dispatch = useDispatch();
  const params = useParams();
  const myRestaurant = useSelector((state) => state.details);
  console.log(myRestaurant);
  const myReservations = useSelector((state) => state.restoReservations);
  console.log(myReservations);

  const hasReviews = useSelector((state) => state.reviews);
  useEffect(() => {
    dispatch(getRestoDetails(params.id));
    dispatch(getRestaurantReviews(params.id));
    dispatch(getRestoReservations(params.id));
    return () => {
      dispatch(clearDetailsState());
    }; // eslint-disable-next-line
  }, []);

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
        <div>
          <div className={s.generalInfo}>
            <div>
              <h2>{myRestaurant[0].name}</h2>
            </div>
            <div>
              <p>
                Direccion:
                {myRestaurant[0].address.split(",", 1) +
                  ", " +
                  myRestaurant[0].neighborhood_info[0]}
              </p>
              {myRestaurant[0].email !== " - " && (
                <p>
                  Contacto:
                  {" " + myRestaurant[0].email}
                </p>
              )}
              <p>
                {[...Array(Number(myRestaurant[0].rating)).keys()].map(
                  (key) => (
                    <RiStarFill
                      size={20}
                      style={{ fill: "#f2d349" }}
                      key={key}
                    />
                  )
                )}
                <p></p>
              </p>
              <p>
                {[...myRestaurant[0].price].map((key, i) => (
                  <BsCurrencyDollar size={20} key={i} />
                ))}
              </p>

              <img
                src={myRestaurant[0].photo}
                alt="img not found"
                className={s.restauranteImage}
                height="auto"
              />
              <span>
                {myRestaurant[0].cuisine.map((el, index) => (
                  <div key={index} className={s.tag}>
                    {el}
                  </div>
                ))}
              </span>
              {myRestaurant[0].description && (
                <p className={s.description}>{myRestaurant[0].description}</p>
              )}
            </div>
            <div>
              {hasReviews.length > 0 && (
                <div className={s.reviews}>
                  <h3>Opiniones</h3>
                  <Review reviews={hasReviews} />
                </div>
              )}
            </div>
            <div>
              <h3>Reservas</h3>

              {myReservations.length > 0
                ? myReservations.map((r) => (
                    <RestoReservations
                      id={r.id}
                      key={r.id}
                      pax={r.pax}
                      date={r.date}
                      time={r.time}
                    />
                  ))
                : "Aun no hay reservas"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
