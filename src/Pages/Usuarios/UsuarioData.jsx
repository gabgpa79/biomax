import React from "react";
import { Table,  Col, Row, Button, ButtonGroup} from 'reactstrap'

const UsuarioData = ({ ...props }) => (
<Row className="crl">
  <Col className="content-basica">
    <Table className="table-basica">
      <thead>
        <tr>
          <th width="10%">ID</th>
          <th width="40%">Nombre</th>                
          <th width="20%">Username</th>                          
          <th width="20%">Estado</th>                          
          <th width="10%">Acciones</th>
        </tr>          
      </thead>
      {props.data &&        
        <tbody>
        { props.data.map(item=>(
          <tr key={item.id}>                                                       
            <td >{ item.id }</td>                             
            <td >{ item.name }</td>                                         
            <td >{ item.username }</td>                         
            <td >{ item.enabled }</td>                                 
            <td >
              <ButtonGroup>
              <Button                                
                className="btn-success btn-sm"
                type="button"                
                onClick={() => props.toggleModalUpdate(item) }
                >
                <i className="fas fa-edit" />
              </Button>                                          
              </ButtonGroup>
            </td>                       
          </tr>    
          ))}
        </tbody>
      }  
    </Table>  
  </Col>
</Row>

 );

export default UsuarioData
