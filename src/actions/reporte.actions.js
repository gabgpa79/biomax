import { crudService } from '../services';
import { alertActions } from './'
import {createNotification} from 'react-redux-notify';
const modea = 'reportea';
const modeb = 'reporteb';
const modev = 'reportev';
const modeo = 'reporteo';
export const reporteActions = {    
    change,
    changes,
    searchArticulos,
    searchCajas,    
    resetReporte
}

function searchArticulos(payload){
    return dispatch => {        
        crudService.search(payload,modea)
        .then((response)=>{     
        console.log(response)                           
           dispatch(reporteArticulos(response));              
        })
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err)));})
    };
}

function searchCajas(payload){
    return dispatch => {        
        crudService.search(payload,modeb)
        .then((response)=>{     
        console.log(response)                           
           dispatch(reporteCajas(response));              
        })
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err)));})
    };
}

function change(props, event){
    return dispatch =>{ dispatch(itemChange(props, event.target.value)); }
}

function changes(props, value){
    return dispatch =>{ dispatch(itemChange(props, value)); }
}

export function reporteVentas(response){
    return{
        type: "REPORTE_VENTAS_LIST",
        data: response.data,
        cantidad: response.cantidad        
    }
}

export function reporteArticulos(response){
    return{
        type: "REPORTE_ARTICULOS_LIST",
        data: response.data,
        cantidad: response.cantidad        
    }
}

export function reporteCajas(response){
    return{
        type: "REPORTE_CAJAS_LIST",
        data: response.data,
        cantidad: response.cantidad        
    }
}

export function reporteCompras(response){
    return{
        type: "REPORTE_COMPRAS_LIST",
        data: response.data,
        cantidad: response.cantidad        
    }
}


export function resetReporte(){
    return{
        type: "REPORTE_RESET"
    }
}

export function itemChange(props, value){
    return{
        type: "REPORTE_CHANGE",
        props: props,
        value: value
    }
}