import React from "react";


import { Table, Button, ButtonGroup} from 'reactstrap'


const ProductoData = ({...props }) => (
    <Table className="table-basica">
      <thead>
        <tr>
          <th width="5%">ID</th>
          <th width="35%">Titulo</th>
          <th width="15%">Autor</th>
          <th width="10%">Año</th>
          <th width="15%">Carrera</th>
          <th width="10%">Edición</th>            
          <th width="10%">Acciones</th>
        </tr>          
      </thead>
      {props.data &&        
        <tbody>
        { props.data.map(item=>(
          <tr key={item.id}>                    
              <td>{ item.id }</td>
              <td>{ item.titulo }</td>             
              <td>{ item.autor }</td>            
              <td>{ item.anio }</td>             
              <td>{ item.Carrera.name }</td>     
              <td>{ item.edicion }</td>                      

              <td >
               <ButtonGroup>
              <Button                
                className="btn-success btn-sm"
                type="button"
                onClick={() => props.handleUpdate(item) }
                >
                <i className="far fa-edit unity-edit" />
              </Button>
              <Button                
                className="btn-danger btn-sm"
                type="button"
                onClick={() => props.toggleModalDelete(item.id,props.current) }
                >
                <i className="far fa-trash-alt" /> 
              </Button>
              </ButtonGroup> 
              </td>  
          </tr>    
          ))}
        </tbody>
      }  
    </Table>  

);

export default ProductoData
