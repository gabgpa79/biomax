import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reporteActions } from '../../actions'
import ReactToPrint from 'react-to-print';
import Moment from 'react-moment';


import {   
  Button,
  Table } from "reactstrap";

class ComponentToPrint extends Component {
  constructor(props) {
    super(props);
     this.state = {      
      
    };       
  }

  
render() {         
    const { items, item, cantidad } = this.props.reporte 
    const { user } = this.props.auth
    const fechaHoy =  new Date() 
    return (           
      <div className="invoice-boxr"> 
      <p className="text-right">Fecha Emisión : <Moment format="DD/MM/YYYY">{ fechaHoy }</Moment></p>
        <p className="text-right">Usuario : { user.name }</p>
        <h5 className="text-center"><b>Lista de Libros</b></h5>                            
        <div className="soli">
        <Table className="table-reporteb">
        <thead>
          <tr>            
            <th width="10%">#Inv</th>
            <th width="35%">Titulo</th>            
            <th width="25%">Autor</th>
            <th width="15%">Carrera</th>                                    
            <th width="15%">Tipo</th>                                    
          </tr>          
        </thead>  
        { items &&               
         <tbody>
        { items.map(item=>(
          <tr key={item.id}>                                                
              <td >{item.codigo}</td>
              <td >{item.titulo}</td>
              <td >{item.autor}</td>
              <td className="text-center">{item.Carrera.name}</td>
              <td className="text-center">{item.tipo}</td>
              
          </tr>                       

         ))
        }          
        </tbody>
        }     
      </Table> 
      </div>      
    </div>        
    )
  }
};


class ReporteCajas extends React.Component {  
componentWillUnmount(){
  this.props.resetReporte();
} 
  render() {    
    return (
      <div>
        <ReactToPrint
          trigger={() => <Button className="fas fa-print btn-sm btn-primary" >Imprimir</Button>}
          content={() => this.componentRef}
        />
        <ComponentToPrint 
        ref={el => (this.componentRef = el)} 
        reporte = { this.props.reporte }        
        auth =  { this.props.auth}
        />
      </div>
    );
  }
}



const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      ...reporteActions
    },
    dispatch,
  )  
})

const mapStateToProps = state => ({
  reporte: state.reporte,
  auth: state.auth
});

export default connect(mapStateToProps,mapDispatchToProps)(ReporteCajas);


