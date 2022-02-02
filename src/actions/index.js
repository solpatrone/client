import axios from 'axios'
import {GET_RESTOS, CREATE_CLIENT} from './types'

export function createClient(info) {
    return {type: CREATE_CLIENT, payload: info}
}