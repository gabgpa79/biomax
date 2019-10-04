import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import { documentoActions, dependenciasActions } from '../../actions'
import DocumentoData from './DocumentoData'
import Download from './Export' 

import SearchDocumento from './SearchDocumento'
import RegistroDocumento from './RegistroDocumento'
import Pagination from '../../components/Pagination'
import { Notify } from 'react-redux-notify';

import { 

  Nav, 
  NavItem, 
  NavLink, 
  TabContent, 
  TabPane, 
  ButtonGroup, 
  Modal, 
  Button } from "reactstrap";

class Documentos extends Component {
  constructor(props) {
    super(props);
     this.state = {      
      activeTab: '1',
      modalDelete: false,
      current: 1,
      deleteId:0,
      selectedFile:'',  
      search:false   
      
    };
    this.handleSave = this.handleSave.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  componentWillMount(){
    this.makeHttpRequestWithPage(1);  
    this.props.getAllDependencias();             
  }

  makeHttpRequestWithPage = pageNumber => {    
    this.props.getAllDocumento(pageNumber);    
  }  

handleChange = prop => event => {               
  this.props.changeDocumento(prop, event);
}; 

  
handleChanges = prop => event => {            
  if(prop === 'unico' || prop === 'mantenimiento' || prop === 'baja')
    {
      this.props.changeDocumentos(prop, event);  
    }else{
      this.props.changeDocumentos(prop, event.value);    
    }
    
  }

handleDelete = (id,pagina) => {       
  this.props.delete(this.state.deleteId, this.state.current);    
   this.setState({
    modalDelete: false,
    current: 1,
    deleteId:0,
    search:false
   })
}  

toggleModalDelete = (item, pagina) => {
  this.setState({
    modalDelete: !this.state.modalDelete,
    deleteId: item,
    current: pagina
  });
};

toggle(tab) {   
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
        search: false
    })  
    this.props.resetDocumento();  
 }
}  

handleSave(event){   
  event.preventDefault();      
  if(this.props.documento.item.id)
  {
   this.props.updateDocumento(this.props.documento.item);
  }  
  else
  {    
    this.props.createDocumento(this.props.documento.item);    
  }
   this.setState({
        search: false
    })
}

handleUpdate = (dato) => {      
  this.setState({            
    activeTab: '2'
  })    
  this.props.getByIdDocumento(dato);
}

handleSearch(event) {
    event.preventDefault();        
    this.props.searchDocumento(this.props.documento.item);  
     this.setState({
        search: true
    })   
  }

 
render() {         
    const { activeTab } = this.state; 
    return (      
      <div className="content"> 
    <Notify /> 
      <div className="main-contenido">
        <Nav tabs className="bg-navin">                   
          <NavItem>            
            <Link to="/app/documentos" className="nav-links active"> Documentos </Link>
          </NavItem>
          <NavItem>            
            <Link to="#" className="nav-links"> Periodicos </Link>
          </NavItem>
          <NavItem>            
            <Link to="#" className="nav-links"> Archivos Digitales </Link>
          </NavItem>          
        </Nav>
         <Nav tabs className="bg-naving">
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              Lista 
            </NavLink>
             </NavItem>   
            <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Nuevo
            </NavLink>
          </NavItem>
          {this.state.search === true ?
          <NavItem>
            <NavLink>
              <Download/>
            </NavLink>
          </NavItem>
          : null}
        </Nav>

        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
          {activeTab === '1' ?
          <>
            <SearchDocumento
           item={ this.props.documento.item}
           handleChange={ this.handleChange }
           handleChanges={ this.handleChanges }
           handleSearch={ this.handleSearch}
           deweys={ this.props.dependencias.pDewey }
           editoriales={ this.props.dependencias.pEditorial }
           carreras={ this.props.dependencias.pCarrera }            
          />
          
            <DocumentoData 
            data= { this.props.documento.data }
            handleUpdate={ this.handleUpdate}            
            current = { this.props.documento.pagina }
            toggleModalDelete={this.toggleModalDelete} 
            />
            <Pagination 
             current = { this.props.documento.pagina }
             paginas = { this.props.documento.paginas }
             total   = { this.props.documento.total }
             makeHttpRequestWithPage = {this.makeHttpRequestWithPage}
            />
          </>  
          : null}
          </TabPane>
          <TabPane tabId="2">
          {activeTab === '2' ?       
            <RegistroDocumento
              handleChange ={ this.handleChange }
              handleChanges ={ this.handleChanges }
              item={ this.props.documento.item}
              handleSave={ this.handleSave}
             deweys={ this.props.dependencias.pDewey }
            editoriales={ this.props.dependencias.pEditorial }
            carreras={ this.props.dependencias.pCarrera }    
              onClickHandler={ this.onClickHandler}
              onChangeHandler={this.onChangeHandler}
            />
          :  null}
          </TabPane>          
        </TabContent> 
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
      </div>
    </div>
    )
  }
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      ...documentoActions,
      ...dependenciasActions
    },
    dispatch,
  )  
})

const mapStateToProps = state => ({
  documento: state.documento,
  dependencias: state.dependencias

});

export default connect(mapStateToProps,mapDispatchToProps)(Documentos);




