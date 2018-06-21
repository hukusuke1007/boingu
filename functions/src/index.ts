import * as functions from 'firebase-functions'
import * as firebase from 'firebase-admin'
import twitterModel from './model/twitter/twitterModel'
import storageModel from './model/firebase/storageModel'

/*
import * as express from 'express'
import * as cors from 'cors'
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

firebase.initializeApp()
let twitter = new twitterModel()
/* 
  HTTPS Callable functions must be called using the POST method,
  the Content-Type must be application/json or application/json; charset=utf-8,
  and the body must contain a field called data for the data to be passed to the method.
  https://firebase.google.com/docs/functions/callable-reference
*/

export const tweet = functions.https.onCall((data, context) => {
  console.log('tweet')
  twitter.tweet('test tweet dayo')
    .then((result) => {
      console.log('tweetRequest', result)
    }).catch((error) => {
      console.error('tweetRequest', error)
    })
})

export const tweetRequest = functions.https.onRequest((request, response) => {
  response = setheader(response)
  twitter.tweet('test tweet dayo')
    .then((result) => {
      console.log('tweetRequest', result)
      response.status(200).json({message: 'OK', result: result}).end()
    }).catch((error) => {
      console.error('tweetRequest', error)
      response.status(500).json({message: 'NG', result: error}).end()
    })
})

export const tweetWithMedia = functions.https.onRequest((request, response) => {
  response = setheader(response)
  let filenamePath = 'images/boingu_164224f1a4aa74ad3681e8fc00_20180621.png'
  let storage = new storageModel(filenamePath)
  // controllerかましたほうがよいかも
  storage.downloadFile()
   .then((result) => {
     let message = 'image test dayo'
     twitter.tweetWithMedia(message, result)
       .then((result) => {
         response.status(200).json({message: 'OK', result: result}).end()
         storage.deleteFile()
           .then((result) => {
             console.log('deleteFile', result)
           }).catch((error) => {
            console.error('deleteFile', error)
           })
       }).catch((error) => {
         response.status(500).json({message: 'NG', result: error}).end()
       })
   }).catch((error) => {
     response.status(500).json({message: 'NG', result: error}).end()
   })
})


export const twTimeline = functions.https.onRequest((request, response) => {
  response = setheader(response)
  twitter.getTimeline('guest')
    .then((result) => {
      console.log('twTimeline', result)
      response.status(200).json({message: 'ok', result: result}).end()
    }).catch((error) => {
      console.error('twTimeline', error)
      response.status(500).json({message: 'NG', result: error}).end()
    })
})

export const test = functions.https.onCall((data, context) => {
  console.log('data', data)
  if (!context.auth) {
    throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
        'while authenticated.')
  }
  return {
    uid: '10',
    data: 'datadayo',
    context: context
  }
})

export const helloWorld = functions.https.onRequest((request, response) => {
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