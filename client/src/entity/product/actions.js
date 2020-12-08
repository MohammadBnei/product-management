import axios, { PRODUCT_API_URI } from '../../conf'
import {
    sendSuccessMsg
} from '../../redux/actions/message'
import { SET_PRODUCT, SET_PRODUCTS } from '../../redux/constants'

export function createProduct(payload) {
    return async (dispatch) => {
        try {
            const data = (await axios.post(PRODUCT_API_URI, payload)).data
            dispatch(sendSuccessMsg(`Product ${data.name} created !`))
        } catch (error) {}

    }
}

export function modifyProduct(payload) {
    return async (dispatch) => {
        try {
            const data = (await axios.post(PRODUCT_API_URI + payload._id, payload)).data
            dispatch(sendSuccessMsg(`Product ${data.name} updated !`))
            console.log({data});
        } catch (error) {}

    }
}

export function deleteProduct(payload) {
    return async (dispatch) => {
        try {
            await axios.delete(PRODUCT_API_URI + payload)
            dispatch(sendSuccessMsg(`Product removed !`))
        } catch (error) {}

    }
}