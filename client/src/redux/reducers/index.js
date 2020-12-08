import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import authenticated from '../../entity/auth/reducer'
import product from '../../entity/product/reducer'

import * as constants from '../constants'

const messageReducer = (state = [], { type, payload }) => {
    let messages
    const now = Date.now()
    switch (type) {
        case constants.SUCCESS_MESSAGE:
            messages = Array.from(state)
            messages.push({
                id: now,
                message: payload,
                type: 'success',
            })
            return messages
        case constants.ERROR:
            messages = Array.from(state)
            messages.push({
                id: now,
                message: payload,
                type: 'error',
            })
            return messages
        case constants.WARN_MESSAGE:
            messages = Array.from(state)
            messages.push({
                id: now,
                message: payload,
                type: 'warning',
            })
            return messages
        case constants.INFO_MESSAGE:
            messages = Array.from(state)
            messages.push({
                id: now,
                message: payload,
                type: 'info',
            })
            return messages

        default:
            return state
    }
}

const userReducer = (state = {
    user: null,
    token: localStorage.getItem('jwt')
}, { type, payload }) => {
    switch (type) {
        case constants.SET_USER:
            return { ...state, user: payload }
        case constants.USER_LOGOUT:
            return { ...state, user: null }
        case constants.SET_TOKEN:
            return { ...state, token: payload }
        case constants.REMOVE_TOKEN:
            return { ...state, token: null }
        default:
            return state
    }
}

const loadingReducer = (state = false, { type }) => {
    switch (type) {
        case constants.LOADING:
            return true
        case constants.DONE_LOADING:
            return false
        default:
            return state
    }
}

const createRootReducer = history => combineReducers({
    router: connectRouter(history),
    messages: messageReducer,
    user: userReducer,
    loading: loadingReducer,
    authenticated,
    product,
})

export default createRootReducer
