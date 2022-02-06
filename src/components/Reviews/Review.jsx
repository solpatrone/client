import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { postReview } from "../../actions";

export default function Review() {
  const [review, setReview] = useState({
    rating: "",
    rev: "",
  });

  const reviews = useSelector((state) => state.reviews);
  console.log(reviews);
  const dispatch = useDispatch();

  let ratings = [
    { name: "one", label: "1.0", value: "1" },
    { name: "two", label: "2.0", value: "2" },
    { name: "three", label: "3.0", value: "3" },
    { name: "four", label: "4.0", value: "4" },
    { name: "five", label: "5.0", value: "5" },
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
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
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
            name="rev"
            cols="100"
            rows="10"
            placeholder="Escribe tu reseña"
            onChange={(e) => handleRev(e)}
          ></textarea>
        </div>
        <div>
          <button>Enviar Reseña!</button>
        </div>
      </form>
    </div>
  );
}
