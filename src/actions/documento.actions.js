import { crudService } from '../services';
import { alertActions } from './'
import {createNotification} from 'react-redux-notify';
const model = 'documento';
export const documentoActions = {    
    getAllDocumento,    
    changeDocumento,
    changeDocumentos,
    getByIdDocumento,    
    updateDocumento,
    createDocumento,    
    searchDocumento, 
    searchItems,
    searchAll,
    uploadDocumento,
    resetDocumento,
    getExcel,
    delete: _delete
}

function getExcel(payload){
    return dispatch => {        
        crudService.getExcel(payload,model)
        .then((response)=>{ dispatch(documentoExcel(response));})
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err)));})
    };
}

function getAllDocumento(page){
    return dispatch => {        
        crudService.getAll(page,model)
        .then((response)=>{ dispatch(documentoAll(response));})
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err)));})
    };
}

function searchAll(tag,pagina){
    return dispatch => {        
        crudService.searchAll(tag,pagina,model)
        .then((response)=>{ dispatch(serAll(response));})
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err)));})
    };
}

function getByIdDocumento(data){        
    return dispatch =>{ dispatch(documentoEdit(data));}
}


function _delete(id){
    return dispatch => {        
        crudService.delete(id,model)
        .then((response)=>{ 
            dispatch(documentoAll(response));
            dispatch(createNotification(alertActions.success("dato eliminado !!")));            
        })
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err))); })
    };
}

function changeDocumento(props, event){
    return dispatch =>{ dispatch(documentoChange(props, event.target.value)); }
}

function changeDocumentos(props, value){
    return dispatch =>{
        dispatch(documentoChange(props, value));
    }
}

function updateDocumento(payload){ 
    return dispatch => {        
        crudService.actualizar(payload,model)
        .then((response)=>{ 
            dispatch(documentoUpdate(response, payload));
            dispatch(createNotification(alertActions.success("dato actualizado !!")));            
        })
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err))); })
}}

function createDocumento(payload){    
    return dispatch => {        
        crudService.registrar(payload,model)
        .then((response)=>{ 
            dispatch(documentoCreate(response));         
            dispatch(createNotification(alertActions.success("dato creado !!")));            
        })
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err))); })
    }
}

function searchDocumento(payload){
    return dispatch => {        
        crudService.search(payload,model)
        .then((response)=>{ dispatch(documentoAll(response)); }) 
    }
}

function searchItems(payload){
    return dispatch => {           
        crudService.searchItems(payload,model)
        .then((response)=>{ dispatch(changeList(response)); }) 
    }
}

function uploadDocumento(data,documento){
    return dispatch => {        
        crudService.upload(data,model)        
        .then((response)=>{             
            documento.filename = response.filename;               
            crudService.actualizar(documento,model)
            .then((response)=>{ 
                dispatch(documentoUpdate(response,documento));
                dispatch(createNotification(alertActions.success("dato actualizado !!")));            
            })
        })
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err))); })
    }
}

function resetDocumento(){
    return dispatch =>{
        dispatch(itemReset());
    }
}
export function itemReset(){
    return{
        type: "DOCUMENTO_RESET",
        item: {            
        id:'',
        name:'',
        titulo:'',
        isbn:'',
        numEjemplares:0,
        numTomos:0,
        numPaginas:0,
        anio:'',
        filename:'default.jpg',
        codigo:'',
        tags:'',
        origen:'',
        autor:'',
        autor1:'',
        dewey:'',
        cuter:'',
        edicion:'',
        tipo:'',
        observaciones:'',
        editorialId:1,
        deweyId:1,
        carreraId:1,
        baja:false,
        mantanimiento:false,
        unico:false
        }              
    }
}
export function documentoAll(response){
    return{
        type: "DOCUMENTO_LIST_ALL",
        response: response
    }
}

export function serAll(response){
    return{
        type: "DOCUMENTO_SEARCH_ALL",
        response: response
    }
}



export function documentoCreate(response){
    return{
        type: "DOCUMENTO_CREATE_ITEM",
        response: response
    }
}

export function documentoUpdate(response,item){
    return{
        type: "DOCUMENTO_UPDATE_ITEM",
        response: response,
        item: item
    }
}

export function documentoEdit(data){
   
    return{
        type: "DOCUMENTO_EDIT_ITEM",
        item: data
    }
}

 
export function documentoChange(props, value){
    return{
        type: "HANDLE_ON_CHANGE_PRODUCT",
        props: props,
        value: value
    }
}

export function changeList(response){
    return{
        type: "DOCUMENTO_LISTA_SEARCH",
        response: response
    }
}

export function documentoExcel(response){
    return{
        type: "DOCUMENTO_LIST_EXCEL",
        response: response
    }
}
