import {
    AUTH_USER,
    LOGOUT
} from '../../redux/constants'

export default function (state = {
    authenticated: !!localStorage.getItem('jwt')
}, action) {
    switch (action.type) {
    case AUTH_USER:
        return { ...state, authenticated: true }
    case LOGOUT:
        return { ...state, authenticated: false }
    default:
        return state
    }
}
