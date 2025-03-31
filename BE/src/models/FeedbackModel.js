const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    employeeId:{
        type:Schema.Types.ObjectId,
        ref:"users",
        unique:true,
        require:true
    },
    managerId:{
        type:Schema.Types.ObjectId,
        ref:"managers",
        require:true
    },
    appraisalId:{
        type:Schema.Types.ObjectId,
        ref:"appraisal",
        unique:true
    },
    feedbackText:{
        type:String,
        require:true
    },
    feedbackDate:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model("feedback",feedbackSchema)