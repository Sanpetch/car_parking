const express = require("express");
const router = express.Router();
const findById = require("../services/userServices")
const User = require('../model/user');
// const helloMiddleware = (req,res,next)=>{
//     console.log("hello")
// }

// router.get("/users",helloMiddleware,(req,res)=>{
//     res.send("Users")
// })
router.get('/users', async (req, res) => {
    const products = await User.find({});
    res.json(products);
  });


router.post("/users",(req,res)=>{
    res.send("created user")
})

router.get("/users/:userid",(req,res)=>{
    res.send(findById(req.params.userid))
})

module.exports = router;