import { ERROR } from '../actionTypes'

export function newError (message) {
    return dispatch => {
        dispatch({ type: ERROR, payload: message })
    }
}
