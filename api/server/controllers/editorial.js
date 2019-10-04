import model from '../models'
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


const { Editorial } = model;

class Editorials {

  static list (req, res){
    let der = (10 * req.params.page) - 10 ;
    let pagina = Number(req.params.page);    
    return Editorial
    .findAndCountAll({offset: der,limit: 10,
      where: { id: {[Op.gt]: 1}}, 
      order: ['nombre']})
    .then(editorials => res.status(200).send({'paginas':(Math.ceil(editorials.count/10)),'pagina':pagina,'total':editorials.count,'data': editorials.rows }))
    .catch(error => res.status(400).send(error));}

  static id(req, res) {
    return Editorial
    .findOne({ where: { id: req.params.id } })
   .then(editorialData => res.status(200).send(editorialData))
   .catch(error => res.status(400).send(error));}  

  static register(req, res) {
    const { nombre, direccion, codigo, pais } = req.body
    return Editorial
        .create({ nombre, direccion, codigo, pais })
    .then(user =>          
          Editorial
          .findAndCountAll({offset: 0,limit: 10,
            where: { id: {[Op.gt]: 1}},
            order: ['nombre']})
          .then(editorials => res.status(200).send({'paginas':(Math.ceil(editorials.count/10)),'pagina':1,'total':editorials.count,'data': editorials.rows }))
          .catch(error => res.status(400).send(error))
        )
    .catch(error => res.status(400).send(error));
  } 
  
  static delete(req, res){
    return Editorial
      .destroy({ where: { id:req.params.id}})
      .then(user =>          
          Editorial
          .findAndCountAll({offset: 0,limit: 10,
            where: { id: {[Op.gt]: 1}},
            order: ['nombre']})
          .then(editorials => res.status(200).send({'paginas':(Math.ceil(editorials.count/10)),'pagina':1,'total':editorials.count,'data': editorials.rows }))
          .catch(error => res.status(400).send(error))
        )
      .catch(error => res.status(400).send(error));}

  static search(req, res) {
     let der = (11 * 1) - 11 ;
     const { nombre, direccion, codigo, pais } = req.body     
        return Editorial
        .findAndCountAll({
        hierarchy: true,
        offset: der,
        limit: 10,
        order: ['nombre'],                        
        where :  {
            [Op.and]: [
              { nombre: {[Op.iLike]: '%'+nombre+'%' }},
              { address:  {[Op.iLike]: '%'+address+'%'  }},
              { phone:  {[Op.iLike]: '%'+phone+'%'  }},
              { email:  {[Op.iLike]: '%'+email+'%'  }},
              { nit:  {[Op.iLike]: '%'+nit+'%'  }}
            ]
          }
       })
        .then(editorials =>
      res.status(200).send({'paginas':(Math.ceil(editorials.count/10)),'pagina':1,'total':editorials.count,'data': editorials.rows }))
     }

  static update (req, res){
    const { nombre, direccion, codigo, pais } = req.body
    return Editorial
      .update({nombre : nombre, direccion : direccion, codigo : codigo, pais : pais },
      { where: {id: req.params.id }})
       .then(user =>          
          Editorial
          .findAndCountAll({offset: 0,limit: 10,
            where: { id: {[Op.gt]: 1}},
            order: ['nombre']})
          .then(editorials => res.status(200).send({'paginas':(Math.ceil(editorials.count/10)),'pagina':1,'total':editorials.count,'data': editorials.rows }))
          .catch(error => res.status(400).send(error))
        )
      .catch(error => res.status(400).send(error));
    }


  static searchLista(req, res) {   
    console.log(req.params.nombre);       
        return Editorial
        .findAndCountAll({
        hierarchy: true,
        offset: 0,
        limit: 10,
        order: ['nit'],    
        attributes: ['id','nombre','nit'],               
        where : { nit: {[Op.iLike]: req.params.nombre+'%' }}})
        
      .then(editorial =>
      res.status(200).send({'data':editorial.rows}))
    .catch(error => res.status(400).send(error));
     }

}


export default Editorials
