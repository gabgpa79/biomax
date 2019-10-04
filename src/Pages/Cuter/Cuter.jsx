import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { cuterActions } from '../../actions'
import { Link } from 'react-router-dom'
import CuterData from './CuterData'
import CuterRegistro from './CuterRegistro'
import Pagination from '../../components/Pagination'
import { Notify } from 'react-redux-notify';
import {    
  Modal,
  Button,         
  ButtonGroup,
  Nav, NavItem, TabContent, TabPane
} from "reactstrap";

class Cuter extends Component {
  constructor(props){
    super(props);
    this.state = {      
      activeTab: '1',
      modalDelete: false,
      modalUpdate: false,      
      current: 1,
      deleteId:0
      
    };          
     this.handleSubmit = this.handleSubmit.bind(this);          
     
}  
  
componentWillMount(){
  this.makeHttpRequestWithPage(1);    
}
makeHttpRequestWithPage = async pageNumber => {
   this.props.getAllCuter(pageNumber);
}

toggleModalUpdate = (item) => {  
  this.setState({
    modalUpdate: !this.state.modalUpdate,    
  });
  if(item.id){    
    this.props.getByIdCuter(item);  
  }else
  {
    this.props.resetCuter();  
  }
  
};



handleChange = prop => event => {               
        
        this.props.changeCuter(prop, event);
    };

handleSubmit(event){ 
    event.preventDefault();               
        if(this.props.cuter.item.id){
            this.props.updateCuter(this.props.cuter.item);
        }else{
            this.props.createCuter(this.props.cuter.item);                       
        }  
         this.setState({
          modalUpdate: false          
         })    
    }

toggleModalDelete = (item, pagina) => {
  this.setState({
    modalDelete: !this.state.modalDelete,
    deleteId: item,
    current: pagina
  });
};

handleDelete = () => {            
this.props.delete(this.state.deleteId, this.state.current);  
   this.setState({
    modalDelete: false,
    current: 1,
    deleteId:0
   })
}

 
render() {                      
    return (      
      <div className="content">    
        <Notify /> 
        <div className="main-contenido">
         <Nav tabs className="bg-navin">                  
       
          <NavItem>                        
            <Link to="/app/editoriales" className="nav-links"> Editoriales </Link>
          </NavItem>
          <NavItem>                        
            <Link to="/app/carreras" className="nav-links"> Carreras </Link>
          </NavItem>        
          <NavItem>                        
            <Link to="/app/dewey" className="nav-links"> Dewey </Link>
          </NavItem>
          <NavItem>                        
            <Link to="/app/cuter" className="nav-links active"> Cuter </Link>
          </NavItem>
        </Nav>

     
        <TabContent>
          <TabPane>           
           <CuterData 
           data={this.props.cuter.data}                                 
           current={this.props.cuter.pagina}                      
           toggleModalUpdate={this.toggleModalUpdate}
           toggleModalDelete={this.toggleModalDelete}
           />

           <Pagination 
             current = { this.props.cuter.pagina }
             paginas = { this.props.cuter.paginas }
             total   = { this.props.cuter.total }
             makeHttpRequestWithPage = {this.makeHttpRequestWithPage}
            />
           
            <Modal
          modalClassName="modal-update"
          isOpen={this.state.modalUpdate}
          toggle={this.toggleModalUpdate}
        >       
        <div className="modal-content bg-dark">                     
            <CuterRegistro
            item={this.props.cuter.item}
            handleChange={this.handleChange}
            toggleModalUpdate= {this.toggleModalUpdate} 
            handleSubmit={this.handleSubmit}           
            />
        </div>
        </Modal> 
        <Modal
          modalClassName="modal-delete"
          isOpen={this.state.modalDelete}
          toggle={this.toggleModalDelete}
        >       
          <div className="modal-content">
            <h5 className="text-center">Eliminar ?</h5>                                        
            <ButtonGroup className="botones mb-2">              
              <Button
              color="success"
              className="btn-sm"
              data-dismiss="modal"
              type="button"
              onClick={this.handleDelete}
              >
                Aceptar
              </Button>
              {' '}
              <Button
                color="info"
                className="btn-sm"
                data-dismiss="modal"
                type="button"
                onClick={this.toggleModalDelete}
              >
                Cancelar  
              </Button> 
            </ButtonGroup>
            
          </div>
        </Modal>
         
      
         
          </TabPane>         
        </TabContent>
      </div> 
      </div>
    )
  }
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      ...cuterActions
    },
    dispatch,
  )  
})

const mapStateToProps = state => ({
  cuter: state.cuter
});

export default connect(mapStateToProps,mapDispatchToProps)(Cuter);