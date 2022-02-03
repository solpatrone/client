import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

function Searchbar() {
  const resto = ["bilbao", "la dominga", "jhonny b good", "bilbao2", "el cuartito"];
  const dispatch = useDispatch();
  const [restaurantName, setRestaurantName] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  function handleInputChange(e) {
    e.preventDefault();
    setRestaurantName(e.target.value);
    searchMatch(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(); // action getRestaurant(restaurantName)
    setRestaurantName("");
  }

  function searchMatch(restaurantName) {
    if (!restaurantName) {
      setSuggestion([]);
      setShowOptions(false);
    } else {
      let matches = resto.filter(
        (r) => r.toLowerCase().indexOf(restaurantName.toLocaleLowerCase()) > -1
      );
      if (matches) {
        setShowOptions(true);
        setSuggestion(matches);
      }
    }
  }
  const selectElementHandler = (restaurant) => {
    setRestaurantName(restaurant);
    setShowOptions(false);
  };

  return (
    <div>
      <input
        type="text"
        value={restaurantName}
        placeholder="Nombre del Restaurant..."
        onChange={(e) => handleInputChange(e)}
      />
      {
      restaurantName &&
        suggestion &&
        suggestion.map((el, index) => {
          return (
            <div key={index} onClick={() => selectElementHandler(el)}>
              {el}
            </div>
          );
        })}
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        Buscar
      </button>
    </div>
  );
}

export default Searchbar;
