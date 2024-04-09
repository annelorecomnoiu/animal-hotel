const router = require("express").Router();
const { verifyToken, verifyTokenAndAdmin } = require("./verifyToken");
const Room = require("../models/Room");


//CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newRoom = new Room(req.body);
    try{
        const savedRoom = await newRoom.save();
        return res.status(200).json(savedRoom);
    }catch(err){
        return res.status(500).json(err);
    }
});


//UPDATE 
router.put("/:id", verifyToken, async (req,res)=>{
    try{
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id, 
            {
                $set: req.body
            },
             { new: true }
        );
        return res.status(200).json(updatedRoom);
    }catch(err){
        return res.status(500).json(err);
    }
});



//DELETE 
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try{
        await Room.findByIdAndDelete(req.params.id);
        return res.status(200).json("Room has been deleted...");
    }catch(err){
        return res.status(500).json(err);
    }
});


//GET ROOM
router.get("/find/:id", async (req, res) => {
    try{
        const room = await Room.findById(req.params.id);
        return res.status(200).json(room);
    }catch(err){
        return res.status(500).json(err);
    }
});


//GET ALL ROOMS
router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try{
        let rooms;

        if(qNew) {
            rooms = await Room.find().sort({ createdAt: -1 }).limit(5);
        } else if (qCategory) {
            rooms = await Room.find({
                categories: {
                    $in: [qCategory],
            },
        });
        } else {
            rooms = await Room.find();
        }

        return res.status(200).json(rooms);
    }catch(err){
        return res.status(500).json(err);
    }
});


module.exports = router;