import React, { Component } from 'react'
import {Route, Switch } from 'react-router-dom'
import Busqueda from '../../Pages/Busqueda/BusquedaContainer.jsx'


export default class BusquedaLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
          backgroundColor: "blue"
        };
      }
   
  render() {
    return (      
       <div className="content-search">                     
            <Switch>
              <Route path="/busqueda/inicio" component={Busqueda} />
            </Switch>            
        </div>    
       
        )
    }
}
