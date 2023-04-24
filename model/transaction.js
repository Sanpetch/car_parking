const mongoose = require('mongoose')
const moment = require('moment-timezone');
const Schema = mongoose.Schema;
const dateThailand = moment.tz(Date.now(), "Asia/Bangkok");


const TransactionSchema = new Schema({
    license_plate:{
        type:String,
        required:[true,"license_plate required"]
    },
    parking_no:{
        type:String,
        required:[true,"parking_no required"]
    },
    status:{
        type:String,
        required:[true,"status required"]
    },
    created_date: {
        type: Date,
        default: dateThailand
      }
    
});


const Transaction = mongoose.model('transaction',TransactionSchema,'transaction')
module.exports = Transaction;