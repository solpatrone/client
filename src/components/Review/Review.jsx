import React from 'react';
import {RiStarFill }from 'react-icons/ri'
import {FaUserCircle} from 'react-icons/fa'
import s from './Review.module.css'
import Cookies from "universal-cookie";

export default function Review({reviews}) {
  const cookies = new Cookies()
    
  return (
    reviews &&
    reviews.map((r) => {
      return (
        <div className={s.review}>
            <div className={s.user}>
                <FaUserCircle size={40}  style={{ fill: '#8aa899' }}/>
                <p>{cookies.get("username")}</p>
            </div>
            
            <div className={s.text}>
            <p className={s.rating}>
              {[...Array(Number(r.rating)).keys()].map((index) => (
                <RiStarFill size={20} style={{ fill: "#f2d349" }} key={index} />
              ))}
            </p>
             <p>{r.description}</p>
          </div>
        </div>
      );
    })
  );
}