import React from 'react'
import {
    Switch,
    Route
} from 'react-router-dom'

import './App.css'

import SignIn from './entity/auth/SignIn'
import SignUp from './entity/auth/SignUp'
import Home from './views/Home'
import Utils from './entity/Utils'

function App() {
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
