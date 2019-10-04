import model from '../models'
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


const { Dewey } = model;

class Deweys {

  static list (req, res){
    let der = (10 * req.params.page) - 10 ;
    let pagina = Number(req.params.page);    
    return Dewey
    .findAndCountAll({offset: der,limit: 10, 
      order:  [['codigo', 'ASC'],],
    })
    .then(deweys => res.status(200).send({'paginas':(Math.ceil(deweys.count/10)),'pagina':pagina,'total':deweys.count,'data': deweys.rows }))
    .catch(error => res.status(400).send(error));}

  static id(req, res) {
    return Dewey
    .findOne({ where: { id: req.params.id } })
   .then(deweysData => res.status(200).send(deweysData))
   .catch(error => res.status(400).send(error));}  

  static register(req, res) {
    const { codigo, label, grupo } = req.body
    return Dewey
        .create({ codigo, label, grupo })
    .then(user =>          
          Dewey
          .findAndCountAll({offset: 0,limit: 10,order: ['codigo']})
          .then(deweys => res.status(200).send({'paginas':(Math.ceil(deweys.count/10)),'pagina':1,'total':deweys.count,'data': deweys.rows }))
          .catch(error => res.status(400).send(error))
        )
    .catch(error => res.status(400).send(error));
  } 
  
  static delete(req, res){
    return Dewey
      .destroy({ where: { id:req.params.id}})
      .then(user =>          
          Dewey
          .findAndCountAll({offset: 0,limit: 10,order:  [['codigo', 'ASC'],],
        })
          .then(deweys => res.status(200).send({'paginas':(Math.ceil(deweys.count/10)),'pagina':1,'total':deweys.count,'data': deweys.rows }))
          .catch(error => res.status(400).send(error))
        )
      .catch(error => res.status(400).send(error));}

  static search(req, res) {
     let der = (11 * 1) - 11 ;
     const { codigo, label, grupo } = req.body  
     let grp="%";
     if(grupo) { grp=grupo}   
      console.log(grp);
        return Dewey
        .findAndCountAll({
        hierarchy: true,
        offset: der,
        limit: 10,
        order:  [['codigo', 'ASC'],],                       
        where :  {
            [Op.and]: [
              { codigo: {[Op.iLike]: '%'+codigo+'%' }},
              { label:  {[Op.iLike]: '%'+label+'%'  }},              
              { grupo:  {[Op.iLike]: '%'+grp+'%'  }}
            ]
          }
       })
        .then(deweys =>
      res.status(200).send({'paginas':(Math.ceil(deweys.count/10)),'pagina':1,'total':deweys.count,'data': deweys.rows }))
     }

  static update (req, res){
    const { codigo, label, grupo, pagina } = req.body
    return Dewey
      .update({codigo : codigo, label : label, grupo:grupo },
      { where: {id: req.params.id }})
       .then(user =>          
          Dewey
          .findAndCountAll({offset: 0,limit: 10,
order:  [['codigo', 'ASC'],],
})
          .then(deweys => res.status(200).send({'paginas':(Math.ceil(deweys.count/10)),'pagina':pagina,'total':deweys.count,'data': deweys.rows }))
          .catch(error => res.status(400).send(error))
        )
      .catch(error => res.status(400).send(error));
    }


  static searchLista(req, res) {       
        return Dewey
        .findAndCountAll({
        hierarchy: true,
        offset: 0,
        limit: 10,
        order: ['codigo'],    
        attributes: ['id','codigo','label'],               
        where : { codigo: {[Op.iLike]: req.params.codigo+'%' }}})
        
      .then(deweys =>
      res.status(200).send({'data':deweys.rows}))
    .catch(error => res.status(400).send(error));
     }

}


export default Deweys
