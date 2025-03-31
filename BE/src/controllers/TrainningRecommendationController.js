const trainnigRecommendationModel = require("../models/TrainningRecommendationModel")


const addTrainning = async (req,res) =>{
    const addedTrainning = await trainnigRecommendationModel.create(req.body)
    res.json({
        message:"trainning added successfully",
        data:addedTrainning
    })
}

const getAllTrainning = async (req,res) =>{
    const allTrainning = await trainnigRecommendationModel.find();
    res.json({
        message:"all trainning fetched successfully",
        data:allTrainning
    })
}

module.exports = {
    addTrainning,getAllTrainning
}