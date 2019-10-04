import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { editorialActions } from '../../actions'
import { Link } from 'react-router-dom'
import EditorialData from './EditorialData'
import EditorialRegistro from './EditorialRegistro'
import Pagination from '../../components/Pagination'
import { Notify } from 'react-redux-notify';
import {    
  Modal,
  Button,         
  ButtonGroup,
  Nav, NavItem, TabContent, TabPane
} from "reactstrap";

class Editoriales extends Component {
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
   this.props.getAllEditorial(pageNumber);
}

toggleModalUpdate = (item) => {  
  this.setState({
    modalUpdate: !this.state.modalUpdate,    
  });
  if(item.id){    
    this.props.getByIdEditorial(item);  
  }else
  {
    this.props.resetEditorial();  
  }
  
};



handleChange = prop => event => {               
        
        this.props.changeEditorial(prop, event);
    };

handleSubmit(event){ 
    event.preventDefault();               
        if(this.props.editorial.item.id){
            this.props.updateEditorial(this.props.editorial.item);
        }else{
            this.props.createEditorial(this.props.editorial.item);                       
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
            <Link to="/app/editoriales" className="nav-links active"> Editoriales </Link>
          </NavItem>
          <NavItem>                        
            <Link to="/app/carreras" className="nav-links"> Carreras </Link>
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
            > Nueva Editorial </Link>
          </NavItem>
        </Nav>

        <TabContent>
          <TabPane>           
           <EditorialData 
           data={this.props.editorial.data}                                 
           current={this.props.editorial.pagina}                      
           toggleModalUpdate={this.toggleModalUpdate}
           toggleModalDelete={this.toggleModalDelete}
           />

           <Pagination 
             current = { this.props.editorial.pagina }
             paginas = { this.props.editorial.paginas }
             total   = { this.props.editorial.total }
             makeHttpRequestWithPage = {this.makeHttpRequestWithPage}
            />
           
            <Modal
          modalClassName="modal-update"
          isOpen={this.state.modalUpdate}
          toggle={this.toggleModalUpdate}
        >       
        <div className="modal-content bg-dark">                     
            <EditorialRegistro
            item={this.props.editorial.item}
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
      ...editorialActions
    },
    dispatch,
  )  
})

const mapStateToProps = state => ({
  editorial: state.editorial
});

export default connect(mapStateToProps,mapDispatchToProps)(Editoriales);