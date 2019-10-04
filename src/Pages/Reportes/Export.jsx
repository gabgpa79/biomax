import React from 'react';
import ReactExport from 'react-data-export';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reporteActions } from '../../actions'
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

class Download extends React.Component {

    render() {
        const { items } = this.props.reporte 
        return (
            <ExcelFile element={<button className="btn-success btn-sm">
            <i className="fas fa-file-excel"/> Bajar Datos</button>}>
                <ExcelSheet data={items} name="Documentos">
                    <ExcelColumn label="N°Inv" value="id"/>
                    <ExcelColumn label="Titulo" value="titulo"/>
                    <ExcelColumn label="Código" value="codigo"/>
                    <ExcelColumn label="Autor" value="autor"/>
                    <ExcelColumn label="Edición" value="edicion"/>
                    <ExcelColumn label="Origen" value="origen"/>  
                    <ExcelColumn label="N°Páginas" value="numPaginas"/>
                    <ExcelColumn label="N°Ejemplares" value="numEjemplares"/>
                    <ExcelColumn label="N°Ejemplares" value="numTomos"/>                    
                    <ExcelColumn label="Carrera" value="Carrera.name"/>
                    <ExcelColumn label="Editorial" value="Editorial.nombre"/>                    
                </ExcelSheet>                
            </ExcelFile>
        );
    }
}


const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      ...reporteActions     
    },
    dispatch,
  )  
})

const mapStateToProps = state => ({
  reporte: state.reporte
});

export default connect(mapStateToProps,mapDispatchToProps)(Download);
