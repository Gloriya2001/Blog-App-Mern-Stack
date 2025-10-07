// Importing required packages
const express = require("express")          // Web framework to create APIs
const mongoose = require("mongoose")        // MongoDB object modeling tool
const cors = require("cors")                // Allows cross-origin requests (frontend <-> backend)
const bcrypt = require("bcrypt")            // For hashing and comparing passwords
const jwt = require("jsonwebtoken")         // For generating JSON Web Tokens (authentication)

// Load environment variables from .env file
const dotenv = require("dotenv")
dotenv.config()

// Import the user model (MongoDB schema for users)
const userModel = require("./models/users")

// Import the post model (MongoDB schema for posts)
const postModel = require("./models/posts")

// Create an Express app instance
let app = express()

// Middleware
app.use(express.json())  // Parse incoming JSON requests
app.use(cors())          // Allow cross-origin requests (important for frontend integration)


// Connect to MongoDB using URI from .env file
mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("DB connected successfully"))
    .catch(err=>console.log("An error occured : ",err))


// Test route - Just to check if API is running
app.post("/",(req,res)=>{
    res.send("Hello")
    //console.log("connection ok for api /")
})


// -------------------- USER SIGNUP --------------------
app.post("/signUp", async (req,res) => {
    try {
        let input = req.body

        // Hash the user password before saving (for security)
        let hashedPassword = bcrypt.hashSync(req.body.password, 10) // 10 = salt rounds
        req.body.password = hashedPassword  // Replace plain password with hashed version

        // Check if user already exists with given email
        userModel.find({ email: req.body.email }).then(
            (items) => {
                if (items.length > 0) {
                    // If email already exists in DB
                    res.json({ "status": "already exist" })
                } else {
                    // Create new user with input data
                    let result = new userModel(input)
                    result.save()  // Save user in DB
                    res.json({ "status": "success" })
                }
            }
        ).catch(
            (error) => { res.send(error) } // If any DB error occurs
        )
    } catch (err) {
        // Catch unexpected errors
        res.json({ status: "error", errorMessage: err.message })
    }
})


// -------------------- USER SIGNIN --------------------
app.post("/signIn", async (req, res) => {
    try {
        const { email, password } = req.body;  // Extract login details from request body

        // Check if user exists in DB
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ status: "user not found" }); // No account with this email
        }

        // Validate entered password with hashed password in DB
        const passValidate = bcrypt.compareSync(password, user.password);
        if (!passValidate) {
            return res.json({ status: "incorrect password" }); // Wrong password
        }

        // Generate JWT token (used for authentication in frontend)
        jwt.sign(
            { email },               // Payload (what to store in token)
            process.env.JWT_SECRET,              // Secret key (should be kept in .env)
            { expiresIn: "1d" },     // Token expiration (1 day)
            (error, token) => {
                if (error) {
                    return res.json({ status: "error", errorMessage: error });
                }
                // If successful, send token + userId back to frontend
                res.json({
                    status: "success",
                    token: token,
                    userId: user._id
                });
            }
        );

    } catch (err) {
        res.json({ status: "error", errorMessage: err.message })
    }
})

// -------------------- CREATE A POST --------------------
app.post("/create", async (req, res) => {

    // get input data from request body
    let input = req.body;

    // extract token from request headers (custom header "token")
    let token = req.headers.token;

    // verify the token using JWT and secret key
    jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {

        // if token is valid and contains user email
        if (decoded && decoded.email) {

            // create a new post document using input data , save it and send success response
            let result = new postModel(input);
            await result.save();
            res.json({ "status": "success" });

        } else {
            // if token is invalid, expired, or missing required payload
            res.json({ "status": "invalid authentication" });
        }
    });
});

//view all post

app.post("/viewAll",(req,res)=>{

    let token=req.headers.token

    jwt.verify(token, process.env.JWT_SECRET, async(error,decoded)=>{

        if (decoded && decoded.email) {
            
            postModel.find().then(
                (item)=>{
                    res.json(item)
                }
            ).catch(
                (error)=>{
                    res.json({"status":error})
                }
            )
        } else {
            res.json({"status":"invalid authentication"})
        }
    })
})

// Start the server on port 3030
app.listen(3030, () => {
    console.log("Server Started")
})
