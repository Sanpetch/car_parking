const Transaction = require('../model/transaction');

const Transactions = {


    async createTransaction(req,parking_no){
        var transactionDetails = new Transaction({
            license_plate: req.body.license_plate,
            parking_no: parking_no,
            status:req.body.status
          });

         await transactionDetails.save()
         return  "success"
   
    }
    
    
}


module.exports = Transactions;