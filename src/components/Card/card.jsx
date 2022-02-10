import React from "react";
import s from "./card.module.css";
import defaultImg from "../../assets/table.jpg";
import { RiStarFill } from "react-icons/ri";

function card({ name, photo, neighborhood_info, rating }) {
  return (
    <div className={s.container}>
      <div>
        <div className={s.tittle}>{name}</div>
        <div>
          <img
            src={photo ? photo : defaultImg}
            alt="img not found"
            width="240px"
          />
        </div>
        <div className={s.line}>
          <h4>
            {[...Array(Number(rating)).keys()].map((key) => (
              <RiStarFill key={key} style={{ color: "var(--bright-color)" }} />
            ))}
          </h4>
        </div>
      </div>
      <div>
        <h4>
          {neighborhood_info &&
            neighborhood_info.map((n, i) => {
              return n + (i < neighborhood_info.length - 1 ? ", " : "");
            })}
        </h4>
      </div>
    </div>
  );
}

export default card;
