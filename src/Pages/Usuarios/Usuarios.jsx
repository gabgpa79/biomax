import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { usuarioActions } from '../../actions'
import { Link } from 'react-router-dom'
import UsuarioData from './UsuarioData'
import UsuarioRegister from './UsuarioRegister'
import Pagination from '../../components/Pagination'
import { Notify } from 'react-redux-notify';
import {    
  Modal,
  Button,
  ButtonGroup,
  Nav, NavItem, TabContent, TabPane
} from "reactstrap";

class Usuarios extends Component {
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
    this.handleSearch = this.handleSearch.bind(this);
        
}  
  
componentWillMount(){
  this.makeHttpRequestWithPage(1);    
}
makeHttpRequestWithPage = async pageNumber => {
   this.props.getAllUsuario(pageNumber);
}

handleChange = prop => event => {                 
  this.props.onChangePropsUsuario(prop, event);             
};
toggleModalUpdate = (item) => {    
  if(this.state.modalUpdate)
  {   
      this.props.resetUsuario(); 
      this.setState({
     modalUpdate: false          
  })         
  }else{
    this.setState({ modalUpdate: !this.state.modalUpdate });
      if(item.id)    {
        this.props.getByIdUsuario(item)  
  }

  }    
};
handleSubmit(event){ 
  event.preventDefault();         
  if(this.props.usuario.usuarioItem.id){
    this.props.updateUsuario(this.props.usuario.usuarioItem);
  }else{
    this.props.createUsuario(this.props.usuario.usuarioItem);                       
    }  
  this.setState({
     modalUpdate: false          
  })    
}
handleSearch(event){  
    event.preventDefault();   
    this.props.searchUsuario(this.props.usuario.usuarioItem);        
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
            <Link to="/app/configuracion" className="nav-links"> Datos Iniciales </Link>            
          </NavItem>
          <NavItem>                        
            <Link to="/app/dcontables" className="nav-links"> Datos Financieros </Link>
          </NavItem>
          <NavItem>                        
            <Link to="/app/usuarios" className="nav-links active"> Usuarios </Link>
          </NavItem>
        </Nav>
        <Nav tabs className="bg-naving">                   
          <NavItem >            
            <Link 
              to="/app/usuarios" 
              className="nav-link active"
              onClick={this.toggleModalUpdate}
            > Nuevo Usuarios </Link>
          </NavItem>
        </Nav>

        <TabContent>
          <TabPane>                             
           <UsuarioData 
            data={ this.props.usuario.usuarioData}  
            toggleModalUpdate= {this.toggleModalUpdate}    
            toggleModalDelete= {this.toggleModalDelete}       
            />
             <Pagination 
             current = { this.props.usuario.pagina }
             paginas = { this.props.usuario.paginas }
             total   = { this.props.usuario.total }
             makeHttpRequestWithPage = {this.makeHttpRequestWithPage}
            />
          </TabPane>          
        </TabContent> 

      <Modal modalClassName="modal-update" isOpen={this.state.modalUpdate} toggle={this.toggleModalUpdate} >       
        <div className="modal-content">                     
          <UsuarioRegister 
          item={this.props.usuario.usuarioItem} 
          handleChange={this.handleChange}           
          handleSubmit={this.handleSubmit}
          toggleModalUpdate = {this.toggleModalUpdate} />
        </div>
      </Modal> 
      <Modal
          modalClassName="modal-delete"
          isOpen={this.state.modalDelete}
          toggle={this.toggleModalDelete}
        >       
          <div className="modal-content">
            <h5 className="text-center">Eliminar ?</h5>                                                    
            <ButtonGroup className="btn-grp">             
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
                color="danger"
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
      </div>
    </div>
    )
  }
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      ...usuarioActions
    },
    dispatch,
  )  
})

const mapStateToProps = state => ({
  usuario: state.usuario
});

export default connect(mapStateToProps,mapDispatchToProps)(Usuarios);