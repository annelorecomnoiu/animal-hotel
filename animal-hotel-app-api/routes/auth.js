const router = require("express").Router();
const User = require("../models/User");
const Cart = require("../models/Cart");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
    const newUser = new User({
        firstName: req.body.firstName[0],
        lastName: req.body.lastName[0],
        username: req.body.username[0],
        email: req.body.email[0],
        password: CryptoJS.AES.encrypt(
            req.body.password[0],
            process.env.PASS_SEC
        ).toString(),
    });
    try{
        const savedUser = await newUser.save();

        await Cart.create({ user: savedUser._id });
        return res.status(201).json(savedUser);
    }catch(err){
      console.log(err);
        return res.status(500).json(err);
    }
    
});


//LOGIN
router.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username }).maxTimeMS(20000);;
      if (!user) {
        return res.status(401).json("Wrong credentials!");
      }
      const hashedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.PASS_SEC
      );
      const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
      if (originalPassword !== req.body.password) {
        return res.status(401).json("Wrong credentials!");
      }
      const accessToken = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SEC,
        { expiresIn: "3d" }
      );

      
      const { password, ...others } = user._doc;
      return res.status(200).json({ ...others, accessToken });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });
module.exports = router;