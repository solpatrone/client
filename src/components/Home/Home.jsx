import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import Navbar from "../NavBar/Navbar";
import Landingpage from "../LandingPage/Landingpage";
import Cards from "../Cards/Cards";
import Paginate from "../Paginate/Paginate";
import { getRestos, getNeighborhoods, getCuisines } from "../../actions/index";
import s from "./Home.module.css";
import Loading from "../Loading/Loading";
import Recomendations from "../Recomendations/Recomendations";

export default function Home() {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.loading);
  console.log(loading);

  const allRestaurants = useSelector((state) => state.restaurants);
 // const allRestaurantsNo = allRestaurantsRaw.filter(resto => resto.status === "ENABLED")
  const allNeighborhoodsRaw = useSelector((state) => state.neighborhoods);
  const allNeighborhoods = allNeighborhoodsRaw.map((n) => {
    return { name: n.name, label: n.name };
  });

  

  const allCuisinesRaw = useSelector((state) => state.cuisines);
  const allCuisines = allCuisinesRaw.map((n) => {
    return { name: n.name, label: n.name };
  });

  const [restosToShow, setRestosToShow] = useState([]);
  const [toFilter, setToFilter] = useState([]);

  let defaultNeighborhood = { name: "all", label: "Barrios", value: "all" };
  let defaultCuisine = {
    name: "all",
    label: "Categoria de comida",
    value: "all",
  };

  let priceOptions = [
    { name: "all", label: "Precios", value: "all" },
    { name: "$", label: "$", value: "$" },
    { name: "$$", label: "$$", value: "$$" },
    { name: "$$$", label: "$$$", value: "$$$" },
    { name: "$$$$", label: "$$$$", value: "$$$$" },
    { name: "$$$$$", label: "$$$$$", value: "$$$$$" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [filteredByNeighborhood, setFilteredByNeighborhood] =
    useState(defaultNeighborhood);
  const [filteredByPrice, setFilteredByPrice] = useState(priceOptions[0]);
  const [filteredByFoodTypes, setFilteredByFoodTypes] =
    useState(defaultCuisine);
  const [restosPerPage] = useState(12);

  function paginado(pageNumber) {
    setCurrentPage(pageNumber);
  }

  function displaySelectedRestaurantes() {
    let restaurantesByNeighborhood =
      filteredByNeighborhood.value === "all"
        ? allRestaurants
        : allRestaurants.filter((restaurante) =>
            restaurante.neighborhood_info.some(
              (e) => e === filteredByNeighborhood.name
            )
          );
    let restaurantesByPrice =
      filteredByPrice.value === "all"
        ? restaurantesByNeighborhood
        : restaurantesByNeighborhood.filter(
            (r) => r.price === filteredByPrice.name
          );
    let restaurantesByFood =
      filteredByFoodTypes.value === "all"
        ? restaurantesByPrice
        : restaurantesByPrice.filter((restaurante) =>
            restaurante.cuisine.some((e) => e === filteredByFoodTypes.name)
          );

    const indexOfLastPost = currentPage * restosPerPage;
    const indexOfFirstPost = indexOfLastPost - restosPerPage;
    const currentRestos = restaurantesByFood.slice(
      indexOfFirstPost,
      indexOfLastPost
    );

    setRestosToShow(currentRestos);
    setToFilter(restaurantesByFood);
  }

  useEffect(() => {
    if (allNeighborhoods && allNeighborhoods.length > 0) {
      allNeighborhoods.unshift(defaultNeighborhood);
    } // eslint-disable-next-line
  }, [allNeighborhoods]);

  useEffect(() => {
    if (allCuisines && allCuisines.length > 0) {
      allCuisines.unshift(defaultCuisine);
    } // eslint-disable-next-line
  }, [allNeighborhoods]);

  useEffect(() => {
    displaySelectedRestaurantes(); // eslint-disable-next-line
  }, [
    allRestaurants,
    filteredByNeighborhood,
    filteredByPrice,
    filteredByFoodTypes,
    currentPage,
  ]);

  function resetFilters() {
    setFilteredByFoodTypes(defaultCuisine);
    setFilteredByNeighborhood(allNeighborhoods[0]);
    setFilteredByPrice(priceOptions[0]);
    setCurrentPage(1);
  }

  function handleNeighborhood(e) {
    setFilteredByNeighborhood(e);
    setCurrentPage(1);
  }

  function handlePrice(e) {
    setFilteredByPrice(e);
    setCurrentPage(1);
  }

  function handleFoodTypes(e) {
    setFilteredByFoodTypes(e);
    setCurrentPage(1);
  }

  useEffect(() => {
    dispatch(getRestos());
    dispatch(getNeighborhoods());
    dispatch(getCuisines()); // eslint-disable-next-line
  }, []);

  function handleReload(e) {
    dispatch(getRestos());
    resetFilters();
  }

  return (
    <div className={s.container}>
      <Loading />
      <Navbar />
      <Landingpage />
      <Recomendations allRestaurants={allRestaurants} />
      <div>
        <div className={"removeButton"}>
          {(filteredByNeighborhood.value !== "all" ||
            filteredByPrice.value !== "all" ||
            filteredByFoodTypes.value !== "all") && (
            <button className={s.button} onClick={(e) => handleReload(e)}>
              Mostrar todos los Restos
            </button>
          )}
        </div>
        <Select
          className={s.options}
          options={allNeighborhoods}
          value={filteredByNeighborhood}
          name={"neighborhood"}
          onChange={(e) => handleNeighborhood(e)}
        />
        <Select
          className={s.options}
          options={priceOptions}
          value={filteredByPrice}
          name={"price"}
          onChange={(e) => handlePrice(e)}
        />
        <Select
          className={s.options}
          options={allCuisines}
          value={filteredByFoodTypes}
          name={"types"}
          onChange={(e) => handleFoodTypes(e)}
        />
      </div>
      {loading ? (
        <div>cargando</div>
      ) : (
        <div>
          <Cards restaurants={restosToShow} />
        </div>
      )}
      <div className={s.pagContainer}>
        <Paginate
          restosPerPage={restosPerPage}
          allRestaurants={toFilter}
          paginado={paginado}
        />
      </div>
    </div>
  );
}
