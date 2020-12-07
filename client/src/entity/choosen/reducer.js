import {
    REMOVE_OTHER_ELEMENT,
    SET_CHOOSEN_ELEMENT as SET_CHOSEN_ELEMENT, SET_OTHER_ELEMENT
} from '../../redux/actionTypes'

export default function (state = {
    element: null,
    elements: []
}, { type, payload }) {
    switch (type) {
    case SET_CHOSEN_ELEMENT:
        return {
            ...state,
            element: payload
        }
    case SET_OTHER_ELEMENT:
        return {
            ...state,
            elements: [payload, ...state.elements]
        }
    case REMOVE_OTHER_ELEMENT:
        const index = state.elements.findIndex(payload)
        if (index === -1) { return state }
        return {
            ...state,
            elements: state.elements.splice(index, 1)
        }
    default:
        return state
    }
}
