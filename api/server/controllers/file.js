import model from '../models'
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

var multer = require('multer')
const uuidv4 = require('uuid/v4');
const sharp = require('sharp');

var storage = multer.diskStorage({   

    destination: function (req, file, cb) {
      cb(null, 'public/images/documentos')      
    },
    filename: function (req, file, cb) {      
      cb(null, Date.now() + '-' +file.originalname ) 
      //const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
      //cb(null, newFilename);

    }
  })
  
var upload = multer({ storage: storage }).single('file')
 


class Files {
  static subir(req, res) {   
    upload(req, res, function (err) {           
        if (err instanceof multer.MulterError) {          
            return res.status(500).json(err)
          // A Multer error occurred when uploading.
          
        } else if (err) {          
            return res.status(500).json(err)
          // An unknown error occurred when uploading.
        }
        sharp(req.file.path).resize({ height: 500 }).toFile('./public/images/documentos/'+ 'erp-'+req.file.filename);                         
        return res.status(200).send(req.file)
          
      })    
  }

}
export default Files

