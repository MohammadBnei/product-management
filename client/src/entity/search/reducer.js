import {
    SET_TERM,
    SET_RESOURCE,
    SET_RESOURCE_LIST,
    SET_SELECTION,
    SET_SEARCH_RESULT
} from '../../redux/actionTypes'

export default function (state = {
    term: '',
    resource: null,
    resourceList: [],
    selection: null,
    results: []
}, { type, payload }) {
    switch (type) {
    case SET_TERM:
        return {
            ...state,
            term: payload
        }
    case SET_RESOURCE:
        return {
            ...state,
            resource: payload
        }
    case SET_RESOURCE_LIST:
        const resource = payload.length ? payload[0] : null
        return {
            ...state,
            resourceList: payload,
            resource
        }
    case SET_SELECTION:
        return {
            ...state,
            selection: payload
        }
    case SET_SEARCH_RESULT:
        return {
            ...state,
            results: payload
        }
    default:
        return state
    }
}
