import { routerActions } from 'connected-react-router'
import axios, { USER_URL } from '../../conf'
import { newError, sendInfoMsg, sendSuccessMsg } from '../../redux/actions/error'
import { LOGOUT, SET_USER, SUCCESS_MESSAGE } from '../../redux/constants'
import store from '../../redux/store'

if (localStorage.getItem('jwt')) {
    axios.defaults.headers.common.Authorization = localStorage.getItem('jwt')
}

/**
 * Sets user
 * @param {*} payload
 */
export const setUser = (payload) => ({
    type: SET_USER,
    payload,
})

export const signIn = (credentials) => async (dispatch) => {
    try {
        const { user, token } = (await axios.post(USER_URL + 'signin', credentials)).data
        
        window.localStorage.setItem('jwt', token)
        
        dispatch(sendSuccessMsg('Sucessfully Connected'))
        dispatch(setUser(user))
    } catch (error) {}
}

export const signUp = (credentials) => async (dispatch) => {
    try {
        const user = (await axios.post(USER_URL + 'signup', credentials)).data

        dispatch({
            type: SUCCESS_MESSAGE,
            payload: `Successfully created ${credentials.username} account`,
        })

        dispatch(routerActions.push('/signin'))
    } catch (error) {
        console.log(error);
    }
}

export const signOut = () => (dispatch) => {
    window.localStorage.removeItem('jwt')

    dispatch(sendInfoMsg('Disconnected'))

    dispatch({
        type: LOGOUT,
    })
}

export const storageSignIn = () => async (dispatch) => {
    if (!localStorage.getItem('jwt')) return

    try {
        const { user } = await fetchUser()
        dispatch(setUser(user))
    } catch (error) {
        window.localStorage.removeItem('jwt')
    }
}

export const fetchUser = async (options = {}) => {
    const token = localStorage.getItem('jwt')

    if (token) {
        options.headers = {
            ...options.headers,
            Authorization: `Bearer ${token}`,
        }
    }

    try {
        const data = (await axios.get(USER_URL + 'signin', options)).data

        return data
    } catch (error) {
        console.error(error)
        store.dispatch(newError(error.message || 'Http error'))

        return null
    }
}
