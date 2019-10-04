import { usuarioService } from '../services';
import { alertActions } from './'
import { history } from '../helpers';
import {createNotification} from 'react-redux-notify';

export const authActions = {
    login,
    logout,
    session   
};

function login(username,password){
    return dispatch => {        
        usuarioService.login(username,password)
        .then((user)=>{             
            dispatch(loginIntro(user)); history.push('/app');             
        }).catch((err)=>{
            dispatch(createNotification(alertActions.error(err)));
        })
    };
}


function logout(){
    return dispatch =>{
      usuarioService.logout();
      dispatch(loginOut());
      history.push('/app');      
    }
}

function session(){
    return dispatch =>{
        dispatch(loginUser());
    }
}

export function loginIntro(user){
    return{
        type: "LOGIN_SUCCESS",        
        user: user
    }
}

export function loginOut(){
    return{
        type: "LOGIN_LOGOUT"
    }
}

export function loginUser(){
    return{
        type: "LOGIN_USER"
    }
}