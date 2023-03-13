// const { response } = require("express");
const functions = require("firebase-functions");
const express = require("express");
const admin= require("firebase-admin")

admin.initializeApp(functions.config().firebase)
const app =express()
0
app.get("/")
exports.helloWorld = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!",{structuredData: true});
    response.send("Hello from Firebase!");
})