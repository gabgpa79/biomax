import React from "react";
import { Table,  Button, ButtonGroup} from 'reactstrap'

const CarreraData = ({ ...props }) => (

    <Table className="table-basica">
      <thead>
        <tr>
          <th width="10%">ID</th>
          <th width="50%">Nombre</th> 
          <th width="20%">Abreviatura</th>                
          <th width="20%">Acciones</th>
        </tr>          
      </thead>
      {props.data &&        
        <tbody>
        { props.data.map(item=>(
          <tr key={item.id}>                                                       
            <td >{ item.id }</td>                             
            <td >{ item.name }</td> 
            <td >{ item.abreviacion }</td>                             
            <td >
              <ButtonGroup>
              <Button                                
                className="btn-success btn-sm"
                type="button"                
                onClick={() => props.toggleModalUpdate(item) }
                >
                <i className="fas fa-edit" />
              </Button>              
              <Button                                
                className="btn-danger btn-sm"
                type="button"                
                onClick={() => props.toggleModalDelete(item.id,props.current)}>
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

export default CarreraData
