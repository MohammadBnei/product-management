import { SET_PRODUCT, SET_PRODUCTS } from "../../redux/constants"

export default function (state = {
    product: null,
    products: []
}, { type, payload }) {
    switch (type) {
    case SET_PRODUCT:
        return {
            ...state,
            product: payload
        }
    case SET_PRODUCTS:
        return {
            ...state,
            products: payload
        }
    // case REMOVE_OTHER_ELEMENT:
    //     const index = state.elements.findIndex(payload)
    //     if (index === -1) { return state }
    //     return {
    //         ...state,
    //         elements: state.elements.splice(index, 1)
    //     }
    default:
        return state
    }
}
