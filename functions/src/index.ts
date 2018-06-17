import * as functions from 'firebase-functions'
/*
import * as express from 'express'
import * as cors from 'cors'
*/
// import Utility from './utility'
// let util = new Utility()
/*
let router = express.Router()
const options:cors.CorsOptions = {
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
  credentials: true,
  methods: 'GET, POST, PUT, DELETE, OPTIONS',
  origin: true,
  preflightContinue: false
}
router.use(cors(options))
router.options("*", cors(options))
*/

export const test = functions.https.onCall((data, context) => {
  // response.header('Accept', '/')
  // response.header('withCredentials', 'true')
  console.log('data', data)
  return {
    uid: '10',
    data: 'datadayo',
    context: context
  }
})

export const helloWorld = functions.https.onRequest((request, response) => {
/*
  // response.header('Accept', '/')
  // response.header('withCredentials', 'true')
  response.header('Content-Type','application/json')
  response.header('Access-Control-Allow-Origin', '*')
  response.header('Access-Control-Allow-Credentials', 'true')
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-Access-Token", Authorization')
*/
  response = setheader(response)
  console.log(request.body)
  response.status(200).json({result: 'ok'}).end()
})

function setheader(response) {
  response.header('Content-Type','application/json')
  response.header('Access-Control-Allow-Origin', '*')
  response.header('Access-Control-Allow-Credentials', 'true')
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-Access-Token", Authorization')
  return response
}