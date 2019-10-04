import React from 'react'
import Select from 'react-select'
import {
  Button,
  Input,  
  Form,    
  Row,  
  Col,  
  Label,
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
const defaultVal = (options, valor) =>{
  return options.filter(item =>
      item.value === valor
    )

}
function Searchitem ({...props}){
return(

 <Form className="formularios" onSubmit={ props.handleSearch}>        
   <Row form>
          <Col md={4}>
            <FormGroup>
              <Label for="name">Label</Label>
               <Input
                    type="text"
                    name="label"
                    id="label"
                    value={ props.item.label }
                     onChange={props.handleChange('label')}
                  />  
            </FormGroup>
          </Col>
          <Col md={3}>
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
        <div className="row">
      <div className="col-md-4">
        <Button className="btn-sm btn-success" type="submit">
          <i className="fas fa-search" /> Buscar 
        </Button> 
      </div>
    </div>               
 </Form> 
 
  );
}
export default Searchitem

