import { GET_RESTOS, CREATE_CLIENT, CREATE_OWNER, GET_USERS, GET_RESTO_NAME, GET_NEIGHBORHOODS } from "../actions/types";

const initialState = {
    clients: [],
    owners: [],
    user: {},
    restaurants: [],
    allRestaurants: [],
    neighborhoods: []
    
}

export default function rootReducer(state = initialState, action){
    switch(action.type){
        case GET_RESTOS:
            return{
                ...state,
                restaurants: action.payload,
                allRestaurants: action.payload
            }
        case GET_RESTO_NAME:
            return{
                ...state,
                restaurants: action.payload
            }
        case CREATE_CLIENT:
            let exists = state.clients.find(u => u.email === action.payload.email)
            console.log(state.clients)
            if(!exists){
                return{
                    ...state,
                    clients: [...state.clients, action.payload]
                }
            }  else {return{
                ...state
            }}
            case CREATE_OWNER:
                let existsOwn = state.owners.find(u => u.email === action.payload.email)
            console.log(state.owners)
            if(!existsOwn){
                return{
                    ...state,
                    owners: [...state.owners, action.payload]
                }
            }  else {return{
                ...state
                
            }}
            case GET_USERS:
                return{
                    ...state,
                    user: [...state, action.payload]
                }
            case GET_NEIGHBORHOODS:
                return{
                    ...state,
                    neighborhoods: action.payload
                }
           
        default:
            return {...state}
    }
}
