const initialState = { 
        data: [],  
        item: {            
          id:'',
          codigo: '',
          nombre: '',
          pais: '',
          direccion:''
        }, 
        total:0,
        pagina:0,
        paginas:0,
                     
 };

export function editorial(state = initialState, action) {
  switch (action.type) {    
    case 'EDITORIAL_LIST_ALL':
      return {                   
        ...state,
          data: action.response.data,
          item: action.item,
          total: action.response.total,
          pagina: action.response.pagina,
          paginas: action.response.paginas
      };  
    case 'EDITORIAL_EDIT_ITEM':
            return { 
            ...state,               
                item: action.item
            };        
    
   
    case 'EDITORIAL_HANDLE_ON_CHANGE':
            return {
            ...state,              
                item:
                {...state.item,                
                  [action.props]: action.value 
                }
            };
    case "EDITORIAL_LISTA_SEARCH_NIT": 
      return { 
      ...state,                   
         data: action.response.data
      }  
    case 'EDITORIAL_RESET_ITEM': 
           return {
           ...state,  
              item: action.item
            };                                                
    default:
      return state
  }
}

