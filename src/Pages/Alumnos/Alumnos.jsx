import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { carreraActions,alumnoActions } from '../../actions'
import { Link } from 'react-router-dom'
import AlumnoData from './AlumnoData'
import AlumnoRegister from './AlumnoRegister'
import Pagination from '../../components/Pagination'
import { Notify } from 'react-redux-notify';
import {    
  Modal,
  Button,
  ButtonGroup,
  Nav, NavItem, TabContent, TabPane
} from "reactstrap";

class Alumnos extends Component {
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
  this.props.getListaCarrera();  
}
makeHttpRequestWithPage = async pageNumber => {
   this.props.getAllAlumno(pageNumber);
}

handleChange = prop => event => {                 
  this.props.changeAlumno(prop, event);             
};

handleChanges = prop => event => {            
  if(prop === 'estado')
    {
      this.props.changeAlumnos(prop, event);  
    }else{
      this.props.changeAlumnos(prop, event.value);    
    }
    
  }

toggleModalUpdate = (item) => {    
  if(this.state.modalUpdate)
  {   
      this.props.resetAlumno(); 
      this.setState({
     modalUpdate: false          
  })         
  }else{
    this.setState({ modalUpdate: !this.state.modalUpdate });
      if(item.id)    {
        this.props.getByIdAlumno(item)  
  }

  }    
};
handleSubmit(event){ 
  event.preventDefault();         
  if(this.props.alumno.item.id){
    this.props.updateAlumno(this.props.alumno.item);
  }else{
    this.props.createAlumno(this.props.alumno.item);                       
    }  
  this.setState({
     modalUpdate: false          
  })    
}
handleSearch(event){  
    event.preventDefault();   
    this.props.searchAlumno(this.props.alumno.item);        
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
            <Link to="/app/alumnos" className="nav-links active"> Alumnos </Link>
          </NavItem>
        </Nav>
        <Nav tabs className="bg-naving">                   
          <NavItem >            
            <Link 
              to="#" 
              className="nav-link active"
              onClick={this.toggleModalUpdate}
            > Nuevo Alumnos </Link>
          </NavItem>
        </Nav>

        <TabContent>
          <TabPane>                             
           <AlumnoData 
            data={ this.props.alumno.data}  
            toggleModalUpdate= {this.toggleModalUpdate}    
            toggleModalDelete= {this.toggleModalDelete}       
            />
             <Pagination 
             current = { this.props.alumno.pagina }
             paginas = { this.props.alumno.paginas }
             total   = { this.props.alumno.total }
             makeHttpRequestWithPage = {this.makeHttpRequestWithPage}
            />
          </TabPane>          
        </TabContent> 

      <Modal modalClassName="modal-update" isOpen={this.state.modalUpdate} toggle={this.toggleModalUpdate} >       
        <div className="modal-content">                     
          <AlumnoRegister 
          item={this.props.alumno.item} 
          handleChange={this.handleChange}
          handleChanges={this.handleChanges}
          carreras={ this.props.carrera.items }           
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
      ...alumnoActions,
      ...carreraActions
    },
    dispatch,
  )  
})

const mapStateToProps = state => ({
  alumno: state.alumno,
  carrera: state.carrera
});

export default connect(mapStateToProps,mapDispatchToProps)(Alumnos);