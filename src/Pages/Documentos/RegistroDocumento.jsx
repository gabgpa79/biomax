import React from 'react'
import Select from 'react-select'
import Switch from "react-switch";
import DocumentoImagen from './DocumentoImagen'
import ItemDewey from './ItemDewey'
import ItemCuter from './ItemCuter'
import {
  Button,  
  Input,  
  Form,     
  Row,
  Col,  
  FormGroup, 
  ButtonGroup, 
  Label
} from "reactstrap";

const styles = {
  container: (provided) => ({
    ...provided,
    display: 'block',    
    minHeight: '1px',
    textAlign: 'left',
    border: 'none',    
    fontSize: '0.75rem',    

  }),
  control: (provided) => ({
    ...provided,
    border: '1px solid #b8b8b8',
    borderRadius: '0.3rem',
    color: '#4d4d4d',
    minHeight: '1px',
    height: '1.7rem',
    background: '#fff'  

  }),
  input: (provided) => ({
    ...provided,
    minHeight: '1px',
    color: '#4d4d4d',    
    borderRadius: '0.5rem'    
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    Height: '0.5px',
    Width: '0.5px',
    paddingTop: '0',
    paddingBottom: '0',
    color: '#4d4d4d'
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    minHeight: '0px',
    height: '0px'
  }),
  clearIndicator: (provided) => ({
    ...provided,
    minHeight: '0.8px',
    color: '#c1c1c1'
  }),
  valueContainer: (provided) => ({
    ...provided,
    minHeight: '1px',
    height: '20px',
    paddingTop: '0',
    paddingBottom: '0',          
    color: '#000'
  }),
  singleValue: (provided) => ({
    ...provided,
    minHeight: '1px',
    paddingBottom: '0px',
    color: '#4d4d4d',
    fontSize: '0.75rem'    
  }),
};

const defaultVal = (options, valor) =>{
  return options.filter(item =>
      item.value === valor
    )

}

const tipos =[{"value":"Libro","label":"Libro(s)"},
              {"value":"Tesis","label":"Tesis(s)"},
              {"value":"Revista","label":"Revista(s)"},
              {"value":"Compendio","label":"Compendio(s)"}
             ];

const origenes =[{"value":"Compra","label":"Compra(s)"},
                 {"value":"Donacion","label":"Donacion(s)"}              
             ];
const RegistroProducto = ({...props}) => (    
<Row className="crl">
<Col md="9">
  <Form className="form-registro" onSubmit={props.handleSave}>          
        <Row form>
          <Col md={9}>
            <FormGroup>
              <Label for="name">Titulo</Label>
              <Input
                  id="titulo"
                  name="titulo"
                  type="text"                  
                  value={props.item.titulo}                                                   
                  onChange={props.handleChange('titulo')}
                  required
                />   
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label for="codigo">Código</Label>
              <Input
                  name="codigo"
                  type="text"                            
                  value={props.item.codigo}                                                                                                                                   
                  onChange={props.handleChange('codigo')}
                  
                  />
            </FormGroup>
          </Col>
        </Row> 
        
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="name">Autor</Label>
              <Input
                  id="autor"
                  name="autor"
                  type="text"                  
                  value={props.item.autor}                                                   
                  onChange={props.handleChange('autor')}
                  
                />   
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="name">Autor (segundo)</Label>
              <Input
                  id="autor1"
                  name="autor1"
                  type="text"                  
                  value={props.item.autor1}                                                   
                  onChange={props.handleChange('autor1')}
                  
                />   
            </FormGroup>
          </Col>       
        </Row> 
        <Row form>        
        <Col md={5}>
            <FormGroup>
              <Label for="tipo">Dewey</Label>              
              <Input
                  id="dewey"
                  name="dewey"
                  type="text"                  
                  value={props.item.dewey}                                                   
                  onChange={props.handleChange('dewey')}
                  readOnly                  
                />                 
            </FormGroup>
          </Col> 
        <Col md={1}>
            <FormGroup className="mt-4">              
              <ItemDewey/>    
            </FormGroup>
          </Col>  
        <Col md={3}>
            <FormGroup>
              <Label for="tipo">Cutter</Label>
              <Input
                  id="cuter"
                  name="cuter"
                  type="text"                  
                  value={props.item.cuter}                                                   
                  onChange={props.handleChange('cuter')}
                  readOnly
                  
                />  
            </FormGroup>
          </Col> 
         <Col md={1}>
            <FormGroup className="mt-4">              
              <ItemCuter/>    
            </FormGroup>
          </Col>   
        </Row>
        <Row form>
          <Col md={4}>
            <FormGroup>
              <Label for="categorias">Editorial</Label>
               <Select                                                               
                            name="editorialId"                                                                         
                            options={props.editoriales}                                                                   
                            styles={styles}                                                                       
                            onChange={props.handleChanges('editorialId')}                 
                            value={(props.item.editorialId === 1) ? {label:"--Todos--", value:props.item.editorialId} 
                            : defaultVal(props.editoriales,props.item.editorialId)}                                             
                          />
            </FormGroup>  
          </Col>
           
          <Col md={4}>
            <FormGroup>
              <Label for="categorias">Carreas</Label>
               <Select                                                               
                            name="carreraId"                                                                         
                            options={props.carreras}                                                                   
                            styles={styles}                                                                       
                            onChange={props.handleChanges('carreraId')}                 
                            value={(props.item.carreraId === 1) ? {label:"--Todos--", value:props.item.carreraId} 
                            : defaultVal(props.carreras,props.item.carreraId)}                                             
                          />
            </FormGroup>  
          </Col> 
          <Col md={4}>
            <FormGroup>
              <Label for="categorias">Tipo</Label>
               <Select                                                               
                            name="tipo"                                                                         
                            options={tipos}                                                                   
                            styles={styles}                                                                       
                            value={defaultVal(tipos,props.item.tipo)}                                                                                                                                       
                            onChange={props.handleChanges('tipo')}                                         
                          />
            </FormGroup>  
          </Col>                 
        </Row>
        <Row form>
          <Col md={4}>
            <FormGroup>
              <Label for="tipo">N°Páginas</Label>              
              <Input
                  id="numPaginas"
                  name="numPaginas"
                  type="text"                  
                  value={props.item.numPaginas}                                                   
                  onChange={props.handleChange('numPaginas')}
                                  
                />                 
            </FormGroup>
          </Col> 
          <Col md={4}>
            <FormGroup>
              <Label for="tipo">N°Ejemplares</Label>              
              <Input
                  id="numEjemplares"
                  name="numEjemplares"
                  type="text"                  
                  value={props.item.numEjemplares}                                                   
                  onChange={props.handleChange('numEjemplares')}
                                  
                />                 
            </FormGroup>
          </Col> 
          <Col md={4}>
            <FormGroup>
              <Label for="tipo">N° Tomos</Label>              
              <Input
                  id="numTomos"
                  name="numTomos"
                  type="text"                  
                  value={props.item.numTomos}                                                   
                  onChange={props.handleChange('numTomos')}
                                
                />                 
            </FormGroup>
          </Col> 
          
         
                         
        </Row>
        <Row form>
          <Col md={3}>
              <FormGroup>
              <Label for="categorias">Origen</Label>
               <Select                                                               
                            name="origen"                                                                         
                            options={origenes}                                                                   
                            styles={styles}                                                                       
                            value={defaultVal(origenes,props.item.origen)}                                                                                                                                       
                            onChange={props.handleChanges('origen')}                                         
                          />
            </FormGroup> 
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label for="name">Año</Label>
              <Input
                  id="anio"
                  name="anio"
                  type="date"                  
                  value={props.item.anio}                                                   
                  onChange={props.handleChange('anio')}
                  
                />   
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Label for="codigo">ISBN</Label>
              <Input
                  name="isbn"
                  type="text"                            
                  value={props.item.isbn}                                                                                                                                   
                  onChange={props.handleChange('isbn')}
                  
                  />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Label for="codigo">Baja</Label>
             <div>                                                                            
                          <Switch
                            name="baja"                               
                            onChange={props.handleChanges('baja')} 
                            checked={props.item.baja} 
                            handleDiameter={18}
                            offColor="#a6d8f7"
                            onColor="#049dfd"
                            offHandleColor="#4d4d4d"
                            onHandleColor="#fff"
                            height={20}
                            width={70}                            
                            id="baja"
                            /> 
                          </div> 
            </FormGroup>
          </Col>
          <Col md={2}>
          <FormGroup>
              <Label for="name">Colección</Label>                          
                  <div>                                                                            
                          <Switch
                            name="unico"                               
                            onChange={props.handleChanges('unico')} 
                            checked={props.item.unico} 
                            handleDiameter={18}
                            offColor="#a6d8f7"
                            onColor="#049dfd"
                            offHandleColor="#4d4d4d"
                            onHandleColor="#fff"
                            height={20}
                            width={70}                            
                            id="unico"
                            /> 
                          </div> 
            </FormGroup>               
           
          </Col>
        </Row> 
        <FormGroup>
          <Label for="descripcion">Tags</Label>
          <Input 
                          type="textarea" 
                          name="tags" 
                          id="tags" 
                          value={props.item.tags}                                    
                          onChange={props.handleChange('tags')}
                          />
        </FormGroup> 
        <FormGroup>
          <Label for="descripcion">Observaciones</Label>
          <Input 
                          type="textarea" 
                          name="dobservaciones" 
                          id="observaciones" 
                          value={props.item.observaciones}                                    
                          onChange={props.handleChange('observaciones')}
                          />
        </FormGroup> 
        <Row>
        <Col>
          <ButtonGroup className="btn-grp">
          <Button 
          className="btn-sm btn-success"
          type="submit">
          Guardar
        </Button> 
          </ButtonGroup>
        </Col>
    </Row>
  </Form>
</Col>

<Col md="3">
<DocumentoImagen />
</Col>
</Row>

)

export default RegistroProducto
