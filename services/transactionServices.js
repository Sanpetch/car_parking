const Transaction = require('../model/transaction');

const Transactions = {


    async createTransaction(license_plate,parking_no,status){
        var transactionDetails = new Transaction({
            license_plate: license_plate,
            parking_no: parking_no,
            status:status
          });

         await transactionDetails.save()
         return  "success"
   
    },
    
}


module.exports = Transactions;