import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reporteActions,documentoActions, dependenciasActions } from '../../actions'
import { Link } from 'react-router-dom'
import { stylesErp } from '../../helpers'
import Select from 'react-select'
import Switch from "react-switch";

import {   
  Nav, 
  NavItem, 
  ButtonGroup,
  Button,
  Input,
  Form,
  FormGroup,  
  Label,
  Col,
  Row } from "reactstrap";

const defaultVal = (options, valor) =>{
  return options.filter(item =>
      item.value === valor
    )

}

const tipos =[ {"value":"Totales","label":"Totales"},
               {"value":"Detalle","label":"Detalle"}
             ];

class Reportes extends Component {
  constructor(props) {
    super(props);
    this.state = {            
      report: null
    };  


  this.handleSubmit = this.handleSubmit.bind(this);  
}

componentWillMount(){   
    this.props.getAllDependencias();             
  }

handleChange = prop => event => {               
  this.props.change(prop, event);
}; 

handleChanges = prop => event => { 
  if(prop === 'stock')
  {
    this.props.changes(prop, event);       
  }else{
  this.props.changes(prop, event.value);       
  }
  
}

handleSubmit(event){ 
  event.preventDefault();    

  if(this.props.reporte.item.tipo === 'Totales')
  { this.props.searchArticulos(this.props.reporte.item)  }

  if(this.props.reporte.item.tipo === 'Detalle')
  { this.props.searchCajas(this.props.reporte.item)  }
  
}

render() {       
const { busqueda, item, report } = this.props.reporte  
const { pCarrera } = this.props.dependencias
    return (      
    <div className="content"> 
      <div className="main-contenido">
      <Row className="crl">
      <Col>
        <Nav tabs className="bg-navin">                   
          <NavItem>            
            <Link to="/app/reportes" className="nav-link active"> Informes </Link>            
          </NavItem>              
        </Nav>
      </Col>  
      </Row>

      <Row className="crl mt-2">
          <Col md={3}>                
          <div className="divicion">    
          <Form onSubmit={ this.handleSubmit}>   
          <Row form>
          <Col>
            <FormGroup>
              <Label for="codigo" className="mr-3">Informe</Label>
              <Select                                                               
                  name="tipo"                        
                  options={tipos}                                
                  value={defaultVal(tipos,item.tipo)}                             
                  styles={stylesErp}                                                                               
                  onChange={this.handleChanges('tipo')}
                />
            </FormGroup>    
          </Col>
          </Row>
           
      
          <Row form>
            <Col>                           
               <FormGroup>
              <Label for="categorias">Carreas</Label>
               <Select                                                               
                            name="carreraId"                                                                         
                            options={pCarrera}                                                                   
                            styles={stylesErp}                                                                       
                            onChange={this.handleChanges('carreraId')}                 
                            value={(item.carreraId === 1) ? {label:"--Todas--", value:item.carreraId} 
                            : defaultVal(pCarrera,item.carreraId)}                                             
                          />
            </FormGroup>           
            </Col> 
          </Row>          
             
          <Row form>
          <Col>
           <ButtonGroup className="btn-grp mt-2">
            <Button
              className={(item.tipo) ? "btn-md btn-success" : "btn-md disabled" }                      
              type="submit">
              <i className="fas fa-file"/> {' '} Generar
              </Button>           
          </ButtonGroup>
          </Col>
          </Row>

          </Form>
          </div>

          </Col>                  
          <Col md={9} className="reporting">                   
            <div className="divicion" >
                {report}     
            </div> 
          </Col>
          </Row>
      </div>
    </div>
    )
  }
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
    ...reporteActions,
    ...dependenciasActions,
    ...documentoActions
    },
    dispatch,
  )  
})

const mapStateToProps = state => ({
 reporte: state.reporte,
 documento: state.documento,
 dependencias: state.dependencias

});

export default connect(mapStateToProps,mapDispatchToProps)(Reportes);