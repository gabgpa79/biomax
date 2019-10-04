import React from "react";
import { Link } from 'react-router-dom'
import { Label, Form, Card, CardBody, CardText, Col, Row, Button, Input, FormGroup } from 'reactstrap'

const Login = ({ submitted, username, password, handleChange, handleSubmit}) => (

<div className="content">  
  <Row>
    <Col md={{ size: 4, offset: 1}}>
        <Card className="card-user">
          <CardBody className="mt-4">
          <CardText/>
                  <div className="author">                                                  
                  <img
                  alt="..."
                  className="avatar"
                  src={require("../../assets/img/logo.png")}
                  />                                    
                  </div>          
            <Row className="crl">
              <Col className="text-center">
                  <Link 
                      to="/busqueda"
                      className="btn btn-success"
                      > 
                      <i className="fas fa-search" /> { ' '}
                      Panel de Busqueda 
                  </Link>
              </Col>
            </Row>           

          </CardBody>
        </Card>  
    </Col>
    <Col md={{ size: 4 }}>
        <Card className="card-user">
          <CardBody className="mt-4">
          <h5 className="description text-center"> Panel de Administrador
           </h5>
            <Form className="formulario"onSubmit={handleSubmit}>                  
                    <FormGroup className={submitted && !username ? ' has-error' : ''}>
                      <Label for="username">Username</Label>
                      <Input
                        type="text"
                        name="username"
                        id="username"
                        value={ username }
                        onChange={ (e) => {handleChange(e)} }                                                                                              
                      />
                      {submitted && !username &&
                          <div className="help-block">Ingresa tu usuario</div>
                      }  
                    </FormGroup>  
                    <FormGroup>
                      <Label for="password">Password</Label>
                      <Input
                        type="password"
                        name="password"
                        id="password"
                        value={ password }
                        onChange={ (e) => {handleChange(e)} }                        
                      />
                      {submitted && !password &&
                          <div className="help-block">Ingresa tu contraseña</div>
                      } 
                    </FormGroup>  
                      <Button                       
                      size="md" 
                      className="mt-2 btn btn-success"
                      block>
                          Login
                      </Button>
                  </Form>
          </CardBody>
        </Card>
    </Col>
  </Row>
  <Row className="mt-2">
      <Col md={{ size: 4, offset: 3 }} className="cen mt-2">
        <span>Desarrollado por </span>
        <a
              href="https://beggu.net"
              rel="noopener noreferrer"
              target="_blank"
            >
              Beggu.net
            </a>
      </Col>
  </Row>    
</div>
 );

export default Login
