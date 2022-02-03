import React from "react";
import SearchBar from "../SearchBar/Searchbar";
import table from "../../assets/table.jpg"
import "./Landingpage.css"


function Landingpage() {
  return (
    <div class="container">
    <div class ="wrapper">
    <h3>Encontrá el mejor Restaurant en CABA y reservá tu mesa</h3>
      <SearchBar />
    </div>
    <div class="pic">
    
    </div>
  
    </div>
  );
}

export default Landingpage;
