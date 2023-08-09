// const { Schema, model, models, default: mongoose } = require("mongoose");
import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
        },
        price: {
            type: Number,
            required: true,
        },
        images: [{ type: String }],
        category: {
            type: mongoose.Types.ObjectId,
            ref: "Category",
        },
        properties: {
            type: Object,
        },
    },
    { timestamps: true }
);

export const Product = models.Product || model("Product", ProductSchema);