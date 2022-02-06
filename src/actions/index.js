import axios from "axios";

import {
  GET_RESTOS,
  CREATE_CLIENT,
  CREATE_OWNER,
  GET_RESTO_NAME,
  GET_NEIGHBORHOODS,
  GET_RESTO_DETAILS,
  CLEAR_DETAILS_STATE,
  POST_REVIEW,
} from "./types";

export function createClient(info) {
  return { type: CREATE_CLIENT, payload: info };
}

export function createOwner(info) {
  return { type: CREATE_OWNER, payload: info };
}

export function getUseres() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/usuario", {});
    return dispatch({
      type: "GET_RECIPES",
      payload: json.data,
    });
  };
}

export function getRestos() {
  return async function (dispatch) {
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
    let json = await axios.get(`http://localhost:3001/restaurant?name=${name}`);
    return dispatch({
      type: GET_RESTO_NAME,
      payload: json.data,
    });
  };
}
export function getRestoDetails(id) {
  return async function (dispatch) {
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

export function postReview(payload) {
  return {
    type: POST_REVIEW,
    payload,
  };
}
