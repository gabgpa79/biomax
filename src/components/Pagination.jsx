import React from 'react'
import {
  Button,  
  Nav,
  Row,
  Col
} from "reactstrap";

function Pagination ({makeHttpRequestWithPage,total,paginas,current}){
    let renderPageNumbers;
   const pageNumber = [];
    if (total !== null){
      for(let i = 1; i <= paginas; i++){
        pageNumber.push(i);
      }
      renderPageNumbers = pageNumber.map(number =>{
        let classes = current === number ? 'nav-pag': 'nav-pag disabled';

         if (number === 1 || number === total || (number >= current - 2 && number <= current + 2)) {
                return (
                  <button key={number} className={classes} onClick={() => makeHttpRequestWithPage(number)}>{number}</button>
                );
            }else{ return null;}
      });
    }
return(
      <Row>
        <Col md="12" className="naving">   
          <Nav className="navbar navbar-expand">
            <ul className="navbar-nav">
              <li className="nav-link mt-1">{ total } items </li>
                <Button className="nav-links btn-link" onClick={() => makeHttpRequestWithPage(1)}>
                  <i className="fas fa-chevron-left mt-1"></i>
                </Button>
                { renderPageNumbers }
                <Button className="nav-links btn-link" onClick={() => makeHttpRequestWithPage(paginas)}>
                     <i className="fas fa-chevron-right mt-1" />
                </Button> 
            </ul>
          </Nav> 
        </Col>
      </Row>
  );
}
export default Pagination
