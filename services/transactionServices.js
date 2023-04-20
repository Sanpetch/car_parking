const Transaction = require('../model/transaction');

const Transactions = {


    async createTransaction(req){
        var transactionDetails = new Transaction({
            license_plate: req.body.license_plate
           
          });

         await transactionDetails.save()
         return  "success"
   
    }
    
    
}


module.exports = Transactions;