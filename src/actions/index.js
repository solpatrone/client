import axios from 'axios'
import {GET_RESTOS, CREATE_CLIENT, CREATE_OWNER} from './types'

export function createClient(info) {
    return {type: CREATE_CLIENT, payload: info}
}

export function createOwner(info) {
    return {type: CREATE_OWNER, payload: info}
}

export  function getUseres(){
    return async function(dispatch){
        var json= await axios.get('http://localhost:3001/usuario',{
        });
        return dispatch({
            type: 'GET_RECIPES',
            payload: json.data
        })
    }  
}

export function getRestos(){
    return async function(dispatch){
        let json = await axios.get("http://localhost:3001/restaurant")
        let data = json.data
        return dispatch({
            type: GET_RESTOS,
            payload: data
        })
    }
}