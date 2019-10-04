import model from '../models'
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


const { Carrera } = model;

class Carreras {

  static list (req, res){
    let der = (10 * req.params.page) - 10 ;
    let pagina = Number(req.params.page);    
    return Carrera
    .findAndCountAll({offset: der,limit: 10,where: { id: {[Op.gt]: 1}}, order: ['name']})
    .then(carreras => res.status(200).send({'paginas':(Math.ceil(carreras.count/10)),'pagina':pagina,'total':carreras.count,'data': carreras.rows }))
    .catch(error => res.status(400).send(error));}

  static id(req, res) {
    return Carrera
    .findOne({ where: { id: req.params.id } })
   .then(carreraData => res.status(200).send(carreraData))
   .catch(error => res.status(400).send(error));}  

  static register(req, res) {
    const { name, abreviacion } = req.body
    return Carrera
        .create({ name, abreviacion })
    .then(user =>          
          Carrera
          .findAndCountAll({offset: 0,limit: 10,
            where: { id: {[Op.gt]: 1}},
            order: ['name']})
          .then(carreras => res.status(200).send({'paginas':(Math.ceil(carreras.count/10)),'pagina':1,'total':carreras.count,'data': carreras.rows }))
          .catch(error => res.status(400).send(error))
        )
    .catch(error => res.status(400).send(error));
  } 
  
  static delete(req, res){
    return Carrera
      .destroy({ where: { id:req.params.id}})
      .then(user =>          
          Carrera
          .findAndCountAll({offset: 0,
            where: { id: {[Op.gt]: 1}},
            limit: 10,order: ['name']})
          .then(carreras => res.status(200).send({'paginas':(Math.ceil(carreras.count/10)),'pagina':1,'total':carreras.count,'data': carreras.rows }))
          .catch(error => res.status(400).send(error))
        )
      .catch(error => res.status(400).send(error));}

  static search(req, res) {
     let der = (11 * 1) - 11 ;
     const { name, direccion, codigo, pais } = req.body     
        return Carrera
        .findAndCountAll({
        hierarchy: true,
        offset: der,
        limit: 10,
        order: ['name'],                        
        where :  {
            [Op.and]: [
              { name: {[Op.iLike]: '%'+name+'%' }},
              { address:  {[Op.iLike]: '%'+address+'%'  }},
              { phone:  {[Op.iLike]: '%'+phone+'%'  }},
              { email:  {[Op.iLike]: '%'+email+'%'  }},
              { nit:  {[Op.iLike]: '%'+nit+'%'  }}
            ]
          }
       })
        .then(carreras =>
      res.status(200).send({'paginas':(Math.ceil(carreras.count/10)),'pagina':1,'total':carreras.count,'data': carreras.rows }))
     }

  static update (req, res){
    const { name, abreviacion } = req.body
    return Carrera
      .update({name : name, abreviacion : abreviacion },
      { where: {id: req.params.id }})
       .then(user =>          
          Carrera
          .findAndCountAll({offset: 0,limit: 10,
            where: { id: {[Op.gt]: 1}},
            order: ['name']})
          .then(carreras => res.status(200).send({'paginas':(Math.ceil(carreras.count/10)),'pagina':1,'total':carreras.count,'data': carreras.rows }))
          .catch(error => res.status(400).send(error))
        )
      .catch(error => res.status(400).send(error));
    }


  static searchLista(req, res) {   
    console.log(req.params.name);       
        return Carrera
        .findAndCountAll({
        hierarchy: true,
        offset: 0,
        limit: 10,
        order: ['nit'],    
        attributes: ['id','name','nit'],               
        where : { nit: {[Op.iLike]: req.params.name+'%' }}})
        
      .then(carrera =>
      res.status(200).send({'data':carrera.rows}))
    .catch(error => res.status(400).send(error));
     }

  static lista (req, res){
        Carrera.findAll({ order:  [['name', 'ASC'],], attributes: [ ['id', 'value'], ['name', 'label']] })
            .then(carreras => { 
                res.status(200).send({carreras })} 
              )}          
        

}


export default Carreras
