import React from "react";
import { Label, Button, ButtonGroup, Form, Col, Row, Input, FormGroup } from 'reactstrap'
import Select from 'react-select'
import Switch from "react-switch";

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
const itemRegister = ({ ...props }) => (
<Form className="form-registro" onSubmit={ props.handleSubmit}>        
    <p className="form-label">Registro Alumnos</p>
        <Row form>
          <Col md={7}>          
            <FormGroup>
              <Label for="name">Nombre</Label>
               <Input                            
                type="text"
                name="nombres"                            
                value={ props.item.nombres }
                onChange={props.handleChange('nombres')}
                required                
              />   
            </FormGroup>
          </Col>  
          <Col md={5}>
            <FormGroup>
              <Label for="name">Código</Label>
                 <Input                            
                  type="text"
                  name="codigo"                            
                  value={ props.item.codigo }
                  onChange={props.handleChange('codigo')}
                />
            </FormGroup>
          </Col>                           
        </Row>
        <Row form>          
          <Col md={6}>
            <FormGroup>
              <Label for="direccion">Carrera</Label>
               <Select                                                               
                            name="carreraId"                                                                         
                            options={props.carreras}                                                                   
                            styles={styles}                                                                       
                            onChange={props.handleChanges('carreraId')}                 
                            value={(props.item.carreraId === 1) ? {label:"--Todos--", value:props.item.carreraId} 
                            : defaultVal(props.carreras,props.item.carreraId)}                                             
                          />
            </FormGroup>
          </Col>
          <Col md={6}>            
               <FormGroup>
              <Label for="name">Teléfono</Label>
                 <Input                            
                  type="text"
                  name="telefono"                            
                  value={ props.item.telefono }
                  onChange={props.handleChange('telefono')}
                />
            </FormGroup>
          </Col> 
          <Col md={4}>
          <FormGroup>
              <Label for="name">Estado</Label>                          
                  <div>                                                                            
                          <Switch
                            name="estado"                               
                            onChange={props.handleChanges('estado')} 
                            checked={props.item.estado} 
                            handleDiameter={18}
                            offColor="#a6d8f7"
                            onColor="#049dfd"
                            offHandleColor="#4d4d4d"
                            onHandleColor="#fff"
                            height={20}
                            width={70}                            
                            id="estado"
                            /> 
                          </div> 
            </FormGroup>               
           
          </Col>                  
        </Row>      
        <Row>
        <Col>
          <ButtonGroup className="btn-grp">
          <Button
            className={props.item.nombres ? "btn-sm btn-success" : "btn-sm disabled" }                      
            type="submit"                      
          >
                                  Guardar
          </Button>
                                {' '}
          <Button                                  
            className="btn-sm btn-danger"
            data-dismiss="modal"
            type="button"
            onClick={props.toggleModalUpdate}
          >
          Cancelar  
          </Button> </ButtonGroup>
        </Col>
    </Row>
    </Form> 

 );

export default itemRegister
