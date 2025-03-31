const goalModel = require("../models/GoalModel")


const addGoal = async (req,res)=> {
    const addedGoal = await goalModel.create(req.body)
    res.json({
        message:"Goal created successfully",
        data:addedGoal
    })
}

const getAllGoals = async(req,res)=>{
    const allGoals = await goalModel.find().populate("employeeId")
    res.json({
        message:"all goals fetched successfully",
        data:allGoals
    })
}

const getGoalById = async (req,res)=>{

    // const employeeId = req.params.id;

    const goalById = await goalModel.find({employeeId: req.params.id})
    res.json({
        message:"Goal founded successfully",
        data:goalById
    })
}

module.exports = {
    addGoal, getAllGoals,getGoalById
}