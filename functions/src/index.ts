import * as functions from 'firebase-functions'
import * as express from 'express'
import * as cors from 'cors'

// import Utility from './utility'
// let util = new Utility()

let router = express.Router()
const options:cors.CorsOptions = {
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
  credentials: true,
  methods: "GET,POST",
  origin: true,
  preflightContinue: false
}
router.use(cors(options))
router.options("*", cors(options))

export const helloWorld = functions.https.onRequest((request, response) => {
  response.header('Content-Type','application/json')
  response.header('Access-Control-Allow-Origin', '*')
  response.header('Access-Control-Allow-Headers', 'Content-Type')
  response.status(200).send("Hello world!")
});
