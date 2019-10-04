import model from '../models'
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


const { Documento, Editorial, Carrera, Dewey } = model;

class Documentos {

  static list (req, res){
    let der = (10 * req.params.page) - 10 ;
    let pagina = Number(req.params.page);    
    return Documento
    .findAndCountAll({offset: der,limit: 10, 
      order:  [['titulo', 'ASC'],],
       include: [{ model:Carrera, attributes: ['name']}]
    })
    .then(documentos => res.status(200).send({'paginas':(Math.ceil(documentos.count/10)),'pagina':pagina,'total':documentos.count,'data': documentos.rows }))
    .catch(error => res.status(400).send(error));
  }

  static id(req, res) {
    return Documento
    .findOne({ where: { id: req.params.id } })
   .then(documentoData => res.status(200).send(documentoData))
   .catch(error => res.status(400).send(error));}  

  static register(req, res) {
    const { name ,titulo, isbn, numEjemplares, dewey, numTomos, numPaginas, anio, filename, codigo, tags, origen, autor, autor1, cuter, edicion, tipo, observaciones, editorialId, deweyId, carreraId, baja, mantanimiento, unico } = req.body
    return Documento
        .create({ name ,titulo, isbn, numEjemplares, dewey, numTomos, numPaginas, anio, filename, codigo, tags, origen, autor, autor1, cuter, edicion, tipo, observaciones, editorialId, deweyId, carreraId, baja, mantanimiento, unico })
    .then(item =>          
          Documento
          .findAndCountAll({
            offset:0,
            limit: 10, 
            order:  [['titulo', 'ASC'],],
            include: [{ model:Carrera, attributes: ['name']}]
            })
          .then(documentos => res.status(200).send({'documentoItem':item,'paginas':(Math.ceil(documentos.count/10)),'pagina':1,'total':documentos.count,'data': documentos.rows }))
          .catch(error => res.status(400).send(error))
        )
    .catch(error => res.status(400).send(error));
  } 
  
  static delete(req, res){
    return Documento
      .destroy({ where: { id:req.params.id}})
      .then(user =>          
          Documento
          .findAndCountAll({offset: 0,limit: 10,order:  [['titulo', 'ASC'],],
        })
          .then(documentos => res.status(200).send({'paginas':(Math.ceil(documentos.count/10)),'pagina':1,'total':documentos.count,'data': documentos.rows }))
          .catch(error => res.status(400).send(error))
        )
      .catch(error => res.status(400).send(error));}

  static search(req, res) {
     let der = (11 * 1) - 11 ;
     const { codigo, titulo, carreraId, editorialId } = req.body  
     let iCarrera = 0;
     let fCarrera = 500; 
     let iEditorial = 0;
     let fEditorial = 500; 


     if(carreraId !== 1) 
     { iCarrera = carreraId; fCarrera = carreraId; }

     if(editorialId !== 1) 
     { iEditorial = editorialId; fEditorial = editorialId; }
   
      
        return Documento
        .findAndCountAll({
        hierarchy: true,
        offset: der,
        limit: 10,
        order:  [['titulo', 'ASC'],],
       include: [{ model:Carrera, attributes: ['name']}],                     
        where :  {
            [Op.and]: [
              { codigo: {[Op.iLike]: '%'+codigo+'%' }},
              { titulo:  {[Op.iLike]: '%'+titulo+'%'  }},
              { editorialId: {[Op.between]: [iEditorial, fEditorial]}},
              { carreraId: {[Op.between]: [iCarrera, fCarrera]}}
            ]
          }
       })
        .then(documentos =>
      res.status(200).send({'paginas':(Math.ceil(documentos.count/10)),'pagina':1,'total':documentos.count,'data': documentos.rows }))
     }

  static update (req, res){
    const { titulo, isbn, numEjemplares, dewey, numTomos, numPaginas, anio, filename, codigo, tags, origen, autor, autor1, cuter, edicion, tipo, observaciones, editorialId, deweyId, carreraId, baja, mantenimiento, unico } = req.body
    return Documento
      .update({        
        titulo: titulo,
        isbn: isbn, 
        numEjemplares: numEjemplares,
        numTomos: numTomos,
        dewey:dewey,
        numPaginas: numPaginas,
        anio: anio,
        filename: filename,
        codigo: codigo,
        tags: tags,
        origen: origen,
        autor: autor,
        autor1: autor1,
        cuter: cuter,
        edicion: edicion, 
        tipo: tipo,
        observaciones: observaciones,
        editorialId: editorialId,
        deweyId: deweyId,
        carreraId: carreraId,
        baja: baja,
        mantenimiento: mantenimiento,
        unico: unico
      },
      { where: {id: req.params.id }})
       .then(item =>          
          Documento
          .findAndCountAll({
            offset: 0,limit: 10,          
            order:  [['titulo', 'ASC'],],
            include: [{ model:Carrera, attributes: ['name']}]
    })
          .then(documentos => res.status(200).send({'paginas':(Math.ceil(documentos.count/10)),'pagina':1,'total':documentos.count,'data': documentos.rows }))
          .catch(error => res.status(400).send(error))
        )
      .catch(error => res.status(400).send(error));
    }


  static searchLista(req, res) {   
    console.log(req.params.codigo);       
        return Documento
        .findAndCountAll({
        hierarchy: true,
        offset: 0,
        limit: 10,
        order: ['nit'],    
        attributes: ['id','codigo','nit'],               
        where : { nit: {[Op.iLike]: req.params.codigo+'%' }}})
        
      .then(documento =>
      res.status(200).send({'data':documento.rows}))
    .catch(error => res.status(400).send(error));
     }

    static depends (req, res){
    return Editorial.findAll({ order:  [['nombre', 'ASC'],], attributes: [ ['id', 'value'], ['nombre', 'label']] })
    .then(editoriales => { 
          Carrera.findAll({ order:  [['name', 'ASC'],], attributes: [ ['id', 'value'], ['name', 'label']] })
            .then(carreras => { 
                Dewey.findAll({ order:  [['codigo', 'ASC'],], attributes: [ ['id', 'value'], ['label', 'label']] })
                  .then(deweys => {                       
res.status(200).send({'editoriales':editoriales,'carreras':carreras,'deweys':deweys })} 
                      
                  

              )}          
        )}

    )

  }  


  static exel(req, res) {     
     const { codigo, titulo, carreraId, editorialId } = req.body  
     let iCarrera = 0;
     let fCarrera = 500; 
     let iEditorial = 0;
     let fEditorial = 500;
     if(carreraId !== 1) 
     { iCarrera = carreraId; fCarrera = carreraId; }

     if(editorialId !== 1) 
     { iEditorial = editorialId; fEditorial = editorialId; }
   
     return Documento
        .findAndCountAll({                                 
         raw:true,
         hierarchy: true,
         order:  [['titulo', 'ASC'],],
         include: [
              { model:Carrera, attributes: ['name'] },
              { model:Editorial, attributes: ['nombre'] }
         ], 
        where :  {
            [Op.and]: [
              { codigo: {[Op.iLike]: '%'+codigo+'%' }},
              { titulo:  {[Op.iLike]: '%'+titulo+'%'  }},
              { editorialId: {[Op.between]: [iEditorial, fEditorial]}},
              { carreraId: {[Op.between]: [iCarrera, fCarrera]}}
            ]
          }
       })
        .then(documentos =>
      res.status(200).send({'data': documentos.rows }))
     }



   static searchAll(req, res) {
      let der = (15 * req.params.page) - 15 ;
      let pagina = Number(req.params.page); 
      console.log(req.params.page);
      console.log(req.params.tag);

      return Documento
        .findAndCountAll({
        hierarchy: true,
        offset: der,
        limit: 15,
        order:  [['titulo', 'ASC'],],
        include: [{ model:Carrera, attributes: ['name']}],                     
        where : { tags: {[Op.iLike]: '%'+req.params.tag+'%' }}
       })
        .then(documentos =>
      res.status(200).send({'paginas':(Math.ceil(documentos.count/15)),'pagina':pagina,'total':documentos.count,'data': documentos.rows }))
     }

}



export default Documentos
