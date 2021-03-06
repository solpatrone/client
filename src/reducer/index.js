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
  GET_CUISINES,
  LOADING,
  ADD_IMAGES,
  GET_RESTO_REVIEWS,
  POST_RESERVATION,
  GET_MY_RESTOS,
  GET_RESTO_RESERVATIONS,
  PUT_RATING,
  GET_USER_REVIEWS,
  GET_USER_RESERVATION,
  GET_USER_FAVORITES,
  DELETE_RESTAURANT,
  DELETE_REVIEW,
  ADD_FAVORITE,
} from "../actions/types";

const initialState = {
  clients: [],
  owners: [],
  user: {},
  restaurants: [],
  myRestaurants: [],
  allRestaurants: [],
  enabledAndDisabled: [],
  neighborhoods: [],
  details: {},
  reviews: [],
  cuisines: [],
  loading: false,
  userReviews: [],
  userFavorites: [],
  restoReservations: [],
  userReservation:[],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RESTOS:
      return {
        ...state,
        restaurants: action.payload.filter(resto => resto.status === 'ENABLED'),
        allRestaurants: action.payload.filter(resto => resto.status === 'ENABLED'),
        enabledAndDisabled : action.payload,
        loading: false,
      };
    case GET_RESTO_NAME:
      return {
        ...state,
        restaurants: action.payload,
        loading: false,
      };
    case CREATE_CLIENT:
      let exists = state.clients.find((u) => u.email === action.payload.email);
      
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
    case ADD_IMAGES:
      return { ...state };

    case ADD_FAVORITE:
        return { ...state };

    case CREATE_OWNER:
      return { ...state };

  
    case GET_USERS:
      return {
        ...state,
        user: [...state, action.payload],
        loading: false,
      };
    case GET_MY_RESTOS:
      return {
        ...state,
        myRestaurants: action.payload,
      };
    case GET_NEIGHBORHOODS:
      return {
        ...state,
        neighborhoods: action.payload,
      };
    case GET_CUISINES:
      return {
        ...state,
        cuisines: action.payload,
      };

    case GET_RESTO_DETAILS:
      return {
        ...state,
        details: action.payload,
        loading: false,
      };
    case CLEAR_DETAILS_STATE:
      return {
        ...state,
        details: {},
      };
    case POST_REVIEW:
      return {
        ...state,
      };
    case GET_RESTO_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
      };
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case POST_RESERVATION:
      return {
        ...state,
      };

    case GET_RESTO_RESERVATIONS: {
      return {
        ...state,
        restoReservations: action.payload,
      };
    }
    case GET_USER_REVIEWS:
      return { ...state, 
        userReviews: action.payload };

    case GET_USER_RESERVATION:
      return { ...state, 
        userReservation: action.payload };

    case GET_USER_FAVORITES:
      return { ...state, 
        userFavorites:  action.payload };

    case PUT_RATING:
      return {
        ...state,
      };
    case DELETE_RESTAURANT:
      return {
        ...state,
      }
    case DELETE_REVIEW:
      return {
        ...state
      }
     
    default:
      return { ...state };
  }
}
