import { crudService } from '../services';
import { alertActions } from './'
import {createNotification} from 'react-redux-notify';
const model = 'carrera';
export const carreraActions = {    
    getAllCarrera,    
    changeCarrera,
    getByIdCarrera,    
    updateCarrera,
    createCarrera,    
    searchCarrera,
    resetCarrera,
    searchListas,
    getListaCarrera,
    delete: _delete
}

function getAllCarrera(page){
    return dispatch => {        
        crudService.getAll(page,model)
        .then((response)=>{ dispatch(carreraAll(response));})
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err)));})
    };
}

function getByIdCarrera(data){
    return dispatch =>{ dispatch(carreraEdit(data));}
}

function resetCarrera(){
    return dispatch =>{ dispatch(carreraReset()); }
}

function _delete(id){
    return dispatch => {        
        crudService.delete(id,model)
        .then((response)=>{ 
            dispatch(carreraAll(response));
            dispatch(createNotification(alertActions.success("dato eliminado !!")));            
        })
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err))); })
    };
}

function changeCarrera(props, event){
    return dispatch =>{ dispatch(carreraOnChange(props, event.target.value)); }
}

function updateCarrera(payload){
    return dispatch => {        
        crudService.actualizar(payload,model)
        .then((response)=>{ 
            dispatch(carreraAll(response));
            dispatch(createNotification(alertActions.success("dato actualizado !!")));            
        })
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err))); })
}}

function createCarrera(payload){
    return dispatch => {        
        crudService.registrar(payload,model)
        .then((response)=>{ 
            dispatch(carreraAll(response));
            dispatch(createNotification(alertActions.success("dato creado !!")));            
        })
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err))); })
    }
}

function searchCarrera(payload){
    return dispatch => {        
        crudService.search(payload,model)
        .then((response)=>{ dispatch(carreraAll(response)); }) 
    }
}

function searchListas(payload){
    return dispatch => {           
        crudService.searchList(payload,model)
        .then((response)=>{  dispatch(changeList(response)); }) 
    }
}

function getListaCarrera(){
    return dispatch => {           
        crudService.getListas(model)
        .then((response)=>{  dispatch(changeLista(response)); }) 
    }
}

export function carreraAll(response){
    return{
        type: "CARRERA_LIST_ALL",
        response: response,
         item: {
             id:'',          
          name: '',
          abreviacion: ''
        }      
    }
}

export function carreraEdit(data){
   
    return{
        type: "CARRERA_EDIT_ITEM",
        item: {
            id:data.id,
          name: data.name,
          abreviacion: data.abreviacion
        }
    }
}

export function carreraReset(){
    return{
        type: "CARRERA_RESET_ITEM",        
        item: {
          id:'',
          name: '',
          abreviacion: ''
        }
    }
}
  
export function carreraOnChange(props, value){
    return{
        type: "CARRERA_HANDLE_ON_CHANGE",
        props: props,
        value: value
    }
}

export function changeList(response){
    return{
        type: "CARRERA_LISTA_SEARCH_NIT",
        response: response
    }
}


export function changeLista(response){
    return{
        type: "CARRERA_LISTAS",
        response: response.carreras
    }
}
