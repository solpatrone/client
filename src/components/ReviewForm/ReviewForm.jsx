import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { getRestaurantReviews, getRestoDetails, postReview, putRating } from "../../actions";
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
 
  let [err, setErr] = useState({hasErr : true});


  const reviews = useSelector((state) => state.reviews)
  const details = useSelector((state) => state.details)

  function changeRating (){
    let newRating = {};
   if(details.owner === "API" && !reviews.length){    // Toma el rating de la api + el input
    let sum = Number(details.rating) + Number(review.rating.value)
    let prom = details.rating === "0" ? Math.round(sum) : Math.round(sum/2)
     newRating = {rating:String(prom), owner: details.owner }
   
   }else if (details.owner === "API" && reviews.length > 0){     // Toma el rating de la api + lo que haya en reviews + el input
    let ratingRev = reviews.map(el => Number(el.rating)).concat(Number(review.rating.value))
    let sum =  ratingRev.reduce((acc,curr) => acc + curr, 0)
    let prom = Math.round(sum /ratingRev.length)
     newRating = {rating:String(prom), owner: details.owner }
    
   }else if(details.owner !== "API" && reviews.length >0){          // toma cada valor de reviews + el input
      let ratingRev = reviews.map(el => Number(el.rating)).concat(Number(review.rating.value))
      let sum = ratingRev.reduce((acc,curr) => acc + curr, 0)
      let prom = Math.round(sum/ratingRev.length)
       newRating = {rating:String(prom), owner: details.owner}
     
    }else{                                                  // si es un resto creado y no tiene review, toma el valor del input
      newRating = {rating : review.rating.value, owner:details.owner}
    }
    return newRating
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
   dispatch(putRating(params.id,changeRating()))
    setTimeout(() => {
      dispatch(getRestaurantReviews(params.id))
      dispatch(getRestoDetails(params.id));
    }, 1000);
    setNewReview(false);
    
    
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
          {err.rating && <p className={styles.error}>{err.rating}</p>}
        </div>
        <div>
          <textarea
            className={styles.input}
            required
            name="description"
            cols="50"
            rows="8"
            placeholder="Escribe tu rese??a"
            onChange={(e) => handleRev(e)}
          ></textarea>
          {err && <p className={styles.error}>{err.description}</p>}
        </div>
        <div>
          <button disabled={err.hasErr} className={styles.button} >Enviar Rese??a</button>
          <button onClick={e => handleClose(e)} className={styles.button} >Cerrar</button>
        </div>
      </form>
    </div>
  );
}


