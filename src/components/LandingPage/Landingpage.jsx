import React from "react";
import SearchBar from "../SearchBar/Searchbar";
import style from "./Landingpage.module.css";

function Landingpage() {
  return (
    <div className={style.container}>
      <div className={style.welcome}>
        <div className={style.wrapper}>
          <h3 className={style.first}>Encontrá los mejores</h3>
          <h3 className={style.second}>Restaurants en CABA</h3>
          <h3>
            <strong> y reservá tu mesa!</strong>
          </h3>
        </div>
        <div className={style.searchContainer}>
          <SearchBar />
        </div>
      </div>
      <div className={style.pic}></div>
    </div>
  );
}

export default Landingpage;
