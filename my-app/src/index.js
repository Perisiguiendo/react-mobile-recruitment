import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom'
import thunk from 'redux-thunk'

import reducers from './reducer'
import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './components/AuthRoute/AuthRoute'
import './config'
import { applyMiddleware, compose, createStore } from 'redux'

const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
))

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute></AuthRoute>
                <Route path='/login' exact component={Login} />
                <Route path='/register' exact component={Register} />
                <Redirect path='' to='/login' />
            </div>
        </BrowserRouter>
    </Provider>
    ,
    document.getElementById('root')
)

