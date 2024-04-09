const router = require("express").Router();
const { verifyTokenAndAdmin } = require("./verifyToken");
const Food = require("../models/Food");

//CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newFood = new Food(req.body);
    try{
        const savedFood = await newFood.save();
        return res.status(200).json(savedFood);
    }catch(err){
        return res.status(500).json(err);
    }
});

//UPDATE 
router.put("/:id", verifyTokenAndAdmin, async (req,res)=>{
    try{
        const updatedFood = await Food.findByIdAndUpdate(
            req.params.id, 
            {
                $set: req.body
            },
             { new: true }
        );
        return res.status(200).json(updatedFood);
    }catch(err){
        return res.status(500).json(err);
    }
});



//DELETE 
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try{
        await Food.findByIdAndDelete(req.params.id);
        return res.status(200).json("Food has been deleted...");
    }catch(err){
        return res.status(500).json(err);
    }
});


//GET FOOD
router.get("/find/:id", async (req, res) => {
    try{
        const food = await Food.findById(req.params.id);
        return res.status(200).json(food);
    }catch(err){
        return res.status(500).json(err);
    }
});


//GET ALL FOODS
router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try{
        let foods;

        if(qNew) {
            foods = await Food.find().sort({ createdAt: -1 }).limit(5);
        } else if (qCategory) {
            foods = await Food.find({
                categories: {
                    $in: [qCategory],
            },
        });
        } else {
            foods = await Food.find();
        }

        return res.status(200).json(foods);
    }catch(err){
        return res.status(500).json(err);
    }
});


module.exports = router;