import React from "react";
import s from "./card.module.css";
import { RiStarFill } from "react-icons/ri";
import defaultImage from "../../assets/no_food.png";

function card({ name, photo, neighborhood, rating }) {
  return (
    <div className={s.container}>
      <div>
        <div className={s.tittle}>{name}</div>
        <div>
          {photo.length > 0 ? (
            <img src={photo[0]} alt="img not found" width="240px" />
          ) : (
            <img src={defaultImage} alt="img not found" width="240px" />
          )}
        </div>
      </div>
      <div className={s.infoContainer}>
        <div className={s.line}>
          <h4>
            {[...Array(Number(rating)).keys()].map((key) => (
              <RiStarFill key={key} style={{ color: "var(--bright-color)" }} />
            ))}
          </h4>
        </div>
        <h4 className={s.nContainer}>
          {neighborhood &&
            neighborhood.map((n, i) => {
              return n + (i < neighborhood.length - 1 ? ", " : "");
            })}
        </h4>
      </div>
    </div>
  );
}

export default card;
