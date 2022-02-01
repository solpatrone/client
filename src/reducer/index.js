import { GET_RESTOS } from "../actions/types";

const initialState = {

}

export default function rootReducer(state = initialState, action){
    switch(action.type){
        case GET_RESTOS:
            return{
                ...state
            }
        default:
            return {...state}
    }
}