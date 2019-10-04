import React from 'react'

import {
  Button,  
  Input,
  Row,    
  Form,      
  Col,  
  FormGroup
} from "reactstrap";


const SearchProducto = ({...props}) => (  
<div className="content-busqueda">
<Row className="crl">
<Col md={2}>
<img
                  alt="..."
                  className="avatari"
                  src={require("../../assets/img/logo.png")}
                  />
</Col>
<Col md={10}>
  <Form className="formi mt-3" onSubmit={ props.handleSearch}>        
    <FormGroup row>      
      <Col md={10}>
        <Input
          type="text"
          name="tag"                            
          value={props.tag}                                                                
          onChange={props.handleChange}
          placeholder="--ingresa parametros de busqueda--"
          />
      </Col>
      <Col md={2}>
      <Button className="btn-md btn-primary" type="submit">
          <i className="fas fa-search" />
      </Button> 
      </Col>
    </FormGroup>
  </Form>
</Col>
</Row>    

</div>  
)

export default SearchProducto