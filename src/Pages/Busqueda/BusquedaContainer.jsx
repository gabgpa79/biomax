import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import BusquedaData from './BusquedaData'
import Search from './Search'
import { documentoActions, dependenciasActions } from '../../actions'
import Pagination from '../../components/Pagination'
class BusquedaContainer extends Component {
  constructor(props){
    super(props);
    this.state = {        
        username: '',
        password: '',        
        submitted: false,
        tag:''
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

handleChange = (event) => {              
   const { value } = event.target;    
   this.setState({      
        tag: value      
    });
};


handleSearch(event) {
    event.preventDefault();        
    this.props.searchAll(this.state.tag,1);  
     
  }
  makeHttpRequestWithPage = pageNumber => {    
    this.props.searchAll(this.state.tag,pageNumber);    
  } 

  render() { 
    
    return (      
      <div className="content">  
        <div className="main-contenido">  
          <Search
          tag={ this.state.tag }
          handleChange = { this.handleChange}    
          handleSearch = { this.handleSearch}      
          />
          { this.props.documento.items &&
          <>
          <BusquedaData
          data = {this.props.documento.items}
          current = { this.props.documento.pagina }
          />
          <Pagination 
             current = { this.props.documento.pagina }
             paginas = { this.props.documento.paginas }
             total   = { this.props.documento.total }
             makeHttpRequestWithPage = {this.makeHttpRequestWithPage}
            />
          </>  
          }  
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

export default connect(mapStateToProps,mapDispatchToProps)(BusquedaContainer);