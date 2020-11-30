import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import thunk from 'redux-thunk'

import reducers from './reducer'
import Login from './container/login/login'
import Register from './container/register/register'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import AuthRoute from './components/AuthRoute/AuthRoute'
import Dashboard from './components/dashboard/dashboard'
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
                <Switch>
                    <Route path='/bossinfo' exact component={BossInfo} />
                    <Route path='/geniusinfo' exact component={GeniusInfo} />
                    <Route path='/login' exact component={Login} />
                    <Route path='/register' exact component={Register} />
                    <Route component={Dashboard} />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
    ,
    document.getElementById('root')
)

