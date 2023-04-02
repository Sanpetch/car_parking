const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ParkingLotSchema = new Schema({
    parking_no:{
        type:String,
        required:[true,"parking no required"]
    },
    is_available:{
        type:Boolean,
        required:[true,"is_available required"]
    },
   
});

const ParkingLot = mongoose.model('parkinglot',ParkingLotSchema,'parking_lot')
module.exports = ParkingLot;