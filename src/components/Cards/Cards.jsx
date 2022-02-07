import React from "react";
import { useSelector } from 'react-redux';
import Card from "../Card/card";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import style from "./Cards.module.css";
import { LOADING } from "../../actions/types";
export default function Cards({ restaurants }) {
  const loading = useSelector((state) => state.loading);
  return (
    <div >

        {(restaurants.length > 0) ? 
        
          <section className={style.slider}>

          {restaurants.map((r) => {
            return (
              <Link to={`/restaurants/${r.id}`} className={style.linkCard}>
                <div className={style.box} key={r.id}>
                  <Card
                    name={r.name}
                    photo={r.photo}
                    neighborhood={r.neighborhood}
                    rating={r.rating}
                  />
                </div>
              </Link>
            );
          })}
          </section>
        
          : <div className={style.errors}>No se encontraron restaurantes</div>}
    </div>
  );
}
