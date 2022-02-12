import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { getRestaurantReviews, postReview, putRating } from "../../actions";
import styles from "./ReviewForm.module.css"
import { RiStarFill } from "react-icons/ri";
import Cookies from "universal-cookie";
import {useParams } from "react-router-dom";



export default function ReviewForm({setNewReview}) {
  const cookies = new Cookies();
  const params = useParams();
  const [review, setReview] = useState({
    rating: "",
    description: "",
    email: cookies.get("email"),
    id: params.id,
  });
 
 

  function changeRating (){
    if(reviews.length >0){
      let ratingRev = reviews.map(el => Number(el.rating))
      let sum = ratingRev.reduce((acc,curr) => acc + curr, 0)
      let prom = Math.round(sum/ratingRev.length)
      let newRating = String(prom)
      return newRating
    }
  }

  // console.log('Rating promedio ' + JSON.stringify(changeRating()))


  let [err, setErr] = useState({hasErr : true});


  const reviews = useSelector((state) => state.reviews)
  const details = useSelector((state) => state.details)

  function changeRating (){
    if(reviews.length >0){
      let ratingRev = reviews.map(el => Number(el.rating))
      let sum = ratingRev.reduce((acc,curr) => acc + curr, 0)
      let prom = Math.round(sum/ratingRev.length)
      let newRating = {rating:String(prom), owner: details[0].owner}
      console.log(newRating)
      return newRating
    }
  }

  function validate(review) {
    let err = {hasErr : false}
    if (review.description === "") {
      err.description = `Debes completar este campo`;
      err.hasErr = true;
   }
   if(review.rating === ""){
     err.rating = `Debes completar este campo`;
     err.hasErr = true;
   }
   console.log(err)
  return err;
  
  }
  
 

  const dispatch = useDispatch();

  let ratings = [
    { name: "one", label: <RiStarFill size={20} style={{ fill: '#f2d349' }} />, value: "1" },
    { name: "two", label: [...Array(2).keys()].map((index) => <RiStarFill size={20} style={{ fill: '#f2d349' }} key={index}/>), value: "2" },
    { name: "three", label:[...Array(3).keys()].map((index) => <RiStarFill size={20} style={{ fill: '#f2d349' }} key={index}/>), value: "3" },
    { name: "four", label:  [...Array(4).keys()].map((index) => <RiStarFill size={20} style={{ fill: '#f2d349' }} key={index}/>), value: "4" },
    { name: "five", label:  [...Array(5).keys()].map((index) => <RiStarFill size={20} style={{ fill: '#f2d349' }} key={index}/>), value: "5" },
  ];

  function handleRatings(e) {
    setReview({ ...review, rating: e });
    setErr(validate({ ...review, rating: e }));
  }

  function handleRev(e) {
    setReview({ ...review, [e.target.name]: e.target.value });
    setErr(validate({ ...review, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postReview(review));
    setTimeout(() => {
      dispatch(getRestaurantReviews(params.id))
     ;
    }, 1000);
    setTimeout(() => {
      console.log(changeRating())
      // dispatch(putRating(params.id, changeRating()))
    }, 3000)
    setNewReview(false);
    setTimeout(() => { 
      dispatch(putRating(params.id,changeRating()))
    }, 2000);
    
  }
  function handleClose(e) {
    e.preventDefault();
    setNewReview(false);
  }

  return (
    <div className ={styles.container}>
      <form onSubmit={(e) => handleSubmit(e)} >
        <div>
          <Select
            className={styles.selectRatings}
            options={ratings}
            isMulti={false}
            value={review.rating}
            name={"rating"}
            onChange={(e) => handleRatings(e)}
          />
          {err.rating && <p>{err.rating}</p>}
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
          {err && <p>{err.description}</p>}
        </div>
        <div>
          <button disabled={err.hasErr} >Enviar Reseña</button>
          <button onClick={e => handleClose(e)} >Cerrar</button>
        </div>
      </form>
    </div>
  );
}
