import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import { buffer } from "micro";
const endpointSecret =
    "whsec_b70f847411b90520965d14c1befc75ec5e26ae9384e741308352c0c3e1f7083f";

export default async function handler(req, res) {
    await mongooseConnect();

    const sig = req.headers["stripe-signature"];

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            await buffer(req),
            sig,
            endpointSecret
        );
    } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    switch (event.type) {
        case "checkout.session.completed":
            const data = event.data.object;
            // console.log("PaymentIntent was successful!");
            const orderId = data.metadata.orderId;
            const paid = data.payment_status === "paid";
            // console.log(data);

            if (orderId && paid) {
                await Order.findByIdAndUpdate(orderId, { paid: true });
            }
            break;

        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.status(200).send("ok");
}

export const config = {
    api: { bodyParser: false },
};

//poetic-entice-modest-bright
//account id acct_1NcMr1SJiC3U2w3u
