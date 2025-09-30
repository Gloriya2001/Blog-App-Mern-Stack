const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const dotenv = require("dotenv")
dotenv.config()

const userModel = require("./models/users")

let app = express()

app.use(express.json())
app.use(cors())


mongoose.connect(process.env.MONGO_URI).then(()=>console.log("DB connected successfully")).catch(err=>console.log("An error occured : ",err))

app.post("/",(req,res)=>{
    res.send("Hello")
    //console.log("connection ok for api /")
})


//user signUp
app.post("/signUp",async(req,res)=>{
    let input = req.body
    let hashedPassword = bcrypt.hashSync(req.body.password,10)
    console.log(hashedPassword)
    req.body.password = hashedPassword
    console.log(input)

    userModel.find({email:req.body.email}).then(
        (items)=>{
            if (items.length>0) {
                res.json({"status":"already exist"})
            } else {
                let result = new userModel(input)
                result.save()
                res.json({"status":"success"})
            }
        }
    ).catch(
        (error)=>{res.send(error)}
    )
})

// user signIn

app.post("/signIn",(req,res))


app.listen(3030,()=>{
    console.log("Server Started")
})