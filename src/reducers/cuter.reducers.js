const initialState = { 
        data: [],  
        item: {            
          id:'',
          codigo: '',
          label: ''
        }, 
        total:0,
        pagina:0,
        paginas:0,
                     
 };

export function cuter(state = initialState, action) {
  switch (action.type) {    
    case 'CUTER_LIST_ALL':
      return {                   
        ...state,
          data: action.response.data,
          item: action.item,
          total: action.response.total,
          pagina: action.response.pagina,
          paginas: action.response.paginas
      };  
    case 'CUTER_EDIT_ITEM':
            return { 
            ...state,               
                item: action.item
            };        
    
   
    case 'CUTER_HANDLE_ON_CHANGE':
            return {
            ...state,              
                item:
                {...state.item,                
                  [action.props]: action.value 
                }
            };
    case "CUTER_LISTA_SEARCH_NIT": 
      return { 
      ...state,                   
         data: action.response.data
      }  
    case 'CUTER_RESET_ITEM': 
           return {
           ...state,  
              item: action.item
            };                                                
    default:
      return state
  }
}

