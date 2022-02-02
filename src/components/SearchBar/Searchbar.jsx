import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

function Searchbar() {
  const dispatch = useDispatch();
  const [restaurantName, setRestaurantName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setRestaurantName(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(); // action getRestaurant(restaurantName)
    setRestaurantName("");
  }

  return (
    <div>
      <input
        type="text"
        value={restaurantName}
        placeholder="Nombre del Restaurant..."
        onChange={(e) => handleInputChange(e)}
      />
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        Buscar
      </button>
    </div>
  );
}

export default Searchbar;
