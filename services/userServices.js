const User = require('../model/user');

const Users = {


    async findAll(req){
        const users = await User.find({});
        return users;
    },

    async login(req){
        const user = await User.findOne({ email: req.body.email })
        return user
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


module.exports = Users;