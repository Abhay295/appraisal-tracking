const departmentManagerModel=  require("../models/DepartmentManagerModel")


const addmanager = async (req,res)=>{
    const addedManager = await (await departmentManagerModel.create(req.body)).populate("departmentId userId")
    res.json({
        message:"manager added successfully",
        data:addedManager
    })
}

const getAllManagers = async(req,res) =>{
    const allManagers = await departmentManagerModel.find()
    res.json({
        message:"all managers fetched successfully",
        data:allManagers
    })
}

module.exports = {
    addmanager,getAllManagers
}