import React from 'react'
import Select from 'react-select'

import {
  Button,  
  Input,  
  Form,    
  Label,   
  Col,  
  FormGroup
} from "reactstrap";

const styles = {
  container: (provided) => ({
    ...provided,
    display: 'block',    
    minHeight: '1px',
    textAlign: 'left',
    border: 'none',    
    fontSize: '0.75rem',    

  }),
  control: (provided) => ({
    ...provided,
    border: '1px solid #b8b8b8',
    borderRadius: '0.3rem',
    color: '#4d4d4d',
    minHeight: '1px',
    height: '1.7rem',
    background: '#fff'  

  }),
  input: (provided) => ({
    ...provided,
    minHeight: '1px',
    color: '#4d4d4d',    
    borderRadius: '0.5rem'    
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    Height: '0.5px',
    Width: '0.5px',
    paddingTop: '0',
    paddingBottom: '0',
    color: '#4d4d4d'
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    minHeight: '0px',
    height: '0px'
  }),
  clearIndicator: (provided) => ({
    ...provided,
    minHeight: '0.8px',
    color: '#c1c1c1'
  }),
  valueContainer: (provided) => ({
    ...provided,
    minHeight: '1px',
    height: '20px',
    paddingTop: '0',
    paddingBottom: '0',          
    color: '#000'
  }),
  singleValue: (provided) => ({
    ...provided,
    minHeight: '1px',
    paddingBottom: '0px',
    color: '#4d4d4d',
    fontSize: '0.75rem'    
  }),
};

const defaultVal = (options, valor) =>{
  return options.filter(item =>
      item.value === valor
    )

}

const SearchProducto = ({...props}) => (  
  <Form className="formularios" onSubmit={ props.handleSearch}>        
    <FormGroup row>
      <Label for="nombre" sm={1}>Nombre</Label>
      <Col sm={6}>
        <Input
          type="text"
          name="titulo"                            
          value={props.item.titulo}                                                                
          onChange={props.handleChange('titulo')}
          />
      </Col>
      <Label for="codigo" sm={1}>Código</Label>
      <Col sm={3}>
        <Input
          name="codigo"                            
          value={props.item.codigo}                                                                                                                                   
          onChange={props.handleChange('codigo')}
        />
      </Col>    
    </FormGroup>
    <FormGroup row>
      <Label for="linea" sm={1}>Carrera</Label>
      <Col sm={3}>
        <Select                                                               
                            name="carreraId"                                                                         
                            options={props.carreras}                                                                   
                            styles={styles}                                                                       
                            onChange={props.handleChanges('carreraId')}                 
                            value={(props.item.carreraId === 1) ? {label:"--Todas--", value:props.item.carreraId} 
                            : defaultVal(props.carreras,props.item.carreraId)}                                             
                          />
      </Col>
      <Label for="categoria" sm={1}>Editorial</Label>
      <Col sm={3}>
      <Select                                                               
                            name="editorialId"                                                                         
                            options={props.editoriales}                                                                   
                            styles={styles}                                                                       
                            onChange={props.handleChanges('editorialId')}                 
                            value={(props.item.editorialId === 1) ? {label:"--Todas--", value:props.item.editorialId} 
                            : defaultVal(props.editoriales,props.item.editorialId)}                                             
                          />
      </Col>     
    </FormGroup>
    <div className="row">
      <div className="col-md-4">
        <Button className="btn-md btn-success" type="submit">
          <i className="fas fa-search" /> Buscar 
        </Button> 
      </div>
    </div>
  </Form>  
)

export default SearchProducto