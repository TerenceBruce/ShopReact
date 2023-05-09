
// firebase deploy --only functions
const functions = require("firebase-functions");

// http request 1
exports.randomNumber = functions
.region("europe-west1")
.https.onRequest((request, response) => {
  const number = Math.round(Math.random() * 100);
  console.log(number);
  response.send(number.toString());
});

// http request 2
exports.toTheDojo = functions
.region("europe-west1")
.https.onRequest((request, response) => {
  response.redirect("https://www.google.co.uk");
});

exports.sayHello = functions
.region("europe-west1")
.https.onCall((data, context) => {
  return "hello,ninjas";
});
