import React from "react";
import { apiErp } from '../../helpers'

import { Col, Card, Row} from 'reactstrap'


const ProductoData = ({...props }) => (
    <Row className="crl">
    { props.data ?
    <Col  className="bresu">
    { props.data.map(item=>(
      <Card 
  key={item.id} 
  className="productoItem">          
   <Row className="raws">   
   <Col md="12" className="cp">
      <span className="pull-right">
     <p>{item.titulo}</p>
      </span>     
   </Col>
   </Row>

   <Row className="raws">
   <Col md="6" className="cpr">
      <img alt="documento" src={apiErp + '/static/images/documentos/erp-'+ item.filename }/>            
   </Col>
   <Col md="6" className="ter">             
         <p className="sbt"><b>Carrera</b></p>
        <p className="sbti">{item.Carrera.name}</p>  
        <p className="sbt text-center">{item.dewey}</p>
        <p className="sbt text-center">{item.cuter}</p>             
   </Col>   
   </Row>    
  </Card>
    ))}
    </Col>
  : 
    <Col  className="bresu">
      <p className="text-danger"> !!Sin resultados</p>
    </Col>
}
  </Row>  

);

export default ProductoData
