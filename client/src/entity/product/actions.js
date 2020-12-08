import axios, { PRODUCT_API_URI } from '../../conf'
import {
    sendSuccessMsg
} from '../../redux/actions/message'
import { SET_PRODUCT, SET_PRODUCTS } from '../../redux/constants'
import store from '../../redux/store'

export function createProduct(payload) {
    return async (dispatch) => {
        try {
            const data = (await axios.post(PRODUCT_API_URI, payload)).data
            dispatch(setProducts(data))
            dispatch(sendSuccessMsg(`Product ${data.name} created !`))
        } catch (error) { }

    }
}

export function getProducts() {
    return async (dispatch) => {
        try {
            const data = (await axios.get(PRODUCT_API_URI)).data

            dispatch({ type: SET_PRODUCTS, payload: data })
        } catch (error) { }

    }
}

export function setProducts(payload) {
    return async (dispatch) => {
        try {
            let products = [...store.getState().product.products]
            let index = products.findIndex(p => p._id === payload._id)

            if (index === -1)
                products = [...products, payload]


            if (payload.removed) {
                products.splice(index, 1)
            } else {
                products[index] = payload
            }

            dispatch({ type: SET_PRODUCTS, payload: products })
        } catch (error) { }

    }
}

export function modifyProduct(payload) {
    return async (dispatch) => {
        try {
            const data = (await axios.post(PRODUCT_API_URI + payload._id, payload)).data
            dispatch(setProducts(data))
            dispatch(sendSuccessMsg(`Product ${data.name} updated !`))
            console.log({ data });
        } catch (error) { }

    }
}

export function deleteProduct(payload) {
    return async (dispatch) => {
        try {
            await axios.delete(PRODUCT_API_URI + payload)
            dispatch(setProducts({ removed: true, _id: payload }))
            dispatch(sendSuccessMsg(`Product removed !`))
        } catch (error) { }

    }
}