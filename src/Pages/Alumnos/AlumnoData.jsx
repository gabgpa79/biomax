import React from "react";
import { Table,   Button, ButtonGroup} from 'reactstrap'

const UsuarioData = ({ ...props }) => (
    <Table className="table-basica">
      <thead>
        <tr>
          <th width="10%">ID</th>
          <th width="15%">Código</th>                
          <th width="30%">Nombres</th>                          
          <th width="15%">Teléfono</th>                          
          <th width="10%">Estado</th>
          <th width="10%">Carrera</th>
          <th width="10%">Acciones</th>
        </tr>          
      </thead>
      {props.data &&        
        <tbody>
        { props.data.map(item=>(
          <tr key={item.id}>                                                       
            <td >{ item.id }</td> 
            <td >{ item.codigo }</td>                             
            <td >{ item.nombres }</td>                                         
            <td >{ item.telefono }</td>                         
            <td >{ item.estado === true ? 'habilitado':'desabilitado' }</td>                                 
            <td >{ item.Carrera.name }</td>                                             
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

 );

export default UsuarioData
