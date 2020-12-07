import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import auth from '../../entity/auth/reducer'
// import user from '../../entity/user/reducer'
import search from '../../entity/search/reducer'
import choosen from '../../entity/choosen/reducer'

import {
    ERROR, LOADING,
    END_LOADING
} from '../actionTypes'

const meta = (state = { errors: [], loading: 0 }, { type, payload }) => {
    switch (type) {
    case ERROR:
        return {
            ...state,
            errors: [...state.errors, payload]
        }
    case LOADING:
        return {
            ...state,
            loading: ++state.loading
        }
    case END_LOADING:
        return {
            ...state,
            loading: --state.loading
        }
    default:
        return state
    }
}

const createRootReducer = history => combineReducers({
    router: connectRouter(history),
    auth,
    // user,
    search,
    choosen,
    meta
})

export default createRootReducer
