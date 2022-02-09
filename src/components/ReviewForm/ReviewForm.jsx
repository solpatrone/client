import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { postReview } from "../../actions";
import styles from "./ReviewForm.module.css"
import { RiStarFill } from "react-icons/ri";

export default function ReviewForm({setNewReview}) {
  const [review, setReview] = useState({
    rating: "",
    rev: "",
  });
  const [error,setError] = useState(false)

  const reviews = useSelector((state) => state.reviews);
 
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
    e === "" ? setError(true) : setError(false)
  }

  function handleRev(e) {
    setReview((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    e.target.value === "" ? setError(true) : setError(false)
  }
  

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postReview(review));
    setNewReview(false)
  }
  function handleClose(e){
    e.preventDefault();
    setNewReview(false)
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)} disabled={error}>
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
            name="rev"
            cols="50"
            rows="10"
            placeholder="Escribe tu reseña"
            onChange={(e) => handleRev(e)}
          ></textarea>
        </div>
        <div>
          <button  disabled={error} >Enviar Reseña</button>
          <button onClick={e => handleClose(e)}>Cerrar</button>
        </div>
      </form>
    </div>
  );
}
