import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reporteActions } from '../../actions'


import {   
  Button,
  Table } from "reactstrap";

  function fechaHoy (){

var meses = [
  "Enero", "Febrero", "Marzo",
  "Abril", "Mayo", "Junio", "Julio",
  "Agosto", "Septiembre", "Octubre",
  "Noviembre", "Diciembre"
]

var date = new Date();
var dia = date.getDate();
var mes = date.getMonth();
var yyy = date.getFullYear();
var fecha_formateada = dia + ' de ' + meses[mes] + ' de ' + yyy;
return fecha_formateada
}

class ReporteCompras extends Component {
  constructor(props) {
    super(props);
     this.state = {      
      
    };   
    this.print = this.print.bind(this); 
  }

 componentWillUnmount(){

  this.props.resetReporte();

}  
 print() {
        var content = document.getElementById('printarea');
        var pri = document.getElementById('ifmcontentstoprint').contentWindow;
        pri.document.open();
        pri.document.write(content.innerHTML);
        pri.document.close();
        pri.focus();
        pri.print();
    }
render() {         
    const { items, cantidad } = this.props.reporte    
    const { item } = this.props.reporte 
    return ( 
    <>         
      <div className="invoice-boxr table-responsive" id='printarea'> 
        <Table className="table-reportet">
           <tbody>
          <tr>                    
            <td width="50%">            
            User: { this.props.auth.user.name }
            </td>
            <td>Generado en : {fechaHoy()}</td> 
          </tr>
          </tbody> 
        </Table>
        <div className="sol">
        <Table className="table-reporteh">
          <tbody>
          <tr>
            <td className="text-center">
            <b>{ item.tipo }</b></td>
          </tr>
            
          <tr>
            <td className="text-center"><b>Desde:({item.desde}) / Hasta:({item.hasta})</b>
            </td>
          </tr>

          <tr>
          <td className="text-center"><b>Lista</b></td>
          </tr>
           </tbody>
        </Table>
        </div>
        <div className="soli">
        <Table className="table-reporteb">
        <thead>
          <tr>
            <th>Fecha</th>            
            <th>Total</th>
            <th>Cantidad</th>
            <th>Motivo</th>
            <th>Estado</th>                                    
            <th>Cliente</th>                                    
          </tr>          
        </thead>  
        { items &&               
         <tbody>
        { items.map(item=>(
          <tr key={item.id}>                                  
              <td className="text-center">{ item.createdAt}</td>              
              <td className="text-center">{ item.total} BOB</td>                       
              <td className="text-center">{ item.cantidad} </td>                       
              <td className="text-center">{ item.motivo}</td>
              <td className="text-center">{ item.est}</td>
              <td className="text-center">{ item.Proveedor.nombre}</td>                       

          </tr>                       

         ))
        }          
        </tbody>
        }     
      </Table> 
      </div>      
    </div>
    <div className="print" >
    <iframe id="ifmcontentstoprint" style={{
                        height: '0px',
                        width: '0px',
                        position: 'absolute'
                    }}></iframe>  
     <Button      
     className={(items.length > 0) ? "btn-md btn-success" : "btn-md disabled" }  
     onClick={this.print}>
     <i className="fas fa-print"/>  Print
     </Button>
     </div>
    </>
    )
  }
};

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

export default connect(mapStateToProps,mapDispatchToProps)(ReporteCompras);


