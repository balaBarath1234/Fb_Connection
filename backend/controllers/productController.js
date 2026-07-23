import Product from "../models/productModel.js";

export const addProduct = async(req,res) => {
    try{
        const existingProduct = await Product.findOne({title:req.body.title})

        if(existingProduct){return res.json({message:"Product already exists"})}

        const newProduct = await Product.create(req.body)

        res.json({message:"Product added successfully",data:newProduct})
    }catch(error){
        res.json({message:error.message})
    }
}