import {
    ERROR, SUCCESS_MESSAGE, INFO_MESSAGE, WARN_MESSAGE,
} from '../constants'

/**
 * Sends success message
 * @param {*} message
 */
export const sendSuccessMsg = (message) => ({
    type: SUCCESS_MESSAGE,
    payload: message,
})

export const sendWarnMsg = (message) => ({
    type: WARN_MESSAGE,
    payload: message,
})

/**
 * Sends Info message
 * @param {*} message
 */
export const sendInfoMsg = (message) => ({
    type: INFO_MESSAGE,
    payload: message,
})

/**
 * Sends error message
 * @param {*} message
 */
export const newError = (message) => ({
    type: ERROR,
    payload: message,
})