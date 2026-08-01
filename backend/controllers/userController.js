import Users from "../models/userModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const regiterUser = async (req,res) => {
    try {
        const existingUser = await Users.findOne({email:req.body.email})

        if(existingUser) {return res.json("User Found")}

        const hashedPassword = await bcrypt.hash(req.body.password,10)

        const newUser = await Users.create({...req.body,password:hashedPassword})

        res.json({data:newUser,msg:"Registered succesfully"})
    } catch (error) {
        console.log(error)
        res.json({error,msg:"Registration Failed"})
    }
}

export const loginUser = async (req,res) => {
    try {
        const existingUser = await Users.findOne({email:req.body.email})

        if(!existingUser) {return res.status(404).json("No User Found")}

        const match = await bcrypt.compare(req.body.password,existingUser.password)

        if(!match) {return res.status(401).json("Invalid Paasword")}

        const token = jwt.sign({id:existingUser._id,role:existingUser.role},process.env.JWT_SECRET,{expiresIn:"1h"})

        res.cookie("token",token,{httpOnly:true,secure:false,sameSite:"lax",maxAge: 24 * 60 * 60 * 1000})

        console.log(token);
        
        res.json({msg:"Login succesfully",data:existingUser.role})
    } catch (error) {
        console.log(error)
        res.json({error,msg:"Login Failed"})
    }
}

export const getUser = async (req,res) => {
    try {
        const user = await Users.findById(req.user.id).select("-password")
        res.json({data:user})

    } catch (error) {
        console.log(error)
        res.json(error)
    }
}

export const logoutUser = async (req,res) => {
    try {
        res.clearCookie("token")
        res.json({msg:"Logout Successfully"})
    } catch (error) {
        console.log(error)
        res.json(error)
    }
}

export const getStaff = async(req,res) =>{
    try {
        const staff = await Users.find({role:"staff"}).select("-password")

        res.json({data:staff})
    } catch (error) {
        console.log(error);
        res.json({msg:error})
    }
}

export const updateUser = async (req,res) => {
    try {
        const {id} = req.params
        console.log(req.body);
    
        const user = await Users.findByIdAndUpdate({_id:id},req.body)

        res.json({msg:"Updated Successfully",data:user})
    } catch (error) {
        console.log(error);
        res.json({msg:error})
    }
}

export const getuserById = async (req,res) => {
    try {
        const {id} = req.params
        
        const user = await Users.findById({_id:id})

        if(!user) {return res.json({msg:"No User Found"})}

        res.json({data:user})
    } catch (error) {
        res.json({msg:error})
    }
}

export const deleteUser = async(req,res) => {
    try {
        const {id} = req.params

        const user = await Users.findById({_id:id})
        if(!user){return res.json({msg:"No User Found"})}

        await Users.findByIdAndDelete(id)

        res.json({msg:"Deleted Successfully"})
    } catch (error) {
        res.json({msg:error})
    }
}