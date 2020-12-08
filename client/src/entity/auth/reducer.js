import {
    AUTHENTICATE,
    LOGOUT
} from '../../redux/constants'

export default function (state = false, action) {
    switch (action.type) {
    case AUTHENTICATE:
        return true
    case LOGOUT:
        return false
    default:
        return state
    }
}
