const ParkingLot = require('../model/parkingLot');



const ParkingLotSerives = {


    async findAll(req){
        const parkingLots = await ParkingLot.find({});
        console.log(parkingLots)
        return parkingLots;
    },

    async createUser(req){
        var userDetails = new User({
            name: req.body.name,
            email: req.body.email,
            license_plate:req.body.license_plate,
            password:req.body.password

          });

         await userDetails.save()
         return  "success"
   
    }
    
    
}


module.exports = ParkingLotSerives;