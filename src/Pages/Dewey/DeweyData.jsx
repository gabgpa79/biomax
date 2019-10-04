import React from "react";
import { Table,  Button, ButtonGroup} from 'reactstrap'

const DeweyData = ({ ...props }) => (

    <Table className="table-basica">
      <thead>
        <tr>          
          <th width="20%">Grupo</th>
          <th width="20%">Código</th>
          <th width="70%">Label</th>          
          <th width="10%">Acciones</th>
        </tr>          
      </thead>
      {props.data &&        
        <tbody>
        { props.data.map(item=>(
          <tr key={item.id}>                                                                   
            <td >{ item.grupo ?  item.grupo : <i className="fas fa-level-down-alt "></i> }</td>
            <td >{ item.codigo }</td>
            <td >{ item.label }</td>            
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

export default DeweyData
