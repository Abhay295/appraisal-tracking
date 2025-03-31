const rolemodel = require("../models/RoleModel")

const addRole = async (req,res)=>{
    const role = await rolemodel.create(req.body)
    res.json({
        message:"Role added successfully",
        data:role
    })
}

const getAllRole = async (req,res)=>{
    const fetchedRoles = await rolemodel.find()
    res.json({
        message:"All role fetched successfully",
        data:fetchedRoles
    })
}

const getRoleById = async (req,res)=>{
    const roleById = await rolemodel.findById(req.params.id)
    res.json({
        message:"User fetched by ID",
        data:roleById
    })
}

module.exports= {addRole,getAllRole,getRoleById}