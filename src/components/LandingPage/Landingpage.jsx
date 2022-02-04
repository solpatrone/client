import React from "react";
import SearchBar from "../SearchBar/Searchbar";
import style from  "./Landingpage.module.css"


function Landingpage() {
  return (
    <div className={style.container}>
    <div className ={style.wrapper}>
    <h3>Encontrá el mejor Restaurant en CABA y reservá tu mesa</h3>
      <SearchBar />
    </div>
    <div className={style.pic}>
    
    </div>
  
    </div>
  );
}

export default Landingpage;
