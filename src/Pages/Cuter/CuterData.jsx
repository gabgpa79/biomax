import React from "react";
import { Table, Button, ButtonGroup} from 'reactstrap'

const CuterData = ({ ...props }) => (


    <Table className="table-basica">
      <thead>
        <tr>
          <th width="10%">ID</th>
          <th width="20%">Código</th>
          <th width="50%">Nombre</th>          
          <th width="10%">Acciones</th>
        </tr>          
      </thead>
      {props.data &&        
        <tbody>
        { props.data.map(item=>(
          <tr key={item.id}>                                                       
            <td >{ item.id }</td>                             
            <td >{ item.codigo }</td>
            <td >{ item.label }</td>            
            <td >
              <ButtonGroup>
              <Button                                
                className="btn-success btn-sm"
                type="button"                                
                >
                <i className="fas fa-edit" />
              </Button>              
              <Button                                
                className="btn-danger btn-sm"
                type="button"                >                
                <i className="fas fa-trash-alt" />
              </Button>               
              </ButtonGroup>
            </td>                       
          </tr>    
          ))}
        </tbody>
      }  
    </Table>  
 

 );

export default CuterData
