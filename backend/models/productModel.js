import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    count:{
        type:Number,
        required:true,
        default:1
    }
},{
    timestamps:true
})

const Product = mongoose.model("products",productsSchema)

export default Product