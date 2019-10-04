import React,{Component} from 'react'
import { documentoActions, cuterActions } from '../../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {  
  Input,    
  Card,      
  CardBody,     
  ListGroup,
  ListGroupItem
} from "reactstrap";

class ItemCuter extends Component {
  constructor(props){
    super(props);
    this.state = {            
      codigo:'',            
      searchTerm: null,
      value: '',            
      items: [],                
      open:false,    
    };
}

componentWillMount(){
   
 }


clearInput() {
    this.setState({
      codigo:'' ,
      open: false     
    });
  }  

handleChange = (event) => {
    const { value } = event.target;
    const codigo = value.toLowerCase().trim();

    if (!value) {      
      this.clearInput();
      return;
    }

    this.setState({
      codigo:value,
      open: true
    });

    if (codigo) {
      this.search(codigo);
    }    
  }

search(searchTerm) {    
    this.props.searchListas(searchTerm);
  }

handleAsignar = (item) =>{  
  let dato = item.codigo + '-' + item.label
  this.props.changeDocumentos('cuter',dato)
   this.clearInput();
}

render() {   
    return (        
    <>    
               
              <Input
                type="text"
                name="codigo"
                placeholder="..codigo"                            
                value={this.state.codigo}                                                               
                onChange={this.handleChange}                 
              />               
 
      <div className="row">
      {this.state.open === true ?
      <Card className="restu">           
        <CardBody>
        {this.props.cuter.data && 
          <ListGroup> 
          { this.props.cuter.data.map(item=>(        
          
          <ListGroupItem
          key={item.id}
          tag="button"
          onClick={() => this.handleAsignar(item) }
          >
          <b>{item.codigo}</b> - {item.label}          
          </ListGroupItem>
          ))}         
        </ListGroup>
        }
        </CardBody>              
      </Card>: null 
    }
      </div>              
    </>
    ) 
  }
}
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      ...cuterActions,
      ...documentoActions
    },
    dispatch,
  )  
})

const mapStateToProps = state => ({
  cuter: state.cuter  
});

export default connect(mapStateToProps,mapDispatchToProps)(ItemCuter);