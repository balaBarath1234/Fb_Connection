import Product from "../models/productModel.js";

export const addProduct = async(req,res) => {
    try{
        const existingProduct = await Product.findOne({title:req.body.title})

        if(existingProduct){return res.json({message:"Product already exists"})}

        const newProduct = await Product.create(req.body)

        res.json({msg:"Product added successfully",data:newProduct})
    }catch(error){
        res.json({msg:error.message})
    }
}

export const getProducts = async(req,res) => {
    try {
        const products  = await Product.find()

        res.json({data:products,msg:"Products Recieved"})
    } catch (error) {
        res.json({msg:error})
    }
}