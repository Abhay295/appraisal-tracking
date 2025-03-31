const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const trainningSchema = new Schema({
    appraisalId:{
        type:Schema.Types.ObjectId,
        require:true
    },
    employeeId:{
        type:Schema.Types.ObjectId,
        require:true
    },
    trainingName:{
        type:String,
        require:true
    },
    trainingDescription:{
        type:String,
        require:true
    },
    status:{
        type:String,
        require:true
    },
    recommendedBy:{
        type:Schema.Types.ObjectId,
        require:true
    }
})

module.exports = mongoose.model("trainning",trainningSchema)