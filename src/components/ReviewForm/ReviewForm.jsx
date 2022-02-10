import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { getRestaurantReviews, postReview } from "../../actions";
import styles from "./ReviewForm.module.css"
import { RiStarFill } from "react-icons/ri";
import Cookies from "universal-cookie";
import {useParams } from "react-router-dom";

export default function ReviewForm({setNewReview, setReviewForm}) {
  const cookies = new Cookies();
  const params = useParams();
  const [review, setReview] = useState({
    rating: "",
    description: "",
    email: cookies.get("email"),
    id: params.id,
  });

  const [error, setError] = useState(true);

  const dispatch = useDispatch();

  let ratings = [
    { name: "one", label: <RiStarFill size={20} style={{ fill: '#f2d349' }} />, value: "1" },
    { name: "two", label: [...Array(2).keys()].map((index) => <RiStarFill size={20} style={{ fill: '#f2d349' }} key={index}/>), value: "2" },
    { name: "three", label:[...Array(3).keys()].map((index) => <RiStarFill size={20} style={{ fill: '#f2d349' }} key={index}/>), value: "3" },
    { name: "four", label:  [...Array(4).keys()].map((index) => <RiStarFill size={20} style={{ fill: '#f2d349' }} key={index}/>), value: "4" },
    { name: "five", label:  [...Array(5).keys()].map((index) => <RiStarFill size={20} style={{ fill: '#f2d349' }} key={index}/>), value: "5" },
  ];

  function handleRatings(e) {
    setReview((prev) => ({ ...prev, rating: e }));
  }

  function handleRev(e) {
    setReview((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postReview(review));
    setTimeout(() => {
      dispatch(getRestaurantReviews(params.id));
    }, 1000);
    setNewReview(false);
  }
  function handleClose(e) {
    e.preventDefault();
    setNewReview(false);
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)} >
        <div>
          <Select
            className="selectRatings"
            options={ratings}
            isMulti={false}
            value={review.rating}
            name={"rating"}
            onChange={(e) => handleRatings(e)}
          />
        </div>
        <div>
          <textarea
            required
            name="description"
            cols="50"
            rows="15"
            placeholder="Escribe tu reseña"
            onChange={(e) => handleRev(e)}
          ></textarea>
        </div>
        <div>
          <button >Enviar Reseña</button>
          <button onClick={e => handleClose(e)}>Cerrar</button>
        </div>
      </form>
    </div>
  );
}
