const initialState = { 
        data: [],  
        item: {            
          id:'',
          codigo: '',
          label: '',
          grupo:''
        }, 
        total:0,
        pagina:0,
        paginas:0,
                     
 };

export function dewey(state = initialState, action) {
  switch (action.type) {    
    case 'DEWEY_LIST_ALL':
      return {                   
        ...state,
          data: action.response.data,
          item: action.item,
          total: action.response.total,
          pagina: action.response.pagina,
          paginas: action.response.paginas
      };  
    case 'DEWEY_EDIT_ITEM':
            return { 
            ...state,               
                item: action.item
            };        
    
   
    case 'DEWEY_HANDLE_ON_CHANGE':
            return {
            ...state,              
                item:
                {...state.item,                
                  [action.props]: action.value 
                }
            };
    case "DEWEY_LISTA_SEARCH_NIT": 
      return { 
      ...state,                   
         data: action.response.data
      }  
    case 'DEWEY_RESET_ITEM': 
           return {
           ...state,  
              item: action.item
            };                                                
    default:
      return state
  }
}

