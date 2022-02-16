import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRestoByName, getRestos } from "../../actions";
import styles from "./Searchbar.module.css";

function Searchbar() {
  const restoRaw = useSelector((state) => state.allRestaurants);
  const resto = restoRaw.filter(resto => resto.status === "ENABLED")
  const restoName = resto.map((r) => r.name);

  const searchedResto = useSelector((state) => state.restaurants);

  const dispatch = useDispatch();

  const [restaurantName, setRestaurantName] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [error, setError] = useState(false);

  function handleInputChange(e) {
    e.preventDefault();
    setRestaurantName(e.target.value);
    searchMatch(e.target.value);
    if (searchedResto.length <= 1 && e.target.value === "") {
      dispatch(getRestos());
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getRestoByName(restaurantName));
  }

  function searchMatch(restaurantName) {
    if (!restaurantName) {
      setSuggestion([]);
      setError(false);
    } else {
      let matches = restoName.filter((r) =>
        r
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .includes(
            restaurantName
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .toLowerCase()
          )
      );
      if (matches.length) {
        setSuggestion(matches);
        setError(false);
      } else {
        setError(true);
      }
    }
  }
  const selectElementHandler = (restaurant) => {
    setRestaurantName(restaurant);
    setSuggestion([]);
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={restaurantName}
        placeholder="Nombre del Restaurant..."
        onChange={(e) => handleInputChange(e)}
        onKeyPress={(e) => e.key === "Enter" && handleSubmit(e)}
      />
      {!error && suggestion ? (
        <div className={styles.autocomplete}>
          {suggestion.map((el, index) => {
            return (
              <div
                className={styles.autocompleteItems}
                key={index}
                onClick={() => selectElementHandler(el)}
              >
                {el}
              </div>
            );
          })}
        </div>
      ) : (
        <p>Restaurant no disponible</p>
      )}
      <button type="submit" onClick={(e) => handleSubmit(e)} disabled={error}>
        Buscar
      </button>
    </div>
  );
}

export default Searchbar;
