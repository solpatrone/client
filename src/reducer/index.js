import { GET_RESTOS, CREATE_CLIENT } from "../actions/types";

const initialState = {
    clients: []
}

export default function rootReducer(state = initialState, action){
    switch(action.type){
        case GET_RESTOS:
            return{
                ...state
            }
        case CREATE_CLIENT:
            return{
                ...state,
                clients: [...state.clients, action.payload]
            }
        default:
            return {...state}
    }
}