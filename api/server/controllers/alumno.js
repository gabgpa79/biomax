import model from '../models'
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


const { Alumno, Carrera } = model;

class Alumnos {

  static list (req, res){
    let der = (10 * req.params.page) - 10 ;
    let pagina = Number(req.params.page);    
    return Alumno
    .findAndCountAll({offset: der,limit: 10,
      order:  [['nombres', 'DESC'],],
      include: [{ model: Carrera, attributes: ['id','name']}]
    })
    .then(alumnos => res.status(200).send({'paginas':(Math.ceil(alumnos.count/10)),'pagina':pagina,'total':alumnos.count,'data': alumnos.rows }))
    .catch(error => res.status(400).send(error));}

  static id(req, res) {
    return Alumno
    .findOne({ where: { id: req.params.id } })
   .then(alumnoData => res.status(200).send(alumnoData))
   .catch(error => res.status(400).send(error));}  

  static register(req, res) {
    const { codigo, nombres, telefono, estado, carreraId } = req.body
    return Alumno
        .create({ codigo, nombres, telefono, estado, carreraId })
    .then(user =>          
          Alumno
          .findAndCountAll({offset: 0,limit: 10,
          order:  [['nombres', 'DESC'],],
      include: [{ model: Carrera, attributes: ['id','name']}]
          })
          .then(alumnos => res.status(200).send({'paginas':(Math.ceil(alumnos.count/10)),'pagina':1,'total':alumnos.count,'data': alumnos.rows }))
          .catch(error => res.status(400).send(error))
        )
    .catch(error => res.status(400).send(error));
  } 
  
  static delete(req, res){
    return Alumno
      .destroy({ where: { id:req.params.id}})
      .then(user =>          
          Alumno
          .findAndCountAll({offset: 0,limit: 10,
          order:  [['nombres', 'DESC'],],
      include: [{ model: Carrera, attributes: ['id','name']}]
          })
          .then(alumnos => res.status(200).send({'paginas':(Math.ceil(alumnos.count/10)),'pagina':1,'total':alumnos.count,'data': alumnos.rows }))
          .catch(error => res.status(400).send(error))
        )
      .catch(error => res.status(400).send(error));}

  static search(req, res) {
     let der = (11 * 1) - 11 ;
     const { nombres, direccion, codigo, pais } = req.body     
        return Alumno
        .findAndCountAll({
        hierarchy: true,
        offset: der,
        limit: 10,
        order:  [['nombres', 'DESC'],],
      include: [{ model: Carrera, attributes: ['id','name']}]      ,                 
        where :  {
            [Op.and]: [
              { nombres: {[Op.iLike]: '%'+nombres+'%' }},
              { address:  {[Op.iLike]: '%'+address+'%'  }},
              { phone:  {[Op.iLike]: '%'+phone+'%'  }},
              { email:  {[Op.iLike]: '%'+email+'%'  }},
              { nit:  {[Op.iLike]: '%'+nit+'%'  }}
            ]
          }
       })
        .then(alumnos =>
      res.status(200).send({'paginas':(Math.ceil(alumnos.count/10)),'pagina':1,'total':alumnos.count,'data': alumnos.rows }))
     }

  static update (req, res){
    const { codigo, nombres, telefono, estado, carreraId } = req.body
    return Alumno
      .update({
        codigo:codigo,
        nombres:nombres,
        telefono:telefono,
        estado:estado,
        carreraId: carreraId
      },
      { where: {id: req.params.id }})
       .then(user =>          
          Alumno
          .findAndCountAll({offset: 0,limit: 10,
          order:  [['nombres', 'DESC'],],
      include: [{ model: Carrera, attributes: ['id','name']}]
          })
          .then(alumnos => res.status(200).send({'paginas':(Math.ceil(alumnos.count/10)),'pagina':1,'total':alumnos.count,'data': alumnos.rows }))
          .catch(error => res.status(400).send(error))
        )
      .catch(error => res.status(400).send(error));
    }


  static searchLista(req, res) {   
    console.log(req.params.nombres);       
        return Alumno
        .findAndCountAll({
        hierarchy: true,
        offset: 0,
        limit: 10,
        order: ['nit'],    
        attributes: ['id','nombres','nit'],               
        where : { nit: {[Op.iLike]: req.params.nombres+'%' }}})
        
      .then(editorial =>
      res.status(200).send({'data':editorial.rows}))
    .catch(error => res.status(400).send(error));
     }

}


export default Alumnos
