import { combineReducers } from 'redux'
import notifyReducer from 'react-redux-notify';
import { auth } from './auth.reducers'
import { alumno } from './alumno.reducers'
import { editorial } from './editorial.reducers'
import { carrera } from './carrera.reducers'
import { dewey } from './dewey.reducers'
import { documento } from './documento.reducers'
import { dependencias } from './dependencias.reducers'
import { cuter } from './cuter.reducers'
import { reporte } from './reporte.reducers'


const rootReducer = combineReducers({
  auth,  
  alumno,
  carrera,
  editorial,
  dewey,
  cuter,
  documento,
  dependencias,
  reporte,
  notifications: notifyReducer 
});

export default rootReducer;

