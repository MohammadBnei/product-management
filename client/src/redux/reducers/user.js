import {
    GET_USER_PROFILE,
    USER_LOGOUT
} from '../actionTypes'

const INITIAL_STATE = {
    name: {},
    capacities: [],
    email: '',
    id: '',
    status: {}
}

export default function (state = INITIAL_STATE, { type, payload }) {
    switch (type) {
    case GET_USER_PROFILE:
        return { ...state, ...payload }
    case USER_LOGOUT:
        return { ...state, user: null }
    default:
        return state
    }
}
