const router = require("express").Router();
const { verifyTokenAndAdmin } = require("./verifyToken");
const Service = require("../models/Service");


//CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newService = new Service(req.body);
    try{
        const savedService = await newService.save();
        return res.status(200).json(savedService);
    }catch(err){
        return res.status(500).json(err);
    }
});

//UPDATE 
router.put("/:id", verifyTokenAndAdmin, async (req,res)=>{
    try{
        const updatedService = await Service.findByIdAndUpdate(
            req.params.id, 
            {
                $set: req.body
            },
             { new: true }
        );
        return res.status(200).json(updatedService);
    }catch(err){
        return res.status(500).json(err);
    }
});



//DELETE 
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try{
        await Service.findByIdAndDelete(req.params.id);
        return res.status(200).json("Service has been deleted...");
    }catch(err){
        return res.status(500).json(err);
    }
});


//GET SERVICE
router.get("/find/:id", async (req, res) => {
    try{
        const service = await Service.findById(req.params.id);
        return res.status(200).json(service);
    }catch(err){
        return res.status(500).json(err);
    }
});


//GET ALL SERVICES
router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try{
        let services;

        if(qNew) {
            services = await Service.find().sort({ createdAt: -1 }).limit(5);
        } else if (qCategory) {
            services = await Service.find({
                categories: {
                    $in: [qCategory],
            },
        });
        } else {
            services = await Service.find();
        }

        return res.status(200).json(services);
    }catch(err){
        return res.status(500).json(err);
    }
});


module.exports = router;