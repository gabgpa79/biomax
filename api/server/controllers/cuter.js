import model from '../models'
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


const { Cuter } = model;

class Cuters {

  static list (req, res){
    let der = (10 * req.params.page) - 10 ;
    let pagina = Number(req.params.page);    
    return Cuter
    .findAndCountAll({offset: der,limit: 10, 
      order:  [['codigo', 'ASC'],],
    })
    .then(cuters => res.status(200).send({'paginas':(Math.ceil(cuters.count/10)),'pagina':pagina,'total':cuters.count,'data': cuters.rows }))
    .catch(error => res.status(400).send(error));}

  static id(req, res) {
    return Cuter
    .findOne({ where: { id: req.params.id } })
   .then(editorialData => res.status(200).send(editorialData))
   .catch(error => res.status(400).send(error));}  

  static register(req, res) {
    const { codigo, label} = req.body
    return Cuter
        .create({ codigo, label })
    .then(user =>          
          Cuter
          .findAndCountAll({offset: 0,limit: 10,order: [['label', 'ASC'],],})
          .then(cuters => res.status(200).send({'paginas':(Math.ceil(cuters.count/10)),'pagina':1,'total':cuters.count,'data': cuters.rows }))
          .catch(error => res.status(400).send(error))
        )
    .catch(error => res.status(400).send(error));
  } 
  
  static delete(req, res){
    return Cuter
      .destroy({ where: { id:req.params.id}})
      .then(user =>          
          Cuter
          .findAndCountAll({offset: 0,limit: 10,order:  [['label', 'ASC'],],
        })
          .then(cuters => res.status(200).send({'paginas':(Math.ceil(cuters.count/10)),'pagina':1,'total':cuters.count,'data': cuters.rows }))
          .catch(error => res.status(400).send(error))
        )
      .catch(error => res.status(400).send(error));}

  static search(req, res) {
     let der = (11 * 1) - 11 ;
     const { codigo, label} = req.body  
   
      console.log(grp);
        return Cuter
        .findAndCountAll({
        hierarchy: true,
        offset: der,
        limit: 10,
        order:  [['label', 'ASC'],],                       
        where :  {
            [Op.and]: [
              { codigo: {[Op.iLike]: '%'+codigo+'%' }},
              { label:  {[Op.iLike]: '%'+label+'%'  }}
            ]
          }
       })
        .then(cuters =>
      res.status(200).send({'paginas':(Math.ceil(cuters.count/10)),'pagina':1,'total':cuters.count,'data': cuters.rows }))
     }

  static update (req, res){
    const { codigo, label, pagina } = req.body
    return Cuter
      .update({codigo : codigo, label : label },
      { where: {id: req.params.id }})
       .then(user =>          
          Cuter
          .findAndCountAll({offset: 0,limit: 10,
order:  [['label', 'ASC'],],
})
          .then(cuters => res.status(200).send({'paginas':(Math.ceil(cuters.count/10)),'pagina':pagina,'total':cuters.count,'data': cuters.rows }))
          .catch(error => res.status(400).send(error))
        )
      .catch(error => res.status(400).send(error));
    }


  static searchLista(req, res) {       
        return Cuter
        .findAndCountAll({
        hierarchy: true,
        offset: 0,
        limit: 10,
        order: ['codigo'],    
        attributes: ['id','codigo','label'],               
        where : { label: {[Op.iLike]: req.params.codigo+'%' }}})
        
      .then(cuters =>
      res.status(200).send({'data':cuters.rows}))
    .catch(error => res.status(400).send(error));
     }

}


export default Cuters
