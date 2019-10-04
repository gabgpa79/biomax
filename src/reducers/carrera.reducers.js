const initialState = { 
        data: [],  
        item: {            
          id:'',
          codigo: '',
          name: '',
          abreviacion: ''
        }, 
        items:[],
        total:0,
        pagina:0,
        paginas:0,
                     
 };

export function carrera(state = initialState, action) {
  switch (action.type) {    
    case 'CARRERA_LIST_ALL':
      return {                   
        ...state,
          data: action.response.data,
          item: action.item,
          total: action.response.total,
          pagina: action.response.pagina,
          paginas: action.response.paginas
      };  
    case 'CARRERA_EDIT_ITEM':
            return { 
            ...state,               
                item: action.item
            };        
    
   
    case 'CARRERA_HANDLE_ON_CHANGE':
            return {
            ...state,              
                item:
                {...state.item,                
                  [action.props]: action.value 
                }
            };
    case "CARRERA_LISTA_SEARCH_NIT": 
      return { 
      ...state,                   
         data: action.response.data
      }  
    case 'CARRERA_RESET_ITEM': 
           return {
           ...state,  
              item: action.item
            }; 
    case 'CARRERA_LISTAS': 
           return {
           ...state,  
              items: action.response
            };                                                        
    default:
      return state
  }
}

