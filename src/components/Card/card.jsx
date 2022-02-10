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
            {rating && [...Array(Number(rating)).keys()].map((key) => (
              <RiStarFill size={25} style={{ fill: '#f2d349' }} key={key} />
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
