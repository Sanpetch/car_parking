const express = require("express");
const app = express();
const userRouter = require("./routes/userController")
const variables = require("./config/variables")
const mongoose = require('./config/mongoose')
const PORT = process.env.PORT

app.use(express.json())
app.use(userRouter)


app.get("/",(req,res)=>{
    res.send("Start Car Parking")
})





app.listen(PORT);