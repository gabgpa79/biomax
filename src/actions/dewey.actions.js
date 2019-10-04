import { crudService } from '../services';
import { alertActions } from './'
import {createNotification} from 'react-redux-notify';
const model = 'dewey';
export const deweyActions = {    
    getAllDewey,    
    changeDewey,
    changeDeweys,
    getByIdDewey,    
    updateDewey,
    createDewey,    
    searchDewey,
    resetDewey,
    searchListas,
    delete: _delete
}

function getAllDewey(page){
    return dispatch => {        
        crudService.getAll(page,model)
        .then((response)=>{ dispatch(deweyAll(response));})
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err)));})
    };
}

function getByIdDewey(data){
    return dispatch =>{ dispatch(deweyEdit(data));}
}



function resetDewey(){
    return dispatch =>{ dispatch(deweyReset()); }
}

function _delete(id){
    return dispatch => {        
        crudService.delete(id,model)
        .then((response)=>{ 
            dispatch(deweyAll(response));
            dispatch(createNotification(alertActions.success("dato eliminado !!")));            
        })
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err))); })
    };
}

function changeDewey(props, event){
    return dispatch =>{ dispatch(deweyOnChange(props, event.target.value)); }
}

function changeDeweys(props, value){
    return dispatch =>{
        dispatch(deweyOnChange(props, value));
    }
}

function updateDewey(payload){
    return dispatch => {        
        crudService.actualizar(payload,model)
        .then((response)=>{ 
            dispatch(deweyAll(response));
            dispatch(createNotification(alertActions.success("dato actualizado !!")));            
        })
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err))); })
}}

function createDewey(payload){
    return dispatch => {        
        crudService.registrar(payload,model)
        .then((response)=>{ 
            dispatch(deweyAll(response));
            dispatch(createNotification(alertActions.success("dato creado !!")));            
        })
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err))); })
    }
}

function searchDewey(payload){
    return dispatch => {        
        crudService.search(payload,model)
        .then((response)=>{ dispatch(deweyAll(response)); }) 
    }
}

function searchListas(payload){
    return dispatch => {           
        crudService.searchItems(payload,model)
        .then((response)=>{  dispatch(changeList(response)); }) 
    }
}

export function deweyAll(response){
    return{
        type: "DEWEY_LIST_ALL",
        response: response,
         item: {
          id:'',
          codigo: '',
          label: '',
          grupo:''
        }      
    }
}

export function deweyEdit(data){
   
    return{
        type: "DEWEY_EDIT_ITEM",
        item: {
          id:data.id,
          codigo: data.codigo,
          label: data.label,
          grupo:data.grupo
        }
    }
}

export function deweyReset(){
    return{
        type: "DEWEY_RESET_ITEM",        
        item: {
          id:'',
          codigo: '',
          label: '',
          grupo:''
          
        }
    }
}
  
export function deweyOnChange(props, value){
    return{
        type: "DEWEY_HANDLE_ON_CHANGE",
        props: props,
        value: value
    }
}

export function changeList(response){
    return{
        type: "DEWEY_LISTA_SEARCH_NIT",
        response: response
    }
}
