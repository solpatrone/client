import React, { useEffect, useState, useRef } from "react";
import {
  getRestoDetails,
  clearDetailsState,
  getRestaurantReviews,
} from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, Link } from "react-router-dom";
import Navbar from "../NavBar/Navbar";
import { BsCurrencyDollar } from "react-icons/bs";
import { RiStarFill } from "react-icons/ri";
import Review from "../Review/Review";
import Loading from "../Loading/Loading";
import styles from "./MyRestaurant.module.css";
import { Widget } from "@uploadcare/react-widget";
import Carousel from "react-bootstrap/Carousel";
import { addImagesToRestos, getRestoReservations, deleteRestaurant } from "../../actions";
import RestoReservations from "../RestoReservations/RestoReservations";
import { Tab, Row, Col, Nav } from "react-bootstrap";
import {AiOutlineDelete } from "react-icons/ai";
import { FcCheckmark } from "react-icons/fc";
import { BsPencil} from "react-icons/bs";

import Swal from "sweetalert2";

export default function Restaurant() {
  const dispatch = useDispatch();
  const history = useHistory()
  const params = useParams();
  const myRestaurant = useSelector((state) => state.details);
  const widgetApi = useRef();
  const myReservations = useSelector((state) => state.restoReservations);
  const hasReviews = useSelector((state) => state.reviews);

  let [photo, setPhoto] = useState([]);

  useEffect(() => {
    dispatch(getRestoDetails(params.id));
    dispatch(getRestaurantReviews(params.id));
    dispatch(getRestoReservations(params.id));
    return () => {
      dispatch(clearDetailsState());
    }; // eslint-disable-next-line
  }, [params.id]);

  function handleChange(e) {
    var photo = [];

    for (let index = 0; index < e.count; index++) {
      photo.push(
        ("https://ucarecdn.com/" + e.uuid + "/nth/" + index + "/").toString()
      );
      setPhoto(photo);
    }
  }

  
  console.log(params)
  function handleDelete(e){
    e.preventDefault()
    Swal.fire({
      text: `Vas a eliminar ${myRestaurant.name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#8aa899",
      cancelButtonColor: "#d33",
      confirmButtonText: "Guardar cambios",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteRestaurant(params.id))
        Swal.fire({
          text: `${myRestaurant.name} fue elilmiado con éxito`,
          confirmButtonColor: "#8aa899",
        });
          history.push("/home")
         // window.location.reload(false);
      } else if (result.dismiss === "cancel") {
        Swal.fire({
          text: "No se guardaron los cambios",
        });
      }
    });
  }

  function handleClick(e) {
    e.preventDefault();
    Swal.fire({
      text: `Vas a modificar la información de ${myRestaurant.name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#8aa899",
      cancelButtonColor: "#d33",
      confirmButtonText: "Guardar cambios",
    }).then((result) => {
      if (result.isConfirmed) {
        const request = {
          owner: myRestaurant.owner,
          photo: photo,
        };
        dispatch(addImagesToRestos(request, myRestaurant.id));
        setTimeout(() => {
          dispatch(getRestoDetails(params.id));
        }, 1000);
        Swal.fire({
          text: `${myRestaurant.name} fue actualizado con éxito`,
          confirmButtonColor: "#8aa899",
        });
        // window.location.reload(false);
      } else if (result.dismiss === "cancel") {
        Swal.fire({
          text: "No se guardaron los cambios",
        });
      }
    });
    setPhoto([]);
  }

  return (
    <div>
      <Navbar />
      {!myRestaurant.id ? (
        <Loading />
      ) : (
        <div className={styles.centeredContainer}>
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Col sm={3}>
                <Nav variant="" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="first" className={styles.option}>Mi Restaurante</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second" className={styles.option}>Reservas</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="third" className={styles.option}>Reseñas</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <div className={styles.restaurantInfo}>
                      <div className={styles.tittle}>
                        <h2 className={styles.restoName}>
                          {myRestaurant.name}
                        </h2>
                        <Link to={`/modify/${myRestaurant.id}`}>
                        <BsPencil
                          style={{
                            fontSize: "25px",
                          }}
                        />
                        </Link>
                        <button onClick={ e => handleDelete(e)}>
                        <AiOutlineDelete
                          style={{
                            color: "var(--error-color)",
                            fontSize: "25px",
                          }}
                        />
                        </button>
                      </div>
                      <div className={styles.address_icons}>
                        <div className={styles.address}>
                          <p>
                            Dirección:
                            {myRestaurant.address.split(",", 1) +
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
                                  size={13}
                                  style=
                                  {{ fill: "#f2d349" }}
                                  key={key}
                                />
                              )
                            )}
                          </p>
                          {myRestaurant.price && (
                            <p>
                              {[...myRestaurant.price.split("")].map((elem,key) => (
                                <BsCurrencyDollar
                                  size={13}
                                  style={{ color: "var(--dark-color)" }}
                                  key={key}
                                />
                              ))}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className={styles.checks}>
                        {myRestaurant.cuisine.map((el, index) => (
                          <div key={index}>
                            <FcCheckmark /> {el}
                          </div>
                        ))}
                      </div>
                      <div>
                        {myRestaurant.description && (
                          <p className={styles.description}>
                            {myRestaurant.description}
                          </p>
                        )}
                      </div>
                      <Carousel className={styles.restauranteImage}>
                        {myRestaurant &&
                          myRestaurant.photo.map((el, index) => {
                            return (
                              <Carousel.Item
                                key={index}
                                className={styles.itemC}
                              >
                                <img
                                  className={["d-block w-100 h-100"]}
                                  src={el}
                                  alt="First slide"
                                />
                              </Carousel.Item>
                            );
                          })}
                      </Carousel>

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
                          {photo.length > 0 && (
                            <button
                              onClick={(e) => handleClick(e)}
                              className={styles.button}
                            >
                              Guardar Cambios
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </Tab.Pane>

                  <Tab.Pane eventKey="second">
                    <div className={styles.reservationsContainer}>
                      {myReservations.length > 0
                        ? myReservations.map((r) => (
                            <RestoReservations
                              id={r.id}
                              key={r.id}
                              pax={r.pax}
                              date={r.date}
                              time={r.time}
                              username={r.author}
                            />
                          ))
                        : "Aun no hay reservas"}
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="third">
                    <div className={styles.reviewsContainer}>
                      {hasReviews.length > 0 && (
                        <div className={styles.reviews}>
                          <Review reviews={hasReviews} />
                        </div>
                      )}
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      )}
    </div>
  );
}
