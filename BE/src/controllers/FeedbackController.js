const feedbackModel = require("../models/FeedbackModel")


const addFeedback = async(req,res)=>{
    const addedFeedback = await feedbackModel.create(req.body)
    res.json({
        message:"feedback added successfully",
        data:addedFeedback
    })
}

const getAllFeedbacks = async(req,res) =>{
    const allFeedbacks = await feedbackModel.find()
    res.json({
        message:"all feedbacks fetched successfully",
        data:allFeedbacks
    })
}

module.exports = {
    addFeedback , getAllFeedbacks
}