import React, { Component } from 'react'
import {Route, Switch } from 'react-router-dom'
import Login from '../../Pages/Login/LoginContainer.jsx'


export default class LoginLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
          backgroundColor: "blue"
        };
      }
   
  render() {
    return (
      <>
       <div className="wrapper">   
        <div className="main-panel" ref="mainPanel" data={this.state.backgroundColor}
          >
            <Switch>
              <Route path="/login/" component={Login} />
            </Switch>
            </div>
        }
        </div>    
            </>
        )
    }
}
