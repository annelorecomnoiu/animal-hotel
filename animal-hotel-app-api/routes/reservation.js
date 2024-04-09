const router = require("express").Router();
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const Reservation = require("../models/Reservation");

//CREATE
router.post("/", async (req, res) => {
    const newReservation = new Reservation(req.body);
    try{
        const savedReservation = await newReservation.save();
        return res.status(200).json(savedReservation);
    }catch(err){
        return res.status(500).json(err);
    }
});

//UPDATE 
router.put("/:id", verifyTokenAndAdmin, async (req,res)=>{
    try{
        const updatedReservation = await Reservation.findByIdAndUpdate(
            req.params.id, 
            {
                $set: req.body
            },
             { new: true }
        );
        return res.status(200).json(updatedReservation);
    }catch(err){
        return res.status(500).json(err);
    }
});



//DELETE 
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try{
        await Reservation.findByIdAndDelete(req.params.id);
        return res.status(200).json("Reservation has been deleted...");
    }catch(err){
        return res.status(500).json(err);
    }
});


//GET USER RESERVATIONS
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try{
        const reservations = await Reservation.find({ userId: req.params.userId });
        return res.status(200).json(reservations);
    }catch(err){
        return res.status(500).json(err);
    }
});


//GET ALL 
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    
    try{
        const reservations = await Reservation.find();
        return res.status(200).json(reservations);
    }catch(err){
        return res.status(500).json(err);
    }
});


module.exports = router;