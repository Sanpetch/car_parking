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

router.get('/parkingLots/findFirstAvailable', async (req, res) => {
  try {
      let  parkingLots = await parkingLotService.findFirstAvailableSlot(req);
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

router.get('/parkingLots/findSlotByLicensePlate/:id', async (req, res) => {
  try {
    console.log(req.params)
      let  parkingLots = await parkingLotService.findSlotByLicensePlate(req);
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


router.put("/parkingLots/:id",async (req,res)=>{
    try {
        let parkingLots = await parkingLotService.updateParkingLot(req)
        res.end('{"success" : "Updated parking lot Successfully", "status" : 200}');
      } catch (error) {
        res.json({error: {
              status: 500,
              message: error.message
            }
        });
      }
    
})

module.exports = router;