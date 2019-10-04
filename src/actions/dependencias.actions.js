import { crudService } from '../services/'
import { alertActions } from './'
import {createNotification} from 'react-redux-notify';
const model = 'dependencias';
export const dependenciasActions = {
    getAllDependencias
}

function getAllDependencias(){
    return dispatch => {        
        crudService.getLista(model)
        .then((response)=>{             
            dispatch(dependenciaAll(response));})
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err)));})
    };
}

export function dependenciaAll(response){
    return{
        type: "DEPENDENCIAS_LIST_ALL",
        response: response
    }
}
