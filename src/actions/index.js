import axios from "axios";
import Swal from "sweetalert2";

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
  GET_MY_RESTOS,
  GET_RESTO_RESERVATIONS,
  PUT_RATING,
  GET_USER_REVIEWS,
  GET_USER_RESERVATION,
  DELETE_RESTAURANT,
  DELETE_REVIEW,
  MODIF_USER,
  GET_USER_FAVORITES,
  // DELETE_FAVORITE,
  ADD_FAVORITE,
} from "./types";

const url = "http://localhost:8080";
const userModif = url + "/users";
const restoModif = url + "/restaurants";
const neighModif = url + "/neighborhoods";
const cuisineModif = url + "/cuisines";

export function createClient(info) {
  return async () => {
    try {
      var newClient = await axios.post(userModif, info);
      Swal.fire({
        text: "Se ha registrado correctamente",
        confirmButtonColor: "#8aa899",
      }).then(function () {
        window.location = "/Login";
      });
      return newClient;
    } catch (e) {
      Swal.fire({
        text: "El usuario ya se encuentra registrado, intente nuevamente",
        confirmButtonColor: "#8aa899",
      });
    }
  };
}

// ESTA FUNCION EN REALIDAD NOS SIRVE PARA MODIFICAR RESTAURANT!
export function addImagesToRestos(request, id) {
  return async (dispatch) => {
    try {
      var response = await axios.put(`${restoModif}/${id}`, request);
      return dispatch({
        type: GET_RESTO_DETAILS,
        payload: response.data,
      });
    } catch (e) {
      console.error(e);
    }
  };
}



export function putRating(id, info) {
  return async () => {
    try {
      var newRating = await axios.put(`${restoModif}/${id}`, info);
      return {
        type: PUT_RATING,
        payload: newRating,
      };
    } catch (e) {
      console.log(e);
    }
  };
}

export function deleteRestaurant(id) {
  return async () => {
    try {
      var deleteResto = await axios.put(`${restoModif}/${id}/disabled`);
      window.location.href = "/home"
      return {
        type: DELETE_RESTAURANT,
        payload: deleteResto,
      };
    } catch (e) {
      console.log(e);
    }
  };
}

export function createOwner(info) {
  return async () => {
    try {
      const neighborhood = info.neighborhood_info.name;
      info.neighborhood_info = [neighborhood];

      const price = info.price.name;
      info.price = price;

      const cuisineCopy = JSON.parse(JSON.stringify(info.cuisine)); //stringfyle== pasa un objeto a un string en format JSON
      info.cuisine = cuisineCopy.map((e) => e.name);
      info.personas_max = Number(info.personas_max);
      console.log("try");
      var newOwner = await axios.post(restoModif, info);
      window.location.href= '/home'
      return newOwner;
    } catch (e) {
      console.log("catch");
      alert(e.response.data.message);
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

export function getMyRestos(id) {
  return async function (dispatch) {
    dispatch({
      type: LOADING,
    });
    let json = await axios.get(`${userModif}/${id}/restaurants`);
    let data = json.data;
    return dispatch({
      type: GET_MY_RESTOS,
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
  const revToBack = ({ rating, description, email, id }) => {
    return {
      rating: rating.value,
      description,
      email,
      id,
    };
  };
  let revFormated = revToBack(payload);
  console.log("id", revFormated.id);
  return async (dispatch) => {
    try {
      let newReview = await axios.post(
        `${restoModif}/${payload.id}/reviews`,
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
      let json = await axios.get(`${restoModif}/${id}/reviews`);
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

export function postReservation(date, time, pax, email, id) {
  console.log("action", date);
  console.log("action", id);
  const revToBack = () => {
    return {
      date,
      time: time,
      pax: Number(pax),
      email,
      id,
    };
  };
  let revFormated = revToBack({ date, time, pax, email, id });

  return async function () {
    try {
      console.log("payload", revFormated);
      var newRes = await axios.post(
        `${restoModif}/${id}/reserves`,
        revFormated
      );
      return newRes;
    } catch (e) {
      alert(e.response.data.message);
    }
  };
}

export function getRestoReservations(id) {
  return async function (dispatch) {
    try {
      let json = await axios.get(`${restoModif}/${id}/reserves`);
      let data = json.data;
      return dispatch({
        type: GET_RESTO_RESERVATIONS,
        payload: data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}
export function getUserReviews(id) {
  return async function (dispatch) {
    try {
      let json = await axios.get(`${userModif}/${id}/reviews`);
      console.log(json);
      const reviews = json && json.data ? json.data : [];
      return dispatch({
        type: GET_USER_REVIEWS,
        payload: reviews,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function deleteReview(idUser, idReview) {
  return async function (dispatch) {
    try {
      let response = await axios.delete(
        `${userModif}/${idUser}/reviews/${idReview}`
      );
      return dispatch({
        type: DELETE_REVIEW,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}


export function getUserFavorites(id) {
  return async function (dispatch) {
    try {
      // let json = await axios.get(`${userModif}/${id}/favorites`);
      let json = await axios.get(`${userModif}/${id}/favorites`);
      const favorites = json && json.data ? json.data : [];
      return dispatch({
        type: GET_USER_FAVORITES,
        payload: favorites,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function getUserReservation(id) {
  return async function (dispatch) {
    try {
      let json = await axios.get(`${userModif}/${id}/reserves`);

      const reserves = json && json.data ? json.data : [];

      return dispatch({
        type: GET_USER_RESERVATION,
        payload: reserves,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function deleteFavorite(idUser, idResto) {
  return async () => {
    try {
      var deleteResto = await axios.delete(`${userModif}/${idUser}/favorites?favId=${idResto}`);
      return {
        type: DELETE_RESTAURANT,
        payload: deleteResto,
      };
    } catch (e) {
      console.log(e);
    }
  };
}

export function addFavorite(request, id) {
  return async (dispatch) => {
    try {
      var response = await axios.put(`${userModif}/${id}/favorites`, request);
      return dispatch({
        type: ADD_FAVORITE,
        payload: response.data,
      });
    } catch (e) {
      console.error(e);
    }
  };
}

export function postCheckout(id, date, pax) {
  return async function () {
    try {
      let payload = {
        date: date,
        pax: pax,
      };
      let json = await axios.post(`${restoModif}/${id}/checkout`, payload);
      window.location.assign(json.data.url);
    } catch (e) {
      console.log(e);
    }
  };
}

export function modifyUser(request, id) {
  return async (dispatch) => {
    try {
      var response = await axios.put(`${userModif}/${id}`, request);
      return dispatch({
        type: MODIF_USER,
        payload: [response.data],
      });
    } catch (e) {
      console.error(e);
    }
  };
}

export function changePassword(payload) {
  console.log("payloadd", JSON.stringify(payload))
  return async () => {
    try {
      let response = await axios.put(`${userModif}/resetPassword`, payload);
      window.location.href= '/login'
      return response;
    } catch (e) {
      Swal.fire({
        icon: 'error',
        text: e.response.data.message,
        confirmButtonColor: "#8aa899"
      });
    }
  };
}
