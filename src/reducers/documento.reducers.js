const initialState = { 
        data: [], 
        items: [],        
        item: {            
          id:'',
          name:'',
          titulo:'',
          isbn:'',
          numEjemplares:0,
          numTomos:0,
          numPaginas:0,
          anio:'',
          filename:'default.jpg',
          codigo:'',
          tags:'',
          origen:'',
          autor:'',
          autor1:'',
          cuter:'',
          dewey:'',
          edicion:'',
          tipo:'',
          observaciones:'',
          editorialId:1,
          deweyId:1,
          carreraId:1,
          baja:false,
          mantanimiento:false,
          unico:false
        },
        total:0,
        pagina:0,
        paginas:0
                     
 };

export function documento(state = initialState, action) {
  switch (action.type) {    
    case 'DOCUMENTO_LIST_ALL':
      return { 
      ...state,                   
          data: action.response.data,
          total: action.response.total,
          pagina: action.response.pagina,
          paginas: action.response.paginas
      };  
    case 'DOCUMENTO_EDIT_ITEM':
            return {
            ...state,                              
                item: action.item
            };  
    case "HANDLE_ON_CHANGE_PRODUCT":
            return {
            ...state,              
                item:
                {...state.item,                
                  [action.props]: action.value 
                }
            };   
    case "DOCUMENTO_UPDATE_ITEM":
            return {  
              ...state,                   
          data: action.response.data,
          total: action.response.total,
          pagina: action.response.pagina,
          paginas: action.response.paginas,
          item: action.item
          
            };
    case "DOCUMENTO_CREATE_ITEM": 
           return {  
          ...state,                   
          data: action.response.data,
          total: action.response.total,
          pagina: action.response.pagina,
          paginas: action.response.paginas,
          item: action.response.documentoItem
            }; 
    
    case 'DOCUMENTO_LISTA_SEARCH':
      return {           
          data: action.response.data,
          total: action.response.total,
          pagina: action.response.pagina,
          paginas: action.response.paginas
      }; 
     case "DOCUMENTO_RESET": 
      return {                    
          ...state,
          item: action.item
      };  
  
    case "DOCUMENTO_UPLOAD_IMAGE": 
      return {                    
          item: action.item                    
      };         
    case "DOCUMENTO_LIST_CATEGORIA": 
      return { 
      ...state,                   
          data: action.response.data,
          total: action.response.total,
          pagina: action.response.pagina,
          paginas: action.response.paginas
      }; 
    case "PRODUCT_RESET": 
      return {                    
          ...state,
          item: action.item
      };

    case "DOCUMENTO_LIST_CODIGO": 
      return { 
      ...state,                   
          data: action.response.data,
          total: action.response.total,
          pagina: action.response.pagina,
          paginas: action.response.paginas
      };  
    case 'DOCUMENTO_LIST_EXCEL':
      return { 
      ...state,                   
          items: action.response
      }; 
    case 'DOCUMENTO_SEARCH_ALL':
      return { 
      ...state,                   
          items: action.response.data,
          total: action.response.total,
          pagina: action.response.pagina,
          paginas: action.response.paginas
      };   
    default:
      return state
  }
}

