import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { documentoActions } from '../../actions'
import { apiErp } from '../../helpers'

class DocumentoImagen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  
            file: '',
    				imagePreviewUrl:''
    			};
  }

  _handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', this.state.file);
    this.props.uploadDocumento(formData, this.props.documento.item); 
    this.setState({
        file: '',
        imagePreviewUrl: ''
      });
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }
    reader.readAsDataURL(file)
  }

  render() {
    let {imagePreviewUrl, file } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img alt="preview" src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<img alt="documento" className="img-responsive" 
        src={apiErp + '/static/images/documentos/erp-'+ this.props.documento.item.filename }/>);
    }    
    return (
      <div className="previewComponent">             
      <div className="row">
        <div className="imgPreview">
          {$imagePreview}
        </div>
      </div>
      <div className="row">
        <form onSubmit={(e)=>this._handleSubmit(e)}>
          <input className="fileInput" 
            type="file" 
            name="formData"
            onChange={(e)=>this._handleImageChange(e)} />
            { file ? <button           
            className="submitButton" 
            type="submit" 
            onClick={(e)=>this._handleSubmit(e)}>Upload Imagen</button>  : null}
            
          
        </form> 
      </div>  
      </div>
    )
  }
}
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      ...documentoActions
    },
    dispatch,
  )  
})

const mapStateToProps = state => ({
  documento: state.documento
});

export default connect(mapStateToProps,mapDispatchToProps)(DocumentoImagen);
