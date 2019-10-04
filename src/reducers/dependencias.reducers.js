const initialState = {         
        pDewey: [],
        pEditorial: [],
        pCarrera: []

                     
 };

export function dependencias(state = initialState, action) {
  switch (action.type) {    
    case 'DEPENDENCIAS_LIST_ALL':
      return { 
      ...state,                   
          pDewey: action.response.deweys,
          pEditorial: action.response.editoriales,
          pCarrera: action.response.carreras
      };  
    default:
      return state
  }
}

