const appraisalController = require("../models/AppraisalModel");

const addAppraisal = async (req, res) => {
  const createdAppraisal = await appraisalController.create(req.body);
  res.json({
    message: "Appraisal created successfully",
    data: createdAppraisal,
  });
};

const getAllAppraisal = async (req, res) => {
  const allAppraisal = await appraisalController.find().populate({
    path: "userId",
    populate: {
      path: "departmentId",
    },
  });
  res.json({
    message: "Appraisal fetched successfully",
    data: allAppraisal,
  });
};

const getAppraisalById = async (req,res)=>{
  const appraisalById = await appraisalController.find({userId:req.params.id})
  res.json({
    message:"appraisal found successfully",
    data:appraisalById
  })
}


module.exports = {
  addAppraisal,
  getAllAppraisal,
  getAppraisalById
};
