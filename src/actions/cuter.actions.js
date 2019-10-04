import { crudService } from '../services';
import { alertActions } from './'
import {createNotification} from 'react-redux-notify';
const model = 'cuter';
export const cuterActions = {    
    getAllCuter,    
    changeCuter,
    changeCuters,
    getByIdCuter,    
    updateCuter,
    createCuter,    
    searchCuter,
    resetCuter,
    searchListas,
    delete: _delete
}

function getAllCuter(page){
    return dispatch => {        
        crudService.getAll(page,model)
        .then((response)=>{ dispatch(cuterAll(response));})
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err)));})
    };
}

function getByIdCuter(data){
    return dispatch =>{ dispatch(cuterEdit(data));}
}

function resetCuter(){
    return dispatch =>{ dispatch(cuterReset()); }
}

function _delete(id){
    return dispatch => {        
        crudService.delete(id,model)
        .then((response)=>{ 
            dispatch(cuterAll(response));
            dispatch(createNotification(alertActions.success("dato eliminado !!")));            
        })
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err))); })
    };
}

function changeCuter(props, event){
    return dispatch =>{ dispatch(cuterOnChange(props, event.target.value)); }
}

function changeCuters(props, value){
    return dispatch =>{
        dispatch(cuterOnChange(props, value));
    }
}

function updateCuter(payload){
    return dispatch => {        
        crudService.actualizar(payload,model)
        .then((response)=>{ 
            dispatch(cuterAll(response));
            dispatch(createNotification(alertActions.success("dato actualizado !!")));            
        })
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err))); })
}}

function createCuter(payload){
    return dispatch => {        
        crudService.registrar(payload,model)
        .then((response)=>{ 
            dispatch(cuterAll(response));
            dispatch(createNotification(alertActions.success("dato creado !!")));            
        })
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err))); })
    }
}

function searchCuter(payload){
    return dispatch => {        
        crudService.search(payload,model)
        .then((response)=>{ dispatch(cuterAll(response)); }) 
    }
}

function searchListas(payload){
    return dispatch => {           
        crudService.searchItems(payload,model)
        .then((response)=>{  dispatch(changeList(response)); }) 
    }
}

export function cuterAll(response){
    return{
        type: "CUTER_LIST_ALL",
        response: response,
         item: {
          id:'',
          codigo: '',
          label: '',
        }      
    }
}

export function cuterEdit(data){
   
    return{
        type: "CUTER_EDIT_ITEM",
        item: {
          id:data.id,
          codigo: data.codigo,
          label: data.label
        }
    }
}

export function cuterReset(){
    return{
        type: "CUTER_RESET_ITEM",        
        item: {
          id:'',
          codigo: '',
          label: ''
          
        }
    }
}
  
export function cuterOnChange(props, value){
    return{
        type: "CUTER_HANDLE_ON_CHANGE",
        props: props,
        value: value
    }
}

export function changeList(response){
    return{
        type: "CUTER_LISTA_SEARCH_NIT",
        response: response
    }
}
