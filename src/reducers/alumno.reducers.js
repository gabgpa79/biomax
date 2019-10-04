const initialState = { 
        data: [],  
        item: {            
          id:'',
          codigo: '',
          nombres: '',
          telefono: '',
          estado:true,
          carreraId:1
        }, 
        total:0,
        pagina:0,
        paginas:0,
                     
 };

export function alumno(state = initialState, action) {
  switch (action.type) {    
    case 'ALUMNO_LIST_ALL':
      return {                   
        ...state,
          data: action.response.data,
          item: action.item,
          total: action.response.total,
          pagina: action.response.pagina,
          paginas: action.response.paginas
      };  
    case 'ALUMNO_EDIT_ITEM':
            return { 
            ...state,               
                item: action.item
            };        
    
   
    case 'ALUMNO_HANDLE_ON_CHANGE':
            return {
            ...state,              
                item:
                {...state.item,                
                  [action.props]: action.value 
                }
            };
    case "ALUMNO_LISTA_SEARCH_NIT": 
      return { 
      ...state,                   
         data: action.response.data
      }  
    case 'ALUMNO_RESET_ITEM': 
           return {
           ...state,  
              item: action.item
            };                                                
    default:
      return state
  }
}

