import { crudService } from '../services';
import { alertActions } from './'
import {createNotification} from 'react-redux-notify';
const model = 'editorial';
export const editorialActions = {    
    getAllEditorial,    
    changeEditorial,
    getByIdEditorial,    
    updateEditorial,
    createEditorial,    
    searchEditorial,
    resetEditorial,
    searchListas,
    delete: _delete
}

function getAllEditorial(page){
    return dispatch => {        
        crudService.getAll(page,model)
        .then((response)=>{ dispatch(editorialAll(response));})
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err)));})
    };
}

function getByIdEditorial(data){
    return dispatch =>{ dispatch(editorialEdit(data));}
}

function resetEditorial(){
    return dispatch =>{ dispatch(editorialReset()); }
}

function _delete(id){
    return dispatch => {        
        crudService.delete(id,model)
        .then((response)=>{ 
            dispatch(editorialAll(response));
            dispatch(createNotification(alertActions.success("dato eliminado !!")));            
        })
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err))); })
    };
}

function changeEditorial(props, event){
    return dispatch =>{ dispatch(editorialOnChange(props, event.target.value)); }
}

function updateEditorial(payload){
    return dispatch => {        
        crudService.actualizar(payload,model)
        .then((response)=>{ 
            dispatch(editorialAll(response));
            dispatch(createNotification(alertActions.success("dato actualizado !!")));            
        })
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err))); })
}}

function createEditorial(payload){
    return dispatch => {        
        crudService.registrar(payload,model)
        .then((response)=>{ 
            dispatch(editorialAll(response));
            dispatch(createNotification(alertActions.success("dato creado !!")));            
        })
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err))); })
    }
}

function searchEditorial(payload){
    return dispatch => {        
        crudService.search(payload,model)
        .then((response)=>{ dispatch(editorialAll(response)); }) 
    }
}

function searchListas(payload){
    return dispatch => {           
        crudService.searchList(payload,model)
        .then((response)=>{  dispatch(changeList(response)); }) 
    }
}

export function editorialAll(response){
    return{
        type: "EDITORIAL_LIST_ALL",
        response: response,
         item: {
             id:'',
          codigo: '0',
          nombre: '0',
          pais: '0',
          direccion:'0'
        }      
    }
}

export function editorialEdit(data){
   
    return{
        type: "EDITORIAL_EDIT_ITEM",
        item: {
            id:data.id,
          codigo: data.codigo,
          nombre: data.nombre,
          pais: data.pais,
          direccion: data.direccion
        }
    }
}

export function editorialReset(){
    return{
        type: "EDITORIAL_RESET_ITEM",        
        item: {
          id:'',
          codigo: '0',
          nombre: '0',
          pais: '0',
          direccion:'0'
        }
    }
}
  
export function editorialOnChange(props, value){
    return{
        type: "EDITORIAL_HANDLE_ON_CHANGE",
        props: props,
        value: value
    }
}

export function changeList(response){
    return{
        type: "EDITORIAL_LISTA_SEARCH_NIT",
        response: response
    }
}
