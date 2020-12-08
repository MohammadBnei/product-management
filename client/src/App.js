import React, { useEffect } from 'react'
import {
    Switch,
    Route
} from 'react-router-dom'

import './App.css'
import { useDispatch, useSelector } from 'react-redux'

import SignIn from './entity/auth/SignIn'
import SignUp from './entity/auth/SignUp'
import Home from './views/Home'
import Utils from './entity/Utils'
import { storageSignIn } from './entity/auth/actions'

function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(storageSignIn())
    }, [])

    return (
        <>
            <Utils />
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/signin">
                    <SignIn />
                </Route>
                <Route path="/signup">
                    <SignUp />
                </Route>
            </Switch>
        </>
    )
}

export default App
