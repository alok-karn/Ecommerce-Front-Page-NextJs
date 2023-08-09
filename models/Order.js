const { models, model } = require("mongoose");
const { Schema } = require("mongoose");

const OrderSchema = new Schema(
    {
        line_items: Object,
        name: String,
        email: String,
        city: String,
        postalCode: String,
        streetAddress: String,
        country: String,
        paid: { type: Boolean },
    },
    { timestamps: true }
);

export const Order = models?.Order || model("Order", OrderSchema);
