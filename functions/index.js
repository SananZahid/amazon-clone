const functions = require("firebase-functions");
//installed express cors stripe
const express = require("express");
const cors = require("cors");
const { response } = require("express");
const { default: Stripe } = require("stripe");
//Generate new secret key from stripe/apikeys
const stripe = require("stripe")("sk_test_51HPvU9DFg5koCdLGeOEiFvwHat4v8eMjX6SY0YCwxPBQBUPhKy1fPVhiSM5cQtgW7QBG9ydQcXnW57TDxVE2f3H000HSfmEQZF");

// API

// - APP CONFIG
const app = express();
// const port = 3000;
// - MIDDLEWARES
app.use(cors({ origin: true}));
app.use(express.json());


// - API ROUTES
app.get("/", (request, response) => { 
    response.status(200).send("Hello Word")
});

app.post("/payments/create", async (request, response) => {
    const total = request.query.total;

    console.log("Payment request recieved>>>> ", total);

    // Stripe part here
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
    });
    // response 201 for created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });
})

// - LISTEN COMMAND
exports.api = functions.https.onRequest(app);





{/*firebase emulators:start*/}