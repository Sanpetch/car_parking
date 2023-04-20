const express = require("express");
const router = express.Router();
const transactionServices = require("../services/transactionServices")



router.post('/transaction', async(req, res) => {
    try {
        console.log(req.body)
        const result = await transactionServices.createTransaction(req)
      if('success' == result){
        var response = {
          status  : 200,
          message : 'Create User Success'
          
        }
          res.json(response)
      }
  
    } catch (error) {
      res.status(500).json({ error: {
          message: error.message
        }
    });
    }
  })

module.exports = router;