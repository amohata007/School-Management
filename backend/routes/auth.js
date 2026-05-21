const express = require("express");
const { UserModel } = require("../models/User.model");
const userRoute = express.Router();
const bcrypt = require("bcrypt");
const validator = require("validator")
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({path: "./config/.env"});

userRoute.post("/signup", async (req,res)=>{
    try{

        const {name,email,password} = req.body;
        if(!name||!email||!password){
            return res.status(400).json({status:"N",message:"Please enter required field..!!"})
        }

        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({
                status: "N",
                message: "Please enter strong password..!!"
            });
        }

        const passwordHash = await bcrypt.hash(password,10);
        const userData = new UserModel({
            name,email,password:passwordHash
        })
        await userData.save();
        res.status(201).json({status:"Y",message:"User saved successfully..!!"})
    }
    catch(err){
        res.status(500).json({status:"N",message:"Something went wrong"+err.message})
    }
})

userRoute.post("/login", async(req,res)=>{
    try{
        const {email,password} = req.body;
        const isEmailExist = await UserModel.findOne({email:email});
        if(!isEmailExist){
            return res.status(400).json({status:"N",message:"Invalid crendentials..!!"})
        }
        const fetchPassword = isEmailExist.password;
        const checkPassword = await bcrypt.compare(password,fetchPassword);
        if(!checkPassword){
            return res.status(400).json({status:"N",message:"Invalid crendentials..!!"})
        }
        const token = jwt.sign({id:isEmailExist._id,email:isEmailExist.email},process.env.JWT_SECRET,{
                expiresIn: "1d"
            })
        return res.status(200).json({status:"Y",message:"Successfully LoggedIn..!!",token, user:{id: isEmailExist._id, name: isEmailExist.name, email: isEmailExist.email}})
    }
    catch(err){
        res.status(500).json({status:"N",message:"Something went wrong"+err.message})
    }
})

module.exports = userRoute;