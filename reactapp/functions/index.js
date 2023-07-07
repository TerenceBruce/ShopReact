const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: 'http://localhost:3000'})
//replace 'http://localhost:3000' with the actual origin that your users will be accessing your application from. If you have multiple origins, the cors library also accepts an array of origins.

admin.initializeApp();

//exports.getAllBasketItems = functions.https.onRequest((request, response) => {
    exports.helloWorld = functions.https.onRequest((request, response) => {    
        cors(request, response, async () => {
            try {
            //exports.helloWorld = functions.https.onRequest((request, response) => {
                response.send("Hello, World!");
              //});
            // const snapshot = await admin.firestore().collection('Basket').get();
            // let basketItems = [];
            // snapshot.forEach(doc => {
            //     let id = doc.id;
            //     let data = doc.data();
            //     basketItems.push({ id, ...data });
            // });
            // response.status(200).send(JSON.stringify(basketItems));
            } catch (error) {
                console.log(error);
                response.status(500).send(error);
            }
        });
    });