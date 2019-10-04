import React from 'react'
import { BrowseRouter, Router, Route, Switch, Redirect } from 'react-router-dom'
import { history } from '../helpers'
import { PrivateRoute } from './PrivateRoute'
//Layouts
import AdminLayout from '../layouts/Admin/Admin.jsx'
import LoginLayout from '../layouts/Login/LoginLayout.jsx'
import BusquedaLayout from '../layouts/Busqueda/BusquedaLayout.jsx'
import Error from './Error.jsx'

const App = () => (
  <Router history={ history }>
    <Switch>      
      <Route exact path="/login" render={props => <LoginLayout {...props} />}/>      
      <Route exact path="/" render={() => <Redirect to="/app/documentos" />} />
      <Route exact path="/app" render={() => <Redirect to="/app/documentos" />} />      
      <PrivateRoute path="/app" component={AdminLayout} />
      <Route exact path="/busqueda" render={() => <Redirect to="/busqueda/inicio" />} />      
      <Route path="/busqueda" component={BusquedaLayout} />
      <Route component={Error} />
    </Switch>
  </Router>
);
export default App
