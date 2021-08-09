const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const app =  express();

dotenv.config();
app.use(express.json());
app.use(cors())

mongoose.connect(process.env.MONOGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
})
 const db = mongoose.connection;
 db.on("open", ()=>{
     console.log("database connected...");
 }).on("error", ()=>{
     console.log("connection error", error)})




app.get('/', (req, res) =>{
    res.send('am the server')
})

//define routes and it use
const authRoute = require("./routes/auth");
app.use("/auth", authRoute);



app.listen(4040, ()=>{
    console.log('server is running....');
})