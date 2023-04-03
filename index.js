const express = require("express");
const app = express();
const userRouter = require("./routes/userController")
const parkingRouter = require("./routes/parkingController")
const variables = require("./config/variables")
const mongoose = require('./config/mongoose')
const PORT = process.env.PORT

mongoose.Promis = global.Promise;

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(userRouter)
app.use(parkingRouter)

app.get("/",(req,res)=>{
    res.send("Start Car Parking")
})





app.listen(PORT);