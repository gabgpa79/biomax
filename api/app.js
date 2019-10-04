import http from 'http'
import express from 'express'
import logger from 'morgan'
import bodyParser from 'body-parser'
import compression from 'compression'
import cors from 'cors'
import routes from './server/routes'
var multer  = require('multer')

const hostname = 'localhost'
const port = 4000
const app = express()
const server = http.createServer(app)

app.use('/api/static', express.static('public'))
app.use(cors())
app.use(compression())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

routes(app);

app.get('*', (req, res) => res.status(200).send({
	message: "Welcome API ERP"
}))




server.listen(port, hostname, () =>{
	console.log(`Server is runing ar http://${hostname}:${port}/`)
})
