import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import Navbar from "../NavBar/Navbar";
import Landingpage from "../LandingPage/Landingpage";
import Cards from "../Cards/Cards";
import Paginate from "../Paginate/Paginate";
import { getRestos, getNeighborhoods } from "../../actions/index";
import Cookies from "universal-cookie/es6";
import Logout from "../Logout/Logout";
import s from "./Home.module.css";

export default function Home() {
  const dispatch = useDispatch();

  const cookies = new Cookies();
  const allRestaurants = useSelector((state) => state.restaurants);
  const allNeighborhoodsRaw = useSelector((state) => state.neighborhoods);
  const allNeighborhoods = allNeighborhoodsRaw.map((n) => {
    return { name: n.name, label: n.name };
  });
  const [restosToShow, setRestosToShow] = useState([]);

  let defaultNeighborhood = { name: "all", label: "Barrios", value: "all" };

  let priceOptions = [
    { name: "all", label: "Precios", value: "all" },
    { name: "$", label: "$", value: "$" },
    { name: "$$", label: "$$", value: "$$" },
    { name: "$$$$", label: "$$$$", value: "$$$$" },
    { name: "$$$$$", label: "$$$$$", value: "$$$$$" },
  ];

  let foodTypes = [
    { name: "all", label: "Tipos de comida", value: "all" },
    { name: "type1", label: "Vegana", value: "type1" },
    { name: "type2", label: "Vegetariana", value: "type2" },
    { name: "type3", label: "Italiana", value: "type3" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [filteredByNeighborhood, setFilteredByNeighborhood] =
    useState(defaultNeighborhood);
  const [filteredByPrice, setFilteredByPrice] = useState(priceOptions[0]);
  const [filteredByFoodTypes, setFilteredByFoodTypes] = useState(foodTypes[0]);
  const [restosPerPage] = useState(12);

  function paginado(pageNumber) {
    setCurrentPage(pageNumber);
  }

  function displaySelectedRestaurantes() {
    let restaurantesByNeighborhood =
      filteredByNeighborhood.value === "all"
        ? allRestaurants
        : allRestaurants.filter((restaurante) =>
            restaurante.neighborhood.some(
              (e) => e === filteredByNeighborhood.name
            )
          );
    let restaurantesByPrice =
      filteredByPrice.value === "all"
        ? restaurantesByNeighborhood
        : restaurantesByNeighborhood.filter((r) =>
            r.price.includes(filteredByPrice.name)
          );
    let restaurantesByFood =
      foodTypes.value === "all"
        ? restaurantesByNeighborhood
        : restaurantesByNeighborhood.filter(
            (r) => r.foodTypes === filteredByNeighborhood.value
          );

    const indexOfLastPost = currentPage * restosPerPage;
    const indexOfFirstPost = indexOfLastPost - restosPerPage;
    const currentRestos = restaurantesByPrice.slice(
      indexOfFirstPost,
      indexOfLastPost
    );

    setRestosToShow(currentRestos);
  }

  useEffect(() => {
    if (allNeighborhoods && allNeighborhoods.length > 0) {
      allNeighborhoods.unshift(defaultNeighborhood);
    }
  }, [allNeighborhoods]);

  useEffect(() => {
    displaySelectedRestaurantes();
  }, [
    allRestaurants,
    filteredByNeighborhood,
    filteredByPrice,
    filteredByFoodTypes,
    currentPage,
  ]);

  // function resetFilters() {
  //   setFilteredByFoodTypes(foodTypes[0]),
  //   setFilteredByNeighborhood(neighborhoodOptions[0]),
  //   setFilteredByPrice(priceOptions[0])
  // }

  function handleNeighborhood(e) {
    setFilteredByNeighborhood(e);
  }

  function handlePrice(e) {
    setFilteredByPrice(e);
  }

  function handleFoodTypes(e) {
    setFilteredByFoodTypes(e);
  }

  useEffect(() => {
    dispatch(getRestos());
    dispatch(getNeighborhoods());
  }, []);

  return (
    <div className={s.container}>
      <Navbar />
      <Landingpage />

      {/* <Filters/> */}
      <div>
        <Select
          options={allNeighborhoods}
          value={filteredByNeighborhood}
          name={"neighborhood"}
          onChange={(e) => handleNeighborhood(e)}
        />
        <Select
          options={priceOptions}
          value={filteredByPrice}
          name={"price"}
          onChange={(e) => handlePrice(e)}
        />
        <Select
          options={foodTypes}
          value={filteredByFoodTypes}
          name={"types"}
          onChange={(e) => handleFoodTypes(e)}
        />
      </div>
      <div>
        <Cards restaurants={restosToShow} />
      </div>
      <div className={s.pagContainer}>
        <Paginate
          restosPerPage={restosPerPage}
          allRestaurants={allRestaurants}
          paginado={paginado}
        />
      </div>
      <div>
        <h3>usuario:{cookies.get("user")}</h3>
        <Logout />
      </div>
    </div>
  );
}
