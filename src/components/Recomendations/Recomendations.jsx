import React from "react";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import { RiStarFill } from "react-icons/ri";
import s from "./Recomendations.module.css";
import defaultImage from "../../assets/no_food.png";
// import { Card } from "react-bootstrap";

export default function Recomendations({ allRestaurants }) {
  let recomendations = allRestaurants.filter((r) => r.rating === "5");
 

  return (
    <div className={s.container}>
      <Carousel className={s.carContainer}>
        {recomendations?.map((r, i) => (
          <Carousel.Item key={i}>
            {/* <img
              className={["d-block w-100 ", s.img]}
              src={r.photo[0] ? r.photo[0] : { defaultImg }}
              alt="First slide"
              style={{ filter: "grayscale(100%)" }}
            /> */}
            {r.photo && r.photo.length > 0 ? (
              <img
              className={["d-block w-100 ", s.img]}
              src={r.photo[0] ? r.photo[0] : { defaultImage }}
              alt="First slide"
              style={{ filter: "grayscale(100%)" }}
            />
            ) : (
              <img src={defaultImage} alt="img not found" width="240px" />
            )}

            <Link to={`/restaurants/${r.id}`} className={s.link}>
              <Carousel.Caption className={s.infoContainer}>
                <div className={s.title}>{r.name}</div>
                {/* <div className={s.barrio}>{r.neighborhood_info[0]}</div> */}
                <div className={s.stars}>
                  {[...Array(Number(r.rating)).keys()].map((key) => (
                    <RiStarFill
                      key={key}
                      style={{ color: "var(--bright-color)" }}
                    />
                  ))}
                </div>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
