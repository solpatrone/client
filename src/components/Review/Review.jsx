import React from 'react';
import {useSelector} from 'react-redux'
import {RiStarFill }from 'react-icons/ri'
import {FaUserCircle} from 'react-icons/fa'
import s from './Review.module.css'

export default function Review() {
  const reviews = useSelector((state) => state.reviews);

  return (
    reviews &&
    reviews.map((r) => {
      return (
        <div className={s.review}>
            <div className={s.user}>
                <FaUserCircle size={40}  style={{ fill: '#8aa899' }}/>
                <p> Nombre</p>
            </div>
            
            <div className={s.text}>
            <p className={s.rating}>
              {[...Array(Number(r.rating.value)).keys()].map((index) => (
                <RiStarFill size={20} style={{ fill: "#f2d349" }} key={index} />
              ))}
            </p>
             <p>{r.rev}</p>
          </div>
        </div>
      );
    })
  );
}