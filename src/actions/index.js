import axios from "axios";
import { BiImages } from "react-icons/bi";

import {
  GET_RESTOS,
  GET_RESTO_NAME,
  GET_NEIGHBORHOODS,
  GET_RESTO_DETAILS,
  CLEAR_DETAILS_STATE,
  POST_REVIEW,
  GET_CUISINES,
  LOADING,
  ADD_IMAGES,
  GET_RESTO_REVIEWS,
  POST_RESERVATION,
} from "./types";


const url = 'http://localhost:3001'
const createUser = url + '/user'
const reviewModif = url + '/review'
const restoModif = url + '/restaurant'
const reservationModif = url + '/reserve'
const neighModif = url + "/neighborhood"
const cuisineModif = url + "/cuisines"

export function createClient(info) {
  return async () => {
    try {
      var newClient = await axios.post(
        createUser,
        info
      );
      console.log(newClient);
      return newClient;
    } catch (e) {
      console.log(e);
    }
  };
}

export function addImagesToRestos(info, id){
  return async () => {
   // const request = {photo: info}
    try{
      var newImages = await axios.put(`${restoModif}/${id}`, info);
      return {
        type: ADD_IMAGES,
        payload:newImages
      }
    } catch (e) {
      console.log(e);
    }
  }
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
      

      var newOwner = await axios.post( restoModif , info);
      console.log(newOwner);
      return newOwner;
    } catch (e) {
      console.log(e);
    }
  };
}

export function getCuisines() {
  return async function (dispatch) {
    var json = await axios(cuisineModif);
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
    let json = await axios.get(restoModif);
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
    let json = await axios.get(`${restoModif}?name=${name}`);
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
    let json = await axios.get(`${restoModif}/${id}`);
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
  const revToBack = ({rating, description, email, id}) =>{
    return{
      rating: rating.value,
      description,
      author: email,
      id

      
    }
  }
  let revFormated = revToBack(payload)
  return async (dispatch)=>{
    try{
      let newReview= await axios.post( reviewModif, revFormated)
      return dispatch({
        type: POST_REVIEW,
        payload: newReview,
      });
      

    }catch(e){
      console.log(e)
    }
  }
}
export function getRestaurantReviews(id){
  return async function(dispatch){
    try{
      let json = await axios.get(`${reviewModif}/${id}`)
      return dispatch({
        type: GET_RESTO_REVIEWS,
        payload: json.data,
      });
    }catch(e){
        console.log(e)
    }
  }
}

export function getNeighborhoods() {
  return async function (dispatch) {
    var json = await axios.get(neighModif);
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
        reservationModif,
        payload
      );
      alert("Tu reserva a sido realizada");
      return newRes;
    } catch (e) {
      console.log(e);
    }
  };
}
