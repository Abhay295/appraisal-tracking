const departmentModel = require("../models/DepartmentModel")

const addDepartment = async (req,res)=>{
    const savedDepartment = await departmentModel.create(req.body);
    res.json({
        message:"department saved successfully",
        data:savedDepartment
    })
}

const allDepartment = async (req,res)=>{
    const fetchedDepartment = await departmentModel.find();
    res.json({
        message:"all user fetched successfully...",
        data:fetchedDepartment
    })
}

module.exports = {addDepartment,allDepartment}
