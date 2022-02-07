import {
  GET_RESTOS,
  CREATE_CLIENT,
  CREATE_OWNER,
  GET_USERS,
  GET_RESTO_NAME,
  GET_NEIGHBORHOODS,
  GET_RESTO_DETAILS,
  CLEAR_DETAILS_STATE,
  POST_REVIEW,
  LOADING,
} from "../actions/types";

const initialState = {
  clients: [],
  owners: [],
  user: {},
  restaurants: [],
  allRestaurants: [],
  neighborhoods: [],
  details: [],
  reviews: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RESTOS:
      return {
        ...state,
        restaurants: action.payload,
        allRestaurants: action.payload,
        loading: false,
      };
    case GET_RESTO_NAME:
      return {
        ...state,
        restaurants: action.payload,
      };
    case CREATE_CLIENT:
      let exists = state.clients.find((u) => u.email === action.payload.email);
      console.log(state.clients);
      if (!exists) {
        return {
          ...state,
          clients: [...state.clients, action.payload],
        };
      } else {
        return {
          ...state,
        };
      }
    case CREATE_OWNER:
      let existsOwn = state.owners.find(
        (u) => u.email === action.payload.email
      );
      console.log(state.owners);
      if (!existsOwn) {
        return {
          ...state,
          owners: [...state.owners, action.payload],
        };
      } else {
        return {
          ...state,
        };
      }
    case GET_USERS:
      return {
        ...state,
        user: [...state, action.payload],
      };
    case GET_NEIGHBORHOODS:
      return {
        ...state,
        neighborhoods: action.payload,
      };

    case GET_RESTO_DETAILS:
      return {
        ...state,
        details: action.payload,
      };
    case CLEAR_DETAILS_STATE:
      return {
        ...state,
        details: [],
      };
    case POST_REVIEW:
      return {
        ...state,
        reviews: [...state.reviews, action.payload],
      };
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return { ...state };
  }
}
