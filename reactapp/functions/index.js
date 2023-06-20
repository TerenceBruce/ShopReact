// const express = require("express");
// const app = express();
// const cors = require("cors")({origin: true});
// app.use(cors);
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const app = express();

// Allow CORS
app.use(cors({origin: true}));

// Your function routes and code...

// exports.myFunction = functions.https.onRequest(app);
exports.myFunction = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
  });
// const stripe = require("stripe")("sk_test_2VPEZSPoAZS3r3ubs35eeEGh");

// const functions = require('firebase-functions');
// const admin = require('firebase-admin');
// admin.initializeApp(functions.config().firebase);
// const express = require('express');
// const cors = require('cors')({origin: true});
// const app = express();

// function charge(req, res) {
//   const body = JSON.parse(req.body);
//   const token = body.id;
//   const amount = 200;
//   const currency = "usd";

//   // Charge card
//   stripe.charges.create({
//   amount,
//   currency,
//   description: 'Firebase Example',
//   source: token,
//   }).then(charge => {
//   send(res, 200, {
//   message: 'Success',
//   charge,
//   });
//   }).catch(err => {
//   console.log(err);
//   send(res, 500, {
//   error: err.message,
//   });
//   });
// }

// function send(res, code, body) {
//   res.send(
//   statusCode: code,
//   headers: {'Access-Control-Allow-Origin': '*'},
//   body: JSON.stringify(body),
//   });
// }

// app.use(cors);
// app.post('/', (req, res) => {
//   try {
//   charge(req, res);
//   } catch(e) {
//   console.log(e);
//   send(res, 500, {
//   error:
// `The server received an unexpected error.
// Please try ag
// ain and contact the site admin if the error persists.`,
//   });
//   }
// });

// exports.stripePayment = functions.https.onRequest(app);
