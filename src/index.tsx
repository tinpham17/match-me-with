import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { AuthProvider } from 'context/auth'
import PrivateRoute from 'components/PrivateRoute/PrivateRoute'
import Explore from 'pages/Explore/Explore'
import Login from 'pages/Login/Login'
import Liked from 'pages/Liked/Liked'
import Register from 'pages/Register/Register'
import reportWebVitals from './reportWebVitals'
import './config/styles/index.scss'
import { config } from 'config'

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Route path={config.routes.login} exact component={Login} />
          <Route path={config.routes.register} exact component={Register} />
          <PrivateRoute path={config.routes.explore} exact component={Explore} redirectUrl={config.routes.login} />
          <PrivateRoute path={config.routes.liked} exact component={Liked} redirectUrl={config.routes.login} />
          <Route path="*">
            <Redirect to={config.routes.explore} />
          </Route>
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
