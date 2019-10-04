import React, { Component } from 'react'
import { connect } from 'react-redux'
import LoginFrm from './LoginView'
import { authActions } from '../../actions'
import { Notify } from 'react-redux-notify';
class LoginContainer extends Component {
  constructor(props){
    super(props);
    this.state = {        
        username: '',
        password: '',        
        submitted: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = async (event) => {
    const { name, value } = event.target;    
    
    await this.setState({      
        [name]: value      
    });
  }
  
  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true });
    const { username, password } = this.state;
    const { dispatch } = this.props;
    if (username && password) {
        dispatch(authActions.login(username,password));       
    }
  }  

  render() {
    const { username, password, submitted } = this.state;    
    return (      
      <div className="content">    
        <Notify />  
        <LoginFrm 
          password={password}  
          username={username}        
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange} 
          submitted={submitted}       
          />            
      </div>
    )
  }
};

const mapStateToProps = state => ({
  loggingIn: state.auth
});

export default connect(mapStateToProps)(LoginContainer);