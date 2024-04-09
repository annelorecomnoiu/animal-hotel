const mongoose = require("mongoose");
const moment = require("moment");

const ReservationSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        rooms: [
            { roomId: { type:String, required: true }, }
        ],
        foods: [
            { foodId: { type:String, required: true }, }
        ],
        services: [
            { serviceId: { type:String }, }
        ], 
        startDate: { type: String, default: moment().format("MM/DD/YYYY") },
        endDate: { type: String, default: moment().format("MM/DD/YYYY") },
        amount: { type:Number, required: true},
        billingDetails: { type:Object, required:true},
        status: { type:String, default: "pending" },
    },
    {timestamps: true }
);

module.exports = mongoose.model("Reservation", ReservationSchema)