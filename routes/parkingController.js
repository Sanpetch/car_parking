const express = require("express");
const router = express.Router();
const parkingLotService = require("../services/parkingLotServices")




router.get('/parkingLots', async (req, res) => {
    try {
        let  parkingLots = await parkingLotService.findAll(req);
        console.log(parkingLots)
        res.json(parkingLots)
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

module.exports = router;