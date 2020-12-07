import {
    AUTH_USER,
    LOGOUT
} from '../../redux/actionTypes'

export default function (state = {
    authenticated: !!localStorage.getItem('auth_jwt_token')
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
