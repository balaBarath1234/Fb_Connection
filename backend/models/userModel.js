import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:{
        type:String,
        enum:["admin","users","staff"],
        default:"users"
    }
},{timestamps:true})

const Users = mongoose.model("users",userSchema)

export default Users