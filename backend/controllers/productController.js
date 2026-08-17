import Product from "../models/productModel.js";
import path from "path"
import fs, { existsSync } from "fs"

export const addProduct = async(req,res) => {
    try{
        const existingProduct = await Product.findOne({title:req.body.title})

        if(existingProduct){return res.json({message:"Product already exists"})}

        const mainImage = req.files.mainImage[0].filename

        const subImages = req.files.subImages.map(file => file.filename)

        const newProduct = await Product.create({...req.body,mainImage,subImages})

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
        const {id} = req.params

        const product = await Product.findById(id)

        if(!product) {return res.json({msg:"No Product"})}

        const updateData = {...req.body}

        if(req.files?.mainImage){
            if (product?.mainImage){
                const oldMainpath = path.join(process.cwd(),"uploads",product?.mainImage)
                if(fs.existsSync(oldMainpath)){
                    fs.unlinkSync(oldMainpath)
                }
            }
            updateData.mainImage = req.files.mainImage[0].filename
        }

        if(req.files?.subImages){
            if(product?.subImages.length){
                for (let image of product?.subImages){
                    const oldSubpath = path.join(process.cwd(),"uploads",image)
                    if(fs.existsSync(oldSubpath)){
                        fs.unlinkSync(oldSubpath)
                    }
                }
            }
            updateData.subImages = req.files?.subImages.map(file => file.filename)
        }
        const updatedProduct = await Product.findByIdAndUpdate({_id:id},updateData)

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

        const oldMainPath = path.join(process.cwd(),"uploads",product?.mainImage)
        if(existsSync(oldMainPath)){
            fs.unlinkSync(oldMainPath)
        }

        for (let image of product?.subImages){
            const oldSubPath = path.join(process.cwd(),"uploads",image)
            if(fs.existsSync(oldSubPath)){
                fs.unlinkSync(oldSubPath)
            }
        }

        await Product.findByIdAndDelete({_id:id})

        res.json({msg:"Deleted Successfully"})
    } catch (error) {
        res.json({msg:error})
    }
}