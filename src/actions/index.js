import axios from 'axios'
import {GET_RESTOS, CREATE_CLIENT, CREATE_OWNER} from './types'

export function createClient(info) {
    return {type: CREATE_CLIENT, payload: info}
}

export function createOwner(info) {
    return {type: CREATE_OWNER, payload: info}
}

