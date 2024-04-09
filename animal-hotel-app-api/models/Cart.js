const mongoose = require("mongoose");
const moment = require("moment");

const CartSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
        rooms: [
            {
            nrOfPets: { type:Number, default: 1},
            categories: { type: Array, default : [] },
            roomId: {type:String}
            }
        ],
        foods: [
            {
            categories: { type: Array, default : [] },
            categoryMatch: { type: Boolean, default: false },
            foodId: {type:String}
            }
        ],
        services: [
            {
            categories: { type: Array, default : [] },
            categoryMatch: { type: Boolean, default: false },
            serviceId: {type:String},
            nrOfServices: { type:Number, default: 1 }
            }
        ], 
        total: { type: Number, default:0 },
        startDate: { type: String, default: moment().format("MM/DD/YYYY") },
        endDate: { type: String, default: moment().format("MM/DD/YYYY") },
        nrOfDays: { type: Number, default: 1}
    },
    {timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema)