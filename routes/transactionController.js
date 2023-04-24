const express = require("express");
const router = express.Router();
const transactionServices = require("../services/transactionServices")
const parkingLotService = require("../services/parkingLotServices")


router.post('/transaction/checkin', async(req, res) => {
    try {
        // console.log(req.body)
        const parkingAvailable = await parkingLotService.findFirstAvailableSlot().then((resultParking)=>{
          if(resultParking === null){
            return res.json(response = {
                  status  : 200,
                  message : 'Parking is not Available'
                  
                })
                  
          }else{
             transactionServices.createTransaction(req.body.license_plate,resultParking.parking_no,req.body.status).then((result)=>{
              
            if('success' == result){
               var response = {
                  status  : 200,
                  message : 'Create Transaction Success'
          
               }
            res.json(response)
           }
             }).then(_=>{
              var s = {
                "license_plate": req.body.license_plate,
                "is_available":false
              }
              console.log(s)
              parkingLotService.updateParkingLotById(resultParking._id.valueOf(),s)
             })
          }
        })
    } catch (error) {
      res.status(500).json({ error: {
          message: error.message
        }
    });
    }
  }),


  router.post('/transaction/checkout', async(req, res) => {
    try {
        
        const parkingAvailable = await transactionServices.createTransaction(req.body.license_plate,req.body.parking_no,req.body.status)
        .then((result)=>{
              
            if('success' == result){
               var response = {
                  status  : 200,
                  message : 'Transaction Success'
          
               }
            res.json(response)
           }
             }).then(_=>{
              var s = {
                "license_plate": "",
                "is_available":true
              }
              
              parkingLotService.updateParkingLotById(req.body.parking_id,s)
             })
          
     
    } catch (error) {
      res.status(500).json({ error: {
          message: error.message
        }
    });
    }
  },
  
)

module.exports = router;