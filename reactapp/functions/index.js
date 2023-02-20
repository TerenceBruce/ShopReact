    const functions = require("firebase-functions");
    exports.createStripeCheckout= functions.https.onCall((data,context) => {
      const stripe = require('stripe')(functions.config().stripe.secret.key);
      const express = require('express');
      const app = express();
      app.use(express.static('public'));
      
      const YOUR_DOMAIN = 'http://localhost:3000';
      
      app.post('/create-checkout-session', async (req, res) => {
        const session = await stripe.checkout.sessions.create({
          line_items: [
            {
              // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
              price: '{{PRICE_ID}}',
            },
          ],
          mode: 'payment',
          success_url: `${YOUR_DOMAIN}?success=true`,
          cancel_url: `${YOUR_DOMAIN}?canceled=true`,
          automatic_tax: {enabled: true},
        });
      
        res.redirect(303, session.url);
      });
      
      app.listen(4242, () => console.log('Running on port 4242'));

    })
    