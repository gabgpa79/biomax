import Alumnos from "./Pages/Alumnos/Alumnos.jsx";
import Configuracion from "./Pages/Editoriales/Editoriales.jsx";
import Documentos from "./Pages/Documentos/Documentos.jsx";
import Reportes from './Pages/Reportes/Reportes.jsx';


var routes = [  
  {
    path: "/alumnos",
    name: "Alumnos",    
    icon: "fas fa-user-friends",
    component: Alumnos,
    layout: "/app",
    level: 1
  },
   {
    path: "/documentos",
    name: "Documentos",
    icon: "fas fa-book",    
    component: Documentos,
    layout: "/app",
    level: 1
  }, 
  
  {
    path: "/editoriales",
    name: "Config",
    icon: "fas fa-cogs",
    component: Configuracion,
    layout: "/app",
    level: 1
  },
  {
    path: "/reportes",
    name: "Reportes",
    icon: "fas fa-file",
    component: Reportes,
    layout: "/app",
    level: 1
  }

];
 export default routes