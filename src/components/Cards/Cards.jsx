import React from "react";
import Card from "../Card/card";
import { Link } from "react-router-dom";
import style from "./Cards.module.css";
export default function Cards({ restaurants }) {
  return (
    <div>
      {restaurants.length > 0 ? (
        <section className={style.slider}>
          {restaurants.map((r) => {
            return (
              <Link
                to={`/restaurants/${r.id}`}
                className={style.linkCard}
                key={r.id}
              >
                <div className={style.box} key={r.id}>
                  <Card
                    name={r.name}
                    photo={r.photo}
                    neighborhood={r.neighborhood_info}
                    rating={r.rating}
                  />
                </div>
              </Link>
            );
          })}
        </section>
      ) : (
        <div className={style.errors}>No se encontraron restaurantes</div>
      )}
    </div>
  );
}
