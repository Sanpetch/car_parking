const ParkingLot = require('../model/parkingLot');



const ParkingLotSerives = {


    async findAll(req){
        const parkingLots = await ParkingLot.find({});
        return parkingLots;
    },


    async updateParkingLot(req,res){
        const parkingLots = await ParkingLot.findByIdAndUpdate(req.params.id,req.body)
        return parkingLots
    }
    
    
}


module.exports = ParkingLotSerives;