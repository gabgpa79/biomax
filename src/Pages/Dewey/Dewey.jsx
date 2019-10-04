import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { deweyActions } from '../../actions'
import { Link } from 'react-router-dom'
import DeweyData from './DeweyData'
import DeweyRegistro from './DeweyRegistro'
import SearchDewey from './SearchDewey'
import Pagination from '../../components/Pagination'
import { Notify } from 'react-redux-notify';
import {    
  Modal,
  Button,         
  ButtonGroup,
  Nav, NavItem, TabContent, TabPane
} from "reactstrap";

class Dewey extends Component {
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
   this.props.getAllDewey(pageNumber);
}

toggleModalUpdate = (item) => {  
  this.setState({
    modalUpdate: !this.state.modalUpdate,    
  });
  if(item.id){    
    this.props.getByIdDewey(item);  
  }else
  {
    this.props.resetDewey();  
  }
  
};



handleChange = prop => event => {               
        this.props.changeDewey(prop, event);
    };
handleChanges = prop => event => {            
      this.props.changeDeweys(prop, event.value);    
    
  }
handleSubmit(event){ 
    event.preventDefault();               
        if(this.props.dewey.item.id){
            this.props.dewey.item.pagina = this.props.dewey.pagina;
            this.props.updateDewey(this.props.dewey.item);
        }else{
            this.props.createDewey(this.props.dewey.item);                       
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

handleSearch(event) {
    event.preventDefault();        
    this.props.searchDewey(this.props.dewey.item);     
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
            <Link to="/app/dewey" className="nav-links active"> Dewey </Link>
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
            > Nuevo Item </Link>
          </NavItem>
        </Nav>

        <TabContent>
          <TabPane>  
           <SearchDewey
           item={this.props.dewey.item}
           handleChange={this.handleChange}
           handleChanges={this.handleChanges}           
           handleSearch={ this.handleSearch}            
          />         
           <DeweyData 
           data={this.props.dewey.data}                                 
           current={this.props.dewey.pagina}                      
           toggleModalUpdate={this.toggleModalUpdate}
           toggleModalDelete={this.toggleModalDelete}
           />

           <Pagination 
             current = { this.props.dewey.pagina }
             paginas = { this.props.dewey.paginas }
             total   = { this.props.dewey.total }
             makeHttpRequestWithPage = {this.makeHttpRequestWithPage}
            />
           
            <Modal
          modalClassName="modal-update"
          isOpen={this.state.modalUpdate}
          toggle={this.toggleModalUpdate}
        >       
        <div className="modal-content bg-dark">                     
            <DeweyRegistro
            item={this.props.dewey.item}
            handleChange={this.handleChange}
            handleChanges={this.handleChanges} 
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
      ...deweyActions
    },
    dispatch,
  )  
})

const mapStateToProps = state => ({
  dewey: state.dewey
});

export default connect(mapStateToProps,mapDispatchToProps)(Dewey);