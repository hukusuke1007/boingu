import * as functions from 'firebase-functions'
import * as firebase from 'firebase-admin'
// import twitterModel from './model/twitter/twitterModel'
// import storageModel from './model/firebase/storageModel'
import shareController from './controller/shareController'
import * as express from 'express'
import * as cors from 'cors'
firebase.initializeApp()
// let twitter = new twitterModel()

const app = express()
app.use(cors({ origin: true })) // Automatically allow cross-origin requests
// app.use(myMiddleware); // Add middleware to authenticate requests

// build multiple CRUD interfaces:
app.post('/tweetWithMedia', (req, res) => {
  let message:string = req.body.message
  let filenamePath:string = req.body.filename
  console.log('request.body', req.body, message, filenamePath)
  let controller = new shareController()
  controller.shareMediaToSNS(message, filenamePath)
   .then((result) => {
     console.log('tweetWithMedia', result)
     res.status(200).json({message: 'OK', result: result}).end()
   }).catch((error) => {
     console.error('tweetWithMedia', error)
     res.status(500).json({message: 'OK', result: error}).end()
   })
})

/* 
  HTTPS Callable functions must be called using the POST method,
  the Content-Type must be application/json or application/json; charset=utf-8,
  and the body must contain a field called data for the data to be passed to the method.
  https://firebase.google.com/docs/functions/callable-reference
*/
/*
const tweet = functions.https.onCall((data, context) => {
  console.log('tweet')
  twitter.tweet('test tweet dayo')
    .then((result) => {
      console.log('tweetRequest', result)
    }).catch((error) => {
      console.error('tweetRequest', error)
    })
})

const tweetRequest = functions.https.onRequest((request, response) => {
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

const tweetWithMedia = functions.https.onRequest((request, response) => {
  response = setheader(response)
  let message:string = request.body.message
  let filenamePath:string = request.body.filename
  console.log('request.body', request.body, message, filenamePath)
  // response.status(200).json({message: 'share'})
  let controller = new shareController()
  controller.shareMediaToSNS(message, filenamePath)
   .then((result) => {
     console.log('tweetWithMedia', result)
     response.status(200).json({message: 'OK', result: result}).end()
   }).catch((error) => {
     console.error('tweetWithMedia', error)
     response.status(500).json({message: 'OK', result: error}).end()
   })
})

const twTimeline = functions.https.onRequest((request, response) => {
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
*/

const test1 = functions.https.onCall((data, context) => {
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

const test2 = functions.https.onRequest((request, response) => {
  response = setheader(response)
  console.log(request.body)
  response.status(200).json({result: 'ok'}).end()
})

const api = functions.https.onRequest(app)
module.exports = { 
  api,
  test1,
  test2
}

/* local function */
function setheader(response) {
  response.header('Content-Type','application/json')
  // response.header('Content-Type', 'text/plain')
  response.header('Access-Control-Allow-Origin', '*')
  response.header('Access-Control-Allow-Credentials', 'true')
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-Access-Token", Authorization')
  return response
}