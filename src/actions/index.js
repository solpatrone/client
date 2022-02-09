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
  RESERVATION,
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
      var newOwner = await axios.post(
        "http://localhost:3001/restaurant/create",
        info
      );
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
  return {
    type: POST_REVIEW,
    payload,
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

export function reserve(payload) {
  return { type: RESERVATION, payload };
}
