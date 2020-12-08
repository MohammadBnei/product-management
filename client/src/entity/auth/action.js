import { routerActions } from 'connected-react-router'
import axios, { USER_URL } from '../../conf'
import { newError, sendInfoMsg, sendSuccessMsg } from '../../redux/actions/message'
import { LOGOUT, SET_USER, SUCCESS_MESSAGE, AUTHENTICATE, SET_TOKEN, REMOVE_TOKEN } from '../../redux/constants'
import store from '../../redux/store'

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
        dispatch({ type: SET_TOKEN, payload: token })


        dispatch(sendSuccessMsg('Sucessfully Connected'))
        dispatch({ type: AUTHENTICATE })
        dispatch(setUser(user))
        dispatch(routerActions.push('/'))

    } catch (error) { }
}

export const signUp = (credentials) => async (dispatch) => {
    try {
        await axios.post(USER_URL + 'signup', credentials)

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
    dispatch({ type: REMOVE_TOKEN })

    dispatch(sendInfoMsg('Disconnected'))

    dispatch({
        type: LOGOUT,
    })
}

export const storageSignIn = () => async (dispatch) => {
    const token = localStorage.getItem('jwt')
    if (!token) return

    
    try {
        const { user } = await fetchUser({
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        dispatch({ type: SET_TOKEN, payload: token })
        dispatch({ type: AUTHENTICATE })
        dispatch(setUser(user))
    } catch (error) {
        window.localStorage.removeItem('jwt')
        dispatch({ type: REMOVE_TOKEN })
    }
}

export const fetchUser = async (options = {}) => {
    try {
        const data = (await axios.get(USER_URL + 'signin', options)).data

        return data
    } catch (error) {
        console.error(error)
        store.dispatch(newError(error.message || 'Http error'))

        return null
    }
}
