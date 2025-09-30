const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

let app = express()

app.post("/",(req,res)=>{
    res.send("Hello")
})

app.listen(3030,()=>{
    console.log("Server Started")
})