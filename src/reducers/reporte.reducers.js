import React, { Component } from 'react'
import ReporteVentas from '../Pages/Reportes/ReporteVentas'
import ReporteArticulos from '../Pages/Reportes/ReporteArticulos'
import ReporteCajas from '../Pages/Reportes/ReporteCajas'
import ReporteCompras from '../Pages/Reportes/ReporteCompras'
const initialState = {          
        items: [],
        item:{
          tipo:'0',          
          carreraId:1
          
        },
        total:0,
        cantidad:0,
        busqueda:false,
        report:null
                     
 };

export function reporte(state = initialState, action) {
  switch (action.type) {    
    case 'REPORTE_VENTAS_LIST':
      return {                   
        ...state,
          items: action.data,          
          cantidad: action.cantidad,
          busqueda:true,
          report:<ReporteVentas/>
      };  
      case 'REPORTE_ARTICULOS_LIST':
      return {                   
        ...state,
          items: action.data,          
          cantidad: action.cantidad,
          busqueda:true,
          report:<ReporteArticulos/>
      };   
      case 'REPORTE_CAJAS_LIST':
      return {                   
        ...state,
          items: action.data,          
          cantidad: action.cantidad,
          busqueda:true,
          report:<ReporteCajas/>
      }; 
      case 'REPORTE_COMPRAS_LIST':
      return {                   
        ...state,
          items: action.data,          
          cantidad: action.cantidad,
          busqueda:true,
          report:<ReporteCompras/>
      }; 
      case 'REPORTE_RESET':
      return {                   
        ...state,
          items: [],
          cantidad: 0
      };  
      case 'REPORTE_CHANGE':
      return {
        ...state,              
          item:
          {...state.item,                
            [action.props]: action.value 
          }
      };  
    default:
      return state
  }
}