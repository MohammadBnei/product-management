import axios from '../../conf'
import { ERROR, SET_RESOURCE, SET_RESOURCE_LIST, SET_SEARCH_RESULT, SET_SELECTION, SET_TERM } from '../../redux/actionTypes'

export function fetchOptions () {
    return (dispatch) => {
        axios
            .get('/resource')
            .then(res => {
                dispatch({ type: SET_RESOURCE_LIST, payload: res.data.resourceList })
            })
            .catch(error => {
                console.log(error)
                dispatch({ type: ERROR, payload: error.response })
            })
    }
}

export function doTheSearch ({ term, resource }) {
    return dispatch => {
        axios
            .get('/search', { params: { term, resource } })
            .then(res => {
                dispatch({ type: SET_SEARCH_RESULT, payload: res.data.results })
            })
            .catch(error => {
                console.log(error)
                dispatch({ type: ERROR, payload: error.response })
            })
    }
}

export function setResource (resource) {
    return dispatch => {
        dispatch({ type: SET_RESOURCE, payload: resource })
    }
}

export function setTerm (term) {
    return (dispatch) => {
        dispatch({ type: SET_TERM, payload: term })
    }
}

export function setSelection (selection) {
    return dispatch => {
        dispatch({ type: SET_SELECTION, payload: selection })
    }
}
