import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { carreraActions } from '../../actions'
import { Link } from 'react-router-dom'
import CarreraData from './CarreraData'
import CarreraRegistro from './CarreraRegistro'
import Pagination from '../../components/Pagination'
import { Notify } from 'react-redux-notify';
import {    
  Modal,
  Button,         
  ButtonGroup,
  Nav, NavItem, TabContent, TabPane
} from "reactstrap";

class Carreras extends Component {
  constructor(props){
    super(props);
    this.state = {      
      activeTab: '1',
      modalDelete: false,
      modalUpdate: false,      
      current: 1,
      deleteId:0
      
    };     
     this.handleChange = this.handleChange.bind(this); 
     this.handleSubmit = this.handleSubmit.bind(this);     
     this.handleDelete = this.handleDelete.bind(this);
     
}  
  
componentWillMount(){
  this.makeHttpRequestWithPage(1);    
}
makeHttpRequestWithPage = async pageNumber => {
   this.props.getAllCarrera(pageNumber);
}

toggleModalUpdate = (item) => {  
  this.setState({
    modalUpdate: !this.state.modalUpdate,    
  });
  if(item.id){    
    this.props.getByIdCarrera(item);  
  }else
  {
    this.props.resetCarrera();  
  }
  
};



handleChange = prop => event => {               
        
        this.props.changeCarrera(prop, event);
    };

handleSubmit(event){ 
    event.preventDefault();               
        if(this.props.carrera.item.id){
            this.props.updateCarrera(this.props.carrera.item);
        }else{
            this.props.createCarrera(this.props.carrera.item);                       
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
            <Link to="/app/carreras" className="nav-links active"> Carreras </Link>
          </NavItem>     
          <NavItem>                        
            <Link to="/app/dewey" className="nav-links"> Dewey </Link>
          </NavItem>
          <NavItem>                        
            <Link to="/app/cuter" className="nav-links"> Cuter </Link>
          </NavItem>
        </Nav>
        <Nav tabs className="bg-naving">                   
          <NavItem >            
            <Link to="#"              
              className="nav-link active"
              onClick={this.toggleModalUpdate}
            > Nueva Carrera </Link>
          </NavItem>
        </Nav>

        <TabContent>
          <TabPane>           
           <CarreraData 
           data={this.props.carrera.data}                                 
           current={this.props.carrera.pagina}                      
           toggleModalUpdate={this.toggleModalUpdate}
           toggleModalDelete={this.toggleModalDelete}
           />

           <Pagination 
             current = { this.props.carrera.pagina }
             paginas = { this.props.carrera.paginas }
             total   = { this.props.carrera.total }
             makeHttpRequestWithPage = {this.makeHttpRequestWithPage}
            />
           
            <Modal
          modalClassName="modal-update"
          isOpen={this.state.modalUpdate}
          toggle={this.toggleModalUpdate}
        >       
        <div className="modal-content bg-dark">                     
            <CarreraRegistro
            item={this.props.carrera.item}
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
      ...carreraActions
    },
    dispatch,
  )  
})

const mapStateToProps = state => ({
  carrera: state.carrera
});

export default connect(mapStateToProps,mapDispatchToProps)(Carreras);