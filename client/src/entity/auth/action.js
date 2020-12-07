import { routerActions } from 'connected-react-router'
import axios, { USER_URL } from '../../conf'
import { newError, sendInfoMsg, sendSuccessMsg } from '../../redux/actions/error'
import { LOGOUT, SET_USER, SUCCESS_MESSAGE } from '../../redux/constants'
import store from '../../redux/store'

if (localStorage.getItem('auth_jwt_token')) {
    axios.defaults.headers.common.Authorization = localStorage.getItem('auth_jwt_token')
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
    const data = await fetchUser({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    })

    if (!data) return

    const {
        user, token,
    } = data

    window.localStorage.setItem('jwt', token)

    dispatch(sendSuccessMsg('Sucessfully Connected'))
    dispatch(setUser(user))
}

export const signUp = (credentials) => async (dispatch) => {
    try {
        await axios.post(USER_URL + 'signup', {
            body: JSON.stringify(credentials),
        })

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
        const { user, token } = await fetchUser()
        dispatch(setUser(user))
        window.localStorage.setItem('jwt', token)
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
