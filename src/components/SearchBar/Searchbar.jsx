import React from "react";
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getRestoByName, getRestos} from '../../actions'
import styles from "./Searchbar.module.css"

function Searchbar() {
  const resto = useSelector((state )=> state.allRestaurants);
  const restoName = resto.map(r => r.name)


  const dispatch = useDispatch();

  const [restaurantName, setRestaurantName] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [error, setError] = useState(false);


 
  function handleInputChange(e) {
    e.preventDefault();
    setRestaurantName(e.target.value)
    searchMatch(e.target.value);
    if (e.target.value === '') {
      dispatch(getRestos())
  }
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getRestoByName(restaurantName));
    
  }

  function searchMatch(restaurantName) {
    if (!restaurantName) {
      setSuggestion([]);
      setError(false)
    } else {
      let matches = restoName.filter(
        (r) => r.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(restaurantName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase())      
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
    setSuggestion([])
  };

  return (
    <div className={styles.search}>
      <div className={styles.search_bar}>

      <input className={styles.search_input}
        type="text"
        value={restaurantName}
        placeholder="Nombre del Restaurant..."
        onChange={(e) => handleInputChange(e)}
        onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
      />
      <button type="submit" onClick={(e) => handleSubmit(e)} disabled={error} className={styles.search_button}>
        Buscar
      </button>
      </div>
     
      {!error && suggestion ? (
        <div className={styles.autocomplete}>
        { suggestion.map((el, index) => {
          return (
            <div key={index} onClick={() => selectElementHandler(el)}>
             <div  className={styles.autocompleteItems}> {el}</div>
            </div>
          );
        })}

        </div>
        
      ) : (
        <div className= {styles.error}>Restaurant no disponible</div>
      )}
      
    </div>
  );
}

export default Searchbar;

