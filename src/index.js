'use strict'

import debug from 'debug'
import React from 'react'
import { render } from 'react-dom'
import { Router, useRouterHistory } from 'react-router'
import { createHashHistory } from 'history'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import multi from 'redux-multi'
import thunk from 'redux-thunk'
import ReduxPromise from 'redux-promise'

import routes from './routes'
import reducers from './reducers'

const log = debug('application:bootstrap')

const browserHistory = useRouterHistory(createHashHistory)({ queryKey: false })

log('creating state container')
const middleware = [thunk, multi, ReduxPromise]
const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore)
const store = createStoreWithMiddleware(reducers)
const history = syncHistoryWithStore(browserHistory, store)

log('creating application node')
const applicationNode = (
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>
)

log('creating dom node')
const domNode = document.createElement('div')
domNode.id = 'application'
document.body.appendChild(domNode)

log('rendering application to DOM')
render(applicationNode, domNode, () => {
  log('finished mounting application')
})
