const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const roomRoute = require("./routes/room");
const serviceRoute = require("./routes/service");
const foodRoute = require("./routes/food");
const cartRoute = require("./routes/cart");
const reservationRoute = require("./routes/reservation");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");

dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DBConnection Successful!"))
    .catch((err) => {
        console.log(err);
    });

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/rooms", roomRoute);
app.use("/api/foods", foodRoute);
app.use("/api/services", serviceRoute);
app.use("/api/carts", cartRoute);
app.use("/api/reservations", reservationRoute);
app.use("/api/checkout", stripeRoute);

app.listen(process.env.PORT || 5000, ()=>{
    console.log("Backend server is running");
});


