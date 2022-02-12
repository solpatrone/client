import React from "react";
import { RiStarFill } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import s from "./Review.module.css";
import Cookies from "universal-cookie";

export default function Review({ reviews }) {
  const cookies = new Cookies();
  console.log(reviews);

  return (
    reviews &&
    reviews.map((r,index) => {
      return (
        <div key={index} className={s.review}>
          <div className={s.info}>
            <div className={s.user}>
              <FaUserCircle size={40} style={{ fill: "#8aa899" }} />
              <div className={s.name_date}>
                <p className = {s.name}>{r.user}</p>
                <p className = {s.date}>
                  {r.createdAt.split("T", 1)[0].split("-").reverse().join("-")}
                </p>
              </div>
            </div>
            <p className={s.rating}>
              {[...Array(Number(r.rating)).keys()].map((index) => (
                <RiStarFill size={20} style={{ fill: "#f2d349" }} key={index} />
              ))}
            </p>
          </div>

          <div className={s.text}>
            <p>{r.description}</p>
          </div>
        </div>
      );
    })
  );
}
