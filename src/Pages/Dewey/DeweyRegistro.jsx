import React from "react";
import Select from 'react-select'
import { ButtonGroup,Col,Row,Label, Form, Button, Input, FormGroup } from 'reactstrap'

const tipos  =[{"value":"","label":"--Todos--"},
               {"value":"Generalidades","label":"Generalidades"},
               {"value":"Filosofia","label":"Filosofía & psicología"},
               {"value":"Religion","label":"Religión"},
               {"value":"Sociales","label":"Ciencias Sociales"},
               {"value":"Lenguas","label":"Lenguas"},
               {"value":"Matematicas","label":"Ciencias naturales & matemáticas"},
               {"value":"Tecnologia","label":"Tecnología (Ciencias aplicadas)"},
               {"value":"Artes","label":"Las artes"},
               {"value":"Literatura","label":"Literatura & retórica"},
               {"value":"Geografia","label":"Geografía & historia"}];
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

const EditorialRegistro = ({ ...props }) => (
<Form className="form-registro" onSubmit={props.handleSubmit}>          
<p className="form-label">Registro Usuario</p>
        <Row form>           
          <Col md={6}>
            <FormGroup>
              <Label for="nombre">Código</Label>
                 <Input                            
                  type="text"
                  nombre="codigo"                            
                  value={ props.item.codigo }
                  onChange={props.handleChange('codigo')}
                />
            </FormGroup>
          </Col>
           <Col md={6}>          
             <FormGroup>
              <label>Grupo</label>
                <Select                                                               
                  name="grupo"                        
                  options={tipos}                                                                              
                  styles={styles}                                                                               
                  onChange={props.handleChanges('grupo')}
                  value={(props.item.grupo === '') ? {label:"--Todos--", value:props.item.grupo} 
                  : defaultVal(tipos,props.item.grupo)} 
                />                          
              </FormGroup>
          </Col>                           
        </Row> 
        <Row form>          
          
           <Col md={12}>          
            <FormGroup>
              <Label for="nombre">Label</Label>
               <Input                            
                type="text"
                nombre="label"                            
                value={ props.item.label }
                onChange={props.handleChange('label')}
                required                
              />   
            </FormGroup>
          </Col>                           
        </Row> 

        <Row>
        <Col>
          <ButtonGroup className="btn-grp">
          <Button
            className={(props.item.label) ? "btn-sm btn-success" : "btn-sm disabled" }                      
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

export default EditorialRegistro
