const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const performanceReviewSchema = new Schema({
    employeeId:{
        type:Schema.Types.ObjectId,
        ref:"users",
        require:true
    },
    appraisalId:{
        type:Schema.Types.ObjectId,
        ref:"appraisal",
        require:true
    },
    reviewerId:{
        type:Schema.Types.ObjectId,
        ref:"users",
        require:true
    },
    reviewDate:{
        type:String,
        require:true
    },
    strengths:{
        type:String,
        require:true
    },
    improvementAreas:{
        type:String,
        require:true
    },
    finalRating:{
        type:Number,
        require:true
    },
    comments:{
        type:String
    }
})

module.exports = mongoose.model("review",performanceReviewSchema)