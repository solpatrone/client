import React, { useEffect, useState, useRef } from "react";
import {
  getRestoDetails,
  clearDetailsState,
  getRestaurantReviews,
} from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../NavBar/Navbar";
import { BsCurrencyDollar } from "react-icons/bs";
import { RiStarFill } from "react-icons/ri";
import Review from "../Review/Review";
import Loading from "../Loading/Loading";
import styles from "./MyRestaurant.module.css";
import { Widget } from "@uploadcare/react-widget";
import { addImagesToRestos, getRestoReservations } from "../../actions";
import RestoReservations from "../RestoReservations/RestoReservations";

export default function Restaurant() {
  const dispatch = useDispatch();
  const params = useParams();
  const myRestaurant = useSelector((state) => state.details);
  const widgetApi = useRef();
  const myReservations = useSelector((state) => state.restoReservations);

  const hasReviews = useSelector((state) => state.reviews);

  let [photo, setPhoto] = useState();

  useEffect(() => {
    dispatch(getRestoDetails(params.id));
    dispatch(getRestaurantReviews(params.id));
    dispatch(getRestoReservations(params.id));

    return () => {
      dispatch(clearDetailsState());
    }; // eslint-disable-next-line
  }, []);

  function handleChange(e) {
    var photo = "https://ucarecdn.com/" + e.uuid + "/nth/" + 0 + "/";
    setPhoto(photo);

    //  for (let index = 0; index < e.count ; index++) {
    // setInput({images: input.images.push(('https://ucarecdn.com/' + e.uuid + '/nth/' + index + '/').toString())})
  }

  function handleClick(e) {
    e.preventDefault();
    const request = {
      owner: myRestaurant[0].owner,
      photo: photo,
    };
    dispatch(addImagesToRestos(request, myRestaurant[0].id));
    window.location.reload(false);
  }

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
                </div>
                <div className={styles.icons}>
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
                  </p>
                  {myRestaurant[0].price && (
                    <p>
                      {[...myRestaurant[0].price[0].split("")].map(() => (
                        <BsCurrencyDollar size={20} />
                      ))}
                    </p>
                  )}
                </div>
              </div>

              {/* <div>
                    {currentPhoto > 1 && <button onClick={e => handlePreviousImage(e)}> Previous </button>}
                    <span > aca iria la photo actual </span>
                    {currentPhoto < maxPhoto && <button onClick={e => handleNextPhoto(e)}>  Next</button>}
                </div> */}
              <img
                src={photo ? photo : myRestaurant[0].photo}
                alt="img not found"
                className={styles.restauranteImage}
                height="auto"
              />
              <div className="mt-3">
                <Widget
                  ref={widgetApi}
                  publicKey="0a91ec69631fd28d2d4a"
                  multiple="true"
                  imagesOnly="true"
                  locale="es"
                  onChange={handleChange}
                />
                <div>
                  {photo && (
                    <button onClick={(e) => handleClick(e)}>
                      Guardar Cambios
                    </button>
                  )}
                </div>
              </div>
              <span>
                {myRestaurant[0].cuisine.map((el, index) => (
                  <div key={index} className={styles.tag}>
                    {el}
                  </div>
                ))}
              </span>
              {myRestaurant[0].description && (
                <p className={styles.description}>
                  {myRestaurant[0].description}
                </p>
              )}
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
      )}

      <div>
        <Widget
          ref={widgetApi}
          publicKey="0a91ec69631fd28d2d4a"
          multiple="true"
          imagesOnly="true"
          locale="es"
          onChange={handleChange}
        />
        <div>
          {photo && (
            <button onClick={(e) => handleClick(e)}>Guardar Cambios</button>
          )}
        </div>
      </div>
    </div>
  );
}
