"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const twitterModel_1 = require("./model/twitter/twitterModel");
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
let twitter = new twitterModel_1.default();
/*
  HTTPS Callable functions must be called using the POST method,
  the Content-Type must be application/json or application/json; charset=utf-8,
  and the body must contain a field called data for the data to be passed to the method.
  https://firebase.google.com/docs/functions/callable-reference
*/
exports.tweet = functions.https.onCall((data, context) => {
    console.log('tweet');
    twitter.tweet('test tweet dayo')
        .then((result) => {
        console.log('tweetRequest', result);
    }).catch((error) => {
        console.error('tweetRequest', error);
    });
});
exports.tweetRequest = functions.https.onRequest((request, response) => {
    response = setheader(response);
    twitter.tweet('test tweet dayo')
        .then((result) => {
        console.log('tweetRequest', result);
        response.status(200).json({ message: 'ok', result: result }).end();
    }).catch((error) => {
        console.error('tweetRequest', error);
        response.status(500).json({ message: 'NG', result: error }).end();
    });
});
exports.twTimeline = functions.https.onRequest((request, response) => {
    response = setheader(response);
    twitter.getTimeline('guest')
        .then((result) => {
        console.log('twTimeline', result);
        response.status(200).json({ message: 'ok', result: result }).end();
    }).catch((error) => {
        console.error('twTimeline', error);
        response.status(500).json({ message: 'NG', result: error }).end();
    });
});
exports.test = functions.https.onCall((data, context) => {
    console.log('data', data);
    if (!context.auth) {
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
            'while authenticated.');
    }
    return {
        uid: '10',
        data: 'datadayo',
        context: context
    };
});
exports.helloWorld = functions.https.onRequest((request, response) => {
    response = setheader(response);
    console.log(request.body);
    response.status(200).json({ result: 'ok' }).end();
});
function setheader(response) {
    response.header('Content-Type', 'application/json');
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Credentials', 'true');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-Access-Token", Authorization');
    return response;
}
//# sourceMappingURL=index.js.map