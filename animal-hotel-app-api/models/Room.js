const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        img: { type: String, required: true },
        categories: { type: Array },
        price: { type: Number, required: true },
        inStock: { type:Boolean, default: true },
        availability: { type: [[Date]], default: [] },
    },
    {timestamps: true }
);

module.exports = mongoose.model("Room", RoomSchema)