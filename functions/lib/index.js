"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
// import Utility from './utility'
// let util = new Utility()
let router = express.Router();
const options = {
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
    credentials: true,
    methods: "GET,POST",
    origin: true,
    preflightContinue: false
};
router.use(cors(options));
router.options("*", cors(options));
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.header('Content-Type', 'application/json');
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Content-Type');
    response.status(200).send("Hello world!");
});
//# sourceMappingURL=index.js.map