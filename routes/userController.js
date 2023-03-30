const express = require("express");
const router = express.Router();
const userService = require("../services/userServices")
const User = require('../model/user');


// const helloMiddleware = (req,res,next)=>{
//     console.log("hello")
// }

// router.get("/users",helloMiddleware,(req,res)=>{
//     res.send("Users")
// })
router.get('/users', async (req, res) => {
    try {
        let  users = await userService.findAll(req);
        res.json(users)
      } catch (error) {
        res.json({
            error: {
              status: statusCode,
              message: error.message
            }
        });
      }
});


router.post("/user/login",async (req,res)=>{
    try {
        let users = await userService.login(req);
        res.json(users)
        // res.end('{"success" : "Updated Successfully", "status" : 200}');
      } catch (error) {
        res.json({error: {
              status: statusCode,
              message: error.message
            }
        });
      }
    // let  users = await userService.login(req);
    // res.send(users)
})

router.post('/users/create', async(req, res) => {
  try {
    const result = await userService.createUser(req)
    if('success' == result){
      var response = {
        status  : 200,
        success : 'Create User Success'}
        res.json(response)
    }

  } catch (error) {
    res.json({ error: {
        status: statusCode,
        message: error.message
      }
  });
  }
})

router.get("/users/:userid",(req,res)=>{
    res.send(findById(req.params.userid))
})

module.exports = router;