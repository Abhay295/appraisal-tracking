const performanceReviewModel = require("../models/PerformanceReviewModel")


const addReview = async (req,res) =>{
    const addedReview = await performanceReviewModel.create(req.body)
    res.json({
        message:"review added successfully",
        data:addedReview
    })
}

const getAllReviews = async(req,res)=>{
    const allReviews = await performanceReviewModel.find().populate("employeeId reviewerId appraisalId")
    res.json({
        message:"all reviews fetched successfully",
        data:allReviews
    })
}
const getReviewsById = async(req,res)=>{
    const allReviewsById = await performanceReviewModel.find({employeeId : req.params.id}).populate("reviewerId")
    res.json({
        message:"your all reviews fetched successfully",
        data:allReviewsById
    })
}

module.exports = {
    addReview, getAllReviews,getReviewsById
}