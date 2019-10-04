import React from "react";
import { ButtonGroup,Col,Row,Label, Form, Button, Input, FormGroup } from 'reactstrap'

const EditorialRegistro = ({ ...props }) => (
<Form className="form-registro" onSubmit={props.handleSubmit}>          
<p className="form-label">Registro Usuario</p>
        <Row form>
          <Col md={7}>          
            <FormGroup>
              <Label for="nombre">Nombre</Label>
               <Input                            
                type="text"
                nombre="nombre"                            
                value={ props.item.nombre }
                onChange={props.handleChange('nombre')}
                required                
              />   
            </FormGroup>
          </Col>  
          <Col md={5}>
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
        </Row>
        <Row form>                    
          <Col md={8}>
            <FormGroup>
              <Label for="direccion">Dirección</Label>
              <Input                            
                type="text"
                nombre="direccion"                            
                value={ props.item.direccion }
                onChange={props.handleChange('direccion')}                            
              />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="direccion">Pais</Label>
              <Input                            
                type="text"
                nombre="pais"                            
                value={ props.item.pais }
                onChange={props.handleChange('pais')}                            
              />
            </FormGroup>
          </Col>
                           
        </Row>      
        <Row>
        <Col>
          <ButtonGroup className="btn-grp">
          <Button
            className={(props.item.nombre) ? "btn-sm btn-success" : "btn-sm disabled" }                      
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
