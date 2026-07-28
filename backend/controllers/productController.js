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

export const getProductById = async (req,res) => {
    try {
        const {id} = req.params
        
        const product = await Product.findById(id)

        if(!product) {return res.json({msg:"No Product"})}

        res.json({data:product})
    } catch (error) {
        console.log(error)
        res.json({msg:error})
    }
}

export const updateProduct = async (req,res) => {
    try {

        console.log("c");
        
        const {id} = req.params

        const product = await Product.findById(id)

        if(!product) {return res.json({msg:"No Product"})}

        const updatedProduct = await Product.findByIdAndUpdate({_id:id},req.body)

        res.json({msg:"Updated Successfully",data:updatedProduct})
    } catch (error) {
        console.log(error)
        res.json({msg:error})
    }
}

export const deleteProduct = async(req,res) => {
    try {
        const {id} = req.params

        const product = await Product.findById(id)

        if(!product) {return res.json({msg:"No Product"})}

        await Product.findByIdAndDelete({_id:id})

        res.json({msg:"Deleted Successfully"})
    } catch (error) {
        res.json({msg:error})
    }
}