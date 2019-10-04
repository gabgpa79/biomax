const KeyToken = require('./keyToken');
import User from '../controllers/user'
import Editorial from '../controllers/editorial'
import Alumno from '../controllers/alumno'
import Carrera from '../controllers/carrera'
import Dewey from '../controllers/dewey'
import Cuter from '../controllers/cuter'
import Documento from '../controllers/documento'
import File from '../controllers/file'
import Reporte from '../controllers/informe'

export default (app) =>{
	app.get('/api',(req, res) => res.status(200).send({
		message: 'Api Router'
	}));

//REVISED
app.post('/api/user', KeyToken, User.register);             //OK
app.get('/api/user/list/:page', KeyToken, User.list);       //OK
app.put('/api/user/:id', KeyToken, User.update);            //OK
app.get('/api/user/:id', KeyToken,User.id);                 //OK
app.post('/api/user/login', User.login); 					//OK

//REVISED
app.get('/api/alumno/list/:page',KeyToken, Alumno.list);    //OK
app.get('/api/alumno/:id', KeyToken,Alumno.id);             //OK  
app.post('/api/alumno', KeyToken, Alumno.register);         //OK
app.put('/api/alumno/:id', KeyToken, Alumno.update);        //OK
app.delete('/api/alumno/:id',  KeyToken, Alumno.delete);    //OK
app.post('/api/alumno/search/', KeyToken,Alumno.search);    //OK

//REVISED
app.get('/api/editorial/list/:page',KeyToken, Editorial.list);    //OK
app.get('/api/editorial/:id', KeyToken,Editorial.id);             //OK  
app.post('/api/editorial', KeyToken, Editorial.register);         //OK
app.put('/api/editorial/:id', KeyToken, Editorial.update);        //OK
app.delete('/api/editorial/:id',  KeyToken, Editorial.delete);    //OK
app.post('/api/editorial/search/', KeyToken,Editorial.search);    //OK
app.get('/api/editorial/searchlist/:name', KeyToken, Editorial.searchLista); //OK

//REVISED
app.get('/api/carrera/list/:page',KeyToken, Carrera.list);    //OK
app.get('/api/carrera/:id', KeyToken,Carrera.id);             //OK  
app.post('/api/carrera', KeyToken, Carrera.register);         //OK
app.put('/api/carrera/:id', KeyToken, Carrera.update);        //OK
app.delete('/api/carrera/:id',  KeyToken, Carrera.delete);    //OK
app.post('/api/carrera/search/', KeyToken,Carrera.search);    //OK
app.get('/api/carrera/lista/items',  Carrera.lista); //OK


//REVISED
app.get('/api/dewey/list/:page',KeyToken, Dewey.list);    //OK
app.get('/api/dewey/:id', KeyToken,Dewey.id);             //OK  
app.post('/api/dewey', KeyToken, Dewey.register);         //OK
app.put('/api/dewey/:id', KeyToken, Dewey.update);        //OK
app.delete('/api/dewey/:id',  KeyToken, Dewey.delete);    //OK
app.post('/api/dewey/search/', KeyToken,Dewey.search);    //OK
app.get('/api/dewey/searchItems/:codigo', KeyToken, Dewey.searchLista); //OK



//REVISED
app.get('/api/cuter/list/:page',KeyToken, Cuter.list);    //OK
app.get('/api/cuter/:id', KeyToken,Cuter.id);             //OK  
app.post('/api/cuter', KeyToken, Cuter.register);         //OK
app.put('/api/cuter/:id', KeyToken, Cuter.update);        //OK
app.delete('/api/cuter/:id',  KeyToken, Cuter.delete);    //OK
app.post('/api/cuter/search/', KeyToken,Cuter.search);    //OK
app.get('/api/cuter/searchItems/:codigo', KeyToken, Cuter.searchLista); //OK


//REVISED
app.get('/api/documento/list/:page',KeyToken, Documento.list);    //OK
app.get('/api/documento/:id', KeyToken,Documento.id);             //OK  
app.post('/api/documento', KeyToken, Documento.register);         //OK
app.put('/api/documento/:id', KeyToken, Documento.update);        //OK
app.delete('/api/documento/:id',  KeyToken, Documento.delete);    //OK
app.post('/api/documento/search/', KeyToken,Documento.search);    //OK
app.post('/api/documento/exel/', Documento.exel);    //OK
app.get('/api/documento/searchlist/:name', KeyToken, Documento.searchLista); //OK
app.get('/api/documento/searchall/:page/tag/:tag', Documento.searchAll); //OK
//REVISED
app.get('/api/dependencias/lista', KeyToken, Documento.depends);


//uploads
app.post('/api/upload/documento/', File.subir);


app.post('/api/reportea/search/', Reporte.totales);
app.post('/api/reporteb/search/', Reporte.detalle);


//

}
