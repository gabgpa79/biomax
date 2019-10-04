import React from "react";
import { Label, Form, Button, Input, FormGroup } from 'reactstrap'

const CarreraRegister = ({ ...props }) => (
  <Form className="form-registro" onSubmit={props.handleSubmit}>          
      <FormGroup>
      <Label for="nombre">Nombres</Label>
        <Input                            
          type="text"
          name="name"                            
          value={ props.item.name }
          onChange={props.handleChange('name')}
          required
        />
        </FormGroup> 
        <FormGroup>
      <Label for="nombre">Abreviatura</Label>
        <Input                            
          type="text"
          name="abreviacion"                            
          value={ props.item.abreviacion }
          onChange={props.handleChange('abreviacion')}
          required
        />
        </FormGroup>       
       <Button        
        className={(props.item.name) ? "btn-sm btn-success" : "btn-sm disabled" }                      
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
        </Button>     
  </Form>

 );

export default CarreraRegister
