const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        img: { type: String, required: true },
        categories: { type: Array },
        price: { type: Number, required: true },
        nrOfServices: { type: Number, default: 1},
        inStock: { type:Boolean, default: true },
    },
    {timestamps: true }
);

module.exports = mongoose.model("Service", ServiceSchema)