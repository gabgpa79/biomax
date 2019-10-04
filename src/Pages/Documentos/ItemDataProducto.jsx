import React from "react";
import { Table,Input} from 'reactstrap'


const ItemDataProducto= ({...props }) => (
<>
<div className="itemsumas table-responsive">
  <Table className="items-table table">                
        { props.items.length ?
        <tbody>
        { props.items.map((item,index)=>(          
          <tr key={item.productoId}
          className={item.productoId === props.selectItem ? "bg-dark text-white": "text-dark"}>          
                                        
              <td onClick={() => props.handleFocus(item) }>
                <div className="itemp">
                  <div className="itemt">{item.name}</div>
                  <div className="items">                  
                  {new Intl.NumberFormat('en-GB', { 
                style: 'currency', 
                currency: 'BOB',
                minimumFractionDigits: 2, 
                maximumFractionDigits: 2 
              }).format((item.precioTotal))}
                  </div>
                  <div className="itemn">
                  {item.cantidad} {item.variantes} a {item.precioUnitario + ' Bs.'}
                  </div>                  
                </div>
              </td>
              <td>              
                 <Input
                  name="cantidad"
                  type="number"                            
                  value={item.cantidad}                                                                                                                                   
                  onChange={(e) => props.handleChangeItem(e,index)}                  
                  required
                  />                
              </td>
              <td>              
                 <Input
                  name="precioUnitario"
                  type="number"                            
                  value={item.precioUnitario}                                                                                                                                   
                  onChange={(e) => props.handleChangeItem(e,index)}                  
                  required
                  />                
              </td>
          </tr>
        ))}
          <tr>                        
            <td className="pull-right font-weight-bold">
              {new Intl.NumberFormat('en-GB', { 
                style: 'currency', 
                currency: 'BOB',
                minimumFractionDigits: 2, 
                maximumFractionDigits: 2 
              }).format((props.sumaTotal))}
            </td>
          </tr>
          <tr>
          <td className="pull-right font-weight-bold">
            { props.cantidadTotal } Items</td>
          </tr>   
        </tbody>
      : null}
  </Table>    
</div>
</>
 );

export default ItemDataProducto
