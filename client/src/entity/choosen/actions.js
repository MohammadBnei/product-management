import { routerActions } from 'connected-react-router'
import is from 'is_js'
import axios, { extractParamsFromUrl } from '../../conf'
import {
    ERROR,
    SET_CHOOSEN_ELEMENT,
    SET_OTHER_ELEMENT,
    REMOVE_OTHER_ELEMENT
} from '../../redux/actionTypes'

export function setElement (payload) {
    return async (dispatch) => {
        let data = payload
        if (is.url(payload)) {
            try {
                data = (await searchElement(payload)).data
            } catch (error) {
                console.log(error)
                dispatch({ type: ERROR, payload: error.response })
            }
        }

        dispatch({ type: SET_CHOOSEN_ELEMENT, payload: data })
        const [resource, id] = extractParamsFromUrl(data.url)
        dispatch(routerActions.push({
            pathname: '/',
            search: `?resource=${resource}&id=${id}`
        }))
    }
}

export function setElementFromRoute ({ resource, id }) {
    return (dispatch) => {
        axios
            .get('/element/' + id, { params: { resource } })
            .then(res => {
                dispatch({ type: SET_CHOOSEN_ELEMENT, payload: res.data })
            })
            .catch(error => {
                console.log(error)
                dispatch({ type: ERROR, payload: error.response })
            })
    }
}

export function setOtherElement (url) {
    return (dispatch) => {
        searchElement(url)
            .then(res => {
                dispatch({ type: SET_OTHER_ELEMENT, payload: res.data })
            })
            .catch(error => {
                console.log(error)
                dispatch({ type: ERROR, payload: error.response })
            })
    }
}

export function removeOtherElement (url) {
    return (dispatch) => {
        dispatch({ type: REMOVE_OTHER_ELEMENT, payload: url })
    }
}

export const searchElement = (url) => axios
    .get('/element', { params: { url } })
