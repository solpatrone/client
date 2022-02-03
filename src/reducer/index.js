import { GET_RESTOS, CREATE_CLIENT, CREATE_OWNER } from "../actions/types";

const initialState = {
    clients: [],
    owners: []
}

export default function rootReducer(state = initialState, action){
    switch(action.type){
        case GET_RESTOS:
            return{
                ...state
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
                ...state,
                clients: [...state.clients]
            }}
            case CREATE_OWNER:
                console.log(state.owners)
                return{
                    ...state,
                    owners: [...state.owners, action.payload]
                }
        default:
            return {...state}
    }
}