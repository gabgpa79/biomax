import model from '../models'
import jwt    from 'jsonwebtoken'

const bcrypt = require('bcrypt-nodejs')
const { User } = model;

class Users {

  static list (req, res){
    let der = (10 * req.params.page) - 10 ;
    let pagina = Number(req.params.page);    
    return User
    .findAndCountAll({offset: der,limit: 10,order: ['name']})
    .then(users => res.status(200).send({'paginas':(Math.ceil(users.count/10)),'pagina':pagina,'total':users.count,'data': users.rows }))
    .catch(error => res.status(400).send(error));}

    static update (req, res){
    const { name, username, password } = req.body
    let newpassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
    return User
      .update({name : name, username : username, password: password },
      { where: {id: req.params.id }})
      .then(user =>          
          User
          .findAndCountAll({offset: 0,limit: 10,order: ['name']})
          .then(users => res.status(200).send({'paginas':(Math.ceil(users.count/10)),'pagina':1,'total':users.count,'data': users.rows }))
          .catch(error => res.status(400).send(error))
   
          
        )
      .catch(error => res.status(400).send(error));
    } 

  // login
   static login(req, res) {    
    const { username, password } = req.body 
    return User
    .findOne({
      where: { username: req.body.username }
    })
    .then((user)=>{
     /* if(!user){
        res.status(401).send({auth : false, token : null, success: false, message : "Usuario no Autorizado"});  
      }*/
      if(!user){
       return res.status(401).send({
            message: 'Authentication fallida . Usuario no existe.',
          });
      }
      user.comparePassword(password, (err, isMatch) => {
        if(isMatch && !err) {
          let payload = { user_id: user.id, username: user.username }
          let token = jwt.sign(payload, 'unity2019', {expiresIn: '2629746000'});

          res.status(200).send({
            auth: true, 
            token: token, 
            success: true,
            message: 'success',
            'user':user
          })
        }else{
           res.status(401).send({success: false, message: 'Authentication fallida. contraseña incorrecta.'});           
        }

      })

    })
    .catch((error) => res.status(400).send(error));    
    }  

// registro
  static register(req, res) {
    const { name, username, password } = req.body
    return User
        .create({
        name, username, password })
        .then(user =>          
          User
          .findAndCountAll({offset: 0,limit: 10,order: ['name']})
          .then(users => res.status(200).send({'paginas':(Math.ceil(users.count/10)),'pagina':1,'total':users.count,'data': users.rows }))
          .catch(error => res.status(400).send(error))
        )    
        .catch(error => res.status(400).send(error));
  }

   //id
   static id(req, res) {
    return User
    .findOne({
        where: { id: req.params.id }
    })
   .then(userData => res.status(200).send({'data':userData}))
   .catch(error => res.status(400).send(error));

  }


}


export default Users
