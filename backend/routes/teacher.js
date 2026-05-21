const express = require("express");
const { TeacherModel } = require("../models/Teacher.model");
const authJWT = require("../middlewares/auth.middleware");
const teacherRouter = express.Router();

teacherRouter.post("/",authJWT, async (req,res)=>{
    try{
        const {name,designation,bio,image,subject} = req.body;
        if(!name || !designation || !bio || !image || !subject){
            res.status(400).json({status:"N", message:"Please enter required fields..!!"})
        }
        const newTeacher = new TeacherModel({
            name,designation,bio,image,subject
        })
        await newTeacher.save();
        res.status(201).json({status:"Y", message:"New Teacher saved successfully..!!"});
    }
    catch (error) {
        res.status(500).json({ status: "N", error: "ERROR: " + error.message });
    }
})

teacherRouter.get("/",authJWT, async (req,res)=>{
    try {
        const data = await TeacherModel.find({});
        if (data.length === 0) {
            return res.status(400).json({ status: "Y", message: "No teacher found..!!" })
        }
        res.status(200).json({ status: "Y", data: data })
    }
    catch (error) {
        res.status(500).json({ status: "N", error: "ERROR: " + error.message });
    }
})

teacherRouter.delete("/:id",authJWT, async (req, res) => {
    try {
        const id = req.params.id;
        const findId = await TeacherModel.findById(id);
        if (!findId) {
            return res.status(400).json({ status: "N", message: "No ID found..!!" });
        }
        const findTeacher = await TeacherModel.findByIdAndDelete(id);
        res.status(200).json({ status: "Y", message: "Teacher Deleted Successfully..!!" })
    }
    catch (error) {
        res.status(500).json({ status: "N", error: "ERROR: " + error.message });
    }
})

teacherRouter.patch("/:id",authJWT, async (req, res) => {
    try {
        const id = req.params.id;
        const findId = await TeacherModel.findById(id);
        if (!findId) {
            return res.status(400).json({ status: "N", message: "No ID found..!!" });
        }
        const allowedUpdates = ["name","designation","bio","image","subject"];
        const keys = Object.keys(req.body);
        const isAllowed = keys.every((field) => allowedUpdates.includes(field));
        if (!isAllowed) {
            return res.status(400).json("Entered fields are not correct..!!");
        }
        await TeacherModel.findByIdAndUpdate(id, req.body);
        res.status(200).json({ status: "Y", message: "Teacher Updated Successsfully..!!" })
    }
    catch (error) {
        res.status(500).json({ status: "N", error: "ERROR: " + error.message });
    }
})

module.exports = teacherRouter;