import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRestoByName, getRestos } from "../../actions";
import styles from "./Searchbar.module.css";

function Searchbar() {
  const resto = useSelector((state) => state.allRestaurants);
  const restoName = resto.map((r) => r.name);

  const dispatch = useDispatch();

  //   // useEffect(()=>{
  //   dispatch(getRestos())
  // },[])

  const [restaurantName, setRestaurantName] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [error, setError] = useState(false);

  function handleInputChange(e) {
    e.preventDefault();
    setRestaurantName(e.target.value);
    searchMatch(e.target.value);
    if (e.target.value === "") {
      dispatch(getRestos());
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getRestoByName(restaurantName)); // action getRestaurant(restaurantName)
  }

  function searchMatch(restaurantName) {
    if (!restaurantName) {
      setSuggestion([]);
      setError(false);
    } else {
      let matches = restoName.filter((r) =>
        r.toLowerCase().includes(restaurantName.toLowerCase())
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
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={restaurantName}
        placeholder="Nombre del Restaurant..."
        onChange={(e) => handleInputChange(e)}
      />
      {!error && suggestion ? (
        suggestion.map((el, index) => {
          return (
            <div key={index} onClick={() => selectElementHandler(el)}>
              {el}
            </div>
          );
        })
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
