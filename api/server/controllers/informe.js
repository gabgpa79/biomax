import model from '../models'
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const {  Documento, Editorial, Carrera, Dewey } = model;

class Informes {
 
  static totales (req, res){
    const { carreraId } = req.body     
    console.log(carreraId)      
    let istock = 0;
    let fstock = 0;
    if(carreraId !== 1)
    {
      istock = 1;
      fstock = 5000;
    }
    return Documento      
      .findAll({            
          attributes: [['carreraId'], [Sequelize.fn('count', Sequelize.col('carreraId')), 'y']],
          group : ['carreraId'],
          where :  {
            [Op.and]: [              
              { carreraId: {[Op.between]: [istock, fstock]}}
            ]
          }
      })
    .then(documentos => res.status(200).send({'data': documentos}))
    .catch(error => res.status(400).send(error));}

    static detalle (req, res){
    const { carreraId } = req.body      
    console.log(carreraId)    
    let istock = 1;
    let fstock = 50;
    if(carreraId !== 1 )
    {
      istock = carreraId;
      fstock = carreraId;
    }
    return Documento      
      .findAll({  
          order:  [['titulo', 'ASC'],],                    
          where : { carreraId: {[Op.between]: [istock, fstock]}},          
          include: [
            { model:Carrera, attributes: ['name']},
            { model:Editorial, attributes: ['nombre']}]
      })
    .then(documentos => res.status(200).send({'data': documentos}))
    .catch(error => res.status(400).send(error));}

    
   
}




export default Informes
