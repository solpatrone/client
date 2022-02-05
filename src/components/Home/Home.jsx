import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { NavLink } from "react-router-dom";
import "./Home.css";
import Navbar from "../NavBar/Navbar";
import Landingpage from "../LandingPage/Landingpage";
import Cards from "../Cards/Cards";
import Paginate from "../Paginate/Paginate";
import Filters from "../Filters/Filters";
import { getRestos } from "../../actions/index";
//import Cookies from "universal-cookie";
//import Logout from "../Logout/Logout";

export default function Home() {
  const dispatch = useDispatch();

  //const cookies = new Cookies();
  const allRestaurants = useSelector((state) => state.restaurants);

  //estados locales para paginado
  const [currentPage, setCurrentPage] = useState(1);
  const [restosPerPage] = useState(12);
  const indexOfLastPost = currentPage * restosPerPage;
  const indexOfFirstPost = indexOfLastPost - restosPerPage;
  const currentRestos = allRestaurants.slice(indexOfFirstPost, indexOfLastPost);

  function paginado(pageNumber) {
    setCurrentPage(pageNumber);
  }

  useEffect(() => {
    dispatch(getRestos());
  }, [dispatch]);
 
  //const restoName= cookies.get('restoName');
  //const usuario = cookies.get('name');

  //{usuario?<h3>Bienvenido: {cookies.get('name')}</h3> : ""}                
  //{restoName? <h3>Resto: {cookies.get('restoName')} </h3>: ""}
  //{usuario?  <Logout/>:""}
  return (
    <div>
      <Navbar />
      <Landingpage />
      <Paginate
        restosPerPage={restosPerPage}
        allRestaurants={allRestaurants}
        paginado={paginado}
      />
      <Filters />
      <Cards restaurants={currentRestos} />
     
    </div>
  );
}


