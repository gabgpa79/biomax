import { crudService } from '../services';
import { alertActions } from './'
import {createNotification} from 'react-redux-notify';
const model = 'alumno';
export const alumnoActions = {    
    getAllAlumno,    
    changeAlumno,
    changeAlumnos,
    getByIdAlumno,    
    updateAlumno,
    createAlumno,    
    searchAlumno,
    resetAlumno,
    searchListas,
    delete: _delete
}

function getAllAlumno(page){
    return dispatch => {        
        crudService.getAll(page,model)
        .then((response)=>{ dispatch(alumnoAll(response));})
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err)));})
    };
}

function getByIdAlumno(data){
    return dispatch =>{ dispatch(alumnoEdit(data));}
}

function resetAlumno(){
    return dispatch =>{ dispatch(alumnoReset()); }
}

function _delete(id){
    return dispatch => {        
        crudService.delete(id,model)
        .then((response)=>{ 
            dispatch(alumnoAll(response));
            dispatch(createNotification(alertActions.success("dato eliminado !!")));            
        })
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err))); })
    };
}

function changeAlumno(props, event){
    return dispatch =>{ dispatch(alumnoOnChange(props, event.target.value)); }
}

function changeAlumnos(props, value){
    return dispatch =>{
        dispatch(alumnoOnChange(props, value));
    }
}

function updateAlumno(payload){
    return dispatch => {        
        crudService.actualizar(payload,model)
        .then((response)=>{ 
            dispatch(alumnoAll(response));
            dispatch(createNotification(alertActions.success("dato actualizado !!")));            
        })
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err))); })
}}

function createAlumno(payload){
    return dispatch => {        
        crudService.registrar(payload,model)
        .then((response)=>{ 
            dispatch(alumnoAll(response));
            dispatch(createNotification(alertActions.success("dato creado !!")));            
        })
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err))); })
    }
}

function searchAlumno(payload){
    return dispatch => {        
        crudService.search(payload,model)
        .then((response)=>{ dispatch(alumnoAll(response)); }) 
    }
}

function searchListas(payload){
    return dispatch => {           
        crudService.searchList(payload,model)
        .then((response)=>{  dispatch(changeList(response)); }) 
    }
}

export function alumnoAll(response){
    return{
        type: "ALUMNO_LIST_ALL",
        response: response,
        item: {            
          id:'',
          codigo: '',
          nombres: '',
          telefono: '',
          estado:true,
          carreraId:1
        },      
    }
}

export function alumnoEdit(data){
   
    return{
        type: "ALUMNO_EDIT_ITEM",
        item: data
    }
}

export function alumnoReset(){
    return{
        type: "ALUMNO_RESET_ITEM",        
        item: {            
          id:'',
          codigo: '',
          nombres: '',
          telefono: '',
          estado:true,
          carreraId:1
        },
    }
}
  
export function alumnoOnChange(props, value){
    return{
        type: "ALUMNO_HANDLE_ON_CHANGE",
        props: props,
        value: value
    }
}

export function changeList(response){
    return{
        type: "ALUMNO_LISTA_SEARCH_NIT",
        response: response
    }
}
