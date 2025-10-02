const { default: mongoose } = require("mongoose")
const Mongoose = require("mongoose")

const postSchema = mongoose.Schema(
    {
        userId : { type : Mongoose.Schema.Types.ObjectId, ref: "users"},
        message : String,
        date :{type:Date, default : Date.now}
    }
)

var postModel = Mongoose.model("posts",postSchema)
module.exports = postModel