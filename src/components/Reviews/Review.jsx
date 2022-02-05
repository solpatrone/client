import React, { useState } from "react";
import Select from "react-select";

export default function Review() {
  const [review, setReview] = useState({
    rating: "",
    rev: "",
  });

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

  return (
    <div>
      <form>
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
          ></textarea>
        </div>
        <div>
          <button>Enviar Reseña!</button>
        </div>
      </form>
    </div>
  );
}
