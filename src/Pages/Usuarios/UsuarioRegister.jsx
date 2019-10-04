import React from "react";
import { Label, Button, ButtonGroup, Form, Col, Row, Input, FormGroup } from 'reactstrap'

const itemRegister = ({ ...props }) => (
<Form className="form-registro" onSubmit={ props.handleSubmit}>        
    <p className="form-label">Registro Usuario</p>
        <Row form>
          <Col md={7}>          
            <FormGroup>
              <Label for="name">Nombre</Label>
               <Input                            
                type="text"
                name="name"                            
                value={ props.item.name }
                onChange={props.handleChange('name')}
                required                
              />   
            </FormGroup>
          </Col>  
          <Col md={5}>
            <FormGroup>
              <Label for="name">Username</Label>
                 <Input                            
                  type="text"
                  name="username"                            
                  value={ props.item.username }
                  onChange={props.handleChange('username')}
                />
            </FormGroup>
          </Col>                           
        </Row>
        <Row form>          
          <Col md={6}>
            <FormGroup>
              <Label for="direccion">Password</Label>
              <Input                            
                type="password"
                name="password"                            
                value={ props.item.password }
                onChange={props.handleChange('password')}                            
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="direccion">Reingresar password { ((props.item.password === props.item.password1)&& (props.item.password)) ? 
                <span className="text-primary">inguales</span> : <span className="text-danger">desiguales</span> }</Label>
              <Input                            
                type="password"
                name="password1"                            
                value={ props.item.password1 }
                onChange={props.handleChange('password1')}                            
              />
            </FormGroup>
          </Col>                   
        </Row>      
        <Row>
        <Col>
          <ButtonGroup className="btn-grp">
          <Button
            className={((props.item.password === props.item.password1) && (props.item.password)) ? "btn-sm btn-success" : "btn-sm disabled" }                      
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
