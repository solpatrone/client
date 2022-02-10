import axios from "axios";

import {
  GET_RESTOS,
  GET_RESTO_NAME,
  GET_NEIGHBORHOODS,
  GET_RESTO_DETAILS,
  CLEAR_DETAILS_STATE,
  POST_REVIEW,
  GET_CUISINES,
  LOADING,
  GET_RESTO_REVIEWS,
  POST_RESERVATION,
} from "./types";

export function createClient(info) {
  return async () => {
    try {
      var newClient = await axios.post(
        "http://localhost:3001/user/create",
        info
      );
      console.log(newClient);
      return newClient;
    } catch (e) {
      console.log(e);
    }
  };
}

export function createOwner(info) {
  return async () => {
    try {
      const neighborhood = info.neighborhood_info.name;
      info.neighborhood_info = [neighborhood]

      const price = info.price.name;
      info.price = price

      const cuisineCopy = JSON.parse(JSON.stringify(info.cuisine))//stringfyle== pasa un objeto a un string en format JSON
      info.cuisine = cuisineCopy.map( e => e.name )


      //const person_max=info.personas_max.name;
      //info.personas_max=person_max
      info.personas_max=info.personas_max.name
      

      var newOwner = await axios.post('http://localhost:3001/restaurant/create', info);
      console.log(newOwner);
      return newOwner;
    } catch (e) {
      console.log(e);
    }
  };
}

export function getCuisines() {
  return async function (dispatch) {
    var json = await axios("http://localhost:3001/cuisines");
    let data = json.data;
    return dispatch({
      type: GET_CUISINES,
      payload: data,
    });
  };
}

export function getRestos() {
  return async function (dispatch) {
    dispatch({
      type: LOADING,
    });
    let json = await axios.get("http://localhost:3001/restaurant");
    let data = json.data;
    return dispatch({
      type: GET_RESTOS,
      payload: data,
    });
  };
}

export function getRestoByName(name) {
  return async function (dispatch) {
    dispatch({
      type: LOADING,
    });
    let json = await axios.get(`http://localhost:3001/restaurant?name=${name}`);
    return dispatch({
      type: GET_RESTO_NAME,
      payload: json.data,
    });
  };
}
export function getRestoDetails(id) {
  return async function (dispatch) {
    dispatch({
      type: LOADING,
    });
    let json = await axios.get(`http://localhost:3001/restaurant/${id}`);
    return dispatch({
      type: GET_RESTO_DETAILS,
      payload: json.data,
    });
  };
}
export function clearDetailsState() {
  return {
    type: CLEAR_DETAILS_STATE,
  };
}

export function postReview(payload) {
  const revToBack = ({ rating, description, email, id }) => {
    return {
      rating: rating.value,
      description,
      email,
      id,
    };
  };
  let revFormated = revToBack(payload);
  return async (dispatch) => {
    try {
      let newReview = await axios.post(
        "http://localhost:3001/review/create",
        revFormated
      );
      return dispatch({
        type: POST_REVIEW,
        payload: newReview,
      });
    } catch (e) {
      console.log(e);
    }
  };
}
export function getRestaurantReviews(id) {
  return async function (dispatch) {
    try {
      let json = await axios.post("http://localhost:3001/review/restaurant", {
        id,
      });
      return dispatch({
        type: GET_RESTO_REVIEWS,
        payload: json.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function getNeighborhoods() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/neighborhood");
    var neighborhoods = json.data.map(function (neighborhood) {
      return {
        ...neighborhood,
        value: neighborhood.id,
        label: neighborhood.name,
        name: neighborhood.name,
      };
    });

    return dispatch({
      type: GET_NEIGHBORHOODS,
      payload: neighborhoods,
    });
  };
}

export function postReservation(payload) {
  return async function () {
    try {
      var newRes = await axios.post(
        "http://localhost:3001/reserve/create",
        payload
      );
      alert("Tu reserva a sido realizada");
      return newRes;
    } catch (e) {
      console.log(e);
    }
  };
}
