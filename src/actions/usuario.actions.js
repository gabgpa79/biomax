import { crudService } from '../services';
import { alertActions } from './'
import {createNotification} from 'react-redux-notify';
const model = 'user';
export const usuarioActions = {    
    getAllUsuario,    
    onChangePropsUsuario,
    getByIdUsuario,    
    updateUsuario,
    createUsuario,    
    searchUsuario,
    resetUsuario,
    searchListas,
    delete: _delete
}

function getAllUsuario(page){
    return dispatch => {        
        crudService.getAll(page,model)
        .then((response)=>{ dispatch(usuarioAll(response));})
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err)));})
    };
}

function getByIdUsuario(data){
    return dispatch =>{ dispatch(usuarioEdit(data));}
}

function resetUsuario(){
    return dispatch =>{ dispatch(usuarioReset()); }
}

function _delete(id){
    return dispatch => {        
        crudService.delete(id,model)
        .then((response)=>{ 
            dispatch(usuarioAll(response));
            dispatch(createNotification(alertActions.success("dato eliminado !!")));            
        })
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err))); })
    };
}

function onChangePropsUsuario(props, event){
    return dispatch =>{ dispatch(usuarioOnChange(props, event.target.value)); }
}

function updateUsuario(payload){
    return dispatch => {        
        crudService.actualizar(payload,model)
        .then((response)=>{ 
            dispatch(usuarioAll(response));
            dispatch(createNotification(alertActions.success("dato actualizado !!")));            
        })
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err))); })
}}

function createUsuario(payload){
    return dispatch => {        
        crudService.registrar(payload,model)
        .then((response)=>{ 
            dispatch(usuarioAll(response));
            dispatch(createNotification(alertActions.success("dato creado !!")));            
        })
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err))); })
    }
}

function searchUsuario(payload){
    return dispatch => {        
        crudService.search(payload,model)
        .then((response)=>{ dispatch(usuarioAll(response)); }) 
    }
}

function searchListas(payload){
    return dispatch => {           
        crudService.searchList(payload,model)
        .then((response)=>{  dispatch(changeList(response)); }) 
    }
}

export function usuarioAll(response){
    return{
        type: "USUARIO_LIST_ALL",
        response: response,
         usuarioItem: {
            id:'',
            name: '',
            address: '',
            phone: '',
            nit:'',
            email:''
        }      
    }
}

export function usuarioEdit(data){
   
    return{
        type: "USUARIO_EDIT_ITEM",
        usuarioItem: {
            id: data.id,
            name: data.name,
            username: data.username,
            password:'',
            password1:''                       
            
        }
    }
}

export function usuarioReset(){
    return{
        type: "USUARIO_RESET_ITEM",        
        usuarioItem: {
            id:'',
            name: '',
            username: '',
            password: '',
            password1: '',
        }
    }
}
  
export function usuarioOnChange(props, value){
    return{
        type: "USUARIO_HANDLE_ON_CHANGE",
        props: props,
        value: value
    }
}

export function changeList(response){
    return{
        type: "USUARIO_LISTA_SEARCH_NIT",
        response: response
    }
}
