const express = require("express");
const router = express.Router();
const userService = require("../services/userServices")



// const helloMiddleware = (req,res,next)=>{
//     console.log("hello")
// }

// router.get("/users",helloMiddleware,(req,res)=>{
//     res.send("Users")
// })
router.get('/users', async (req, res) => {
    try {
        let  users = await userService.findAll(req);
        console.log("asdfasdf"+users)
        res.json(users)
      } catch (error) {
        res.json({
            error: {
              status: 500,
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
              status: 500,
              message: error.message
            }
        });
      }
    // let  users = await userService.login(req);
    // res.send(users)
})

router.post('/user/create', async(req, res) => {
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
        status: 500,
        message: error.message
      }
  });
  }
})

router.get("/users/:userid",(req,res)=>{
    res.send(findById(req.params.userid))
})

module.exports = router;