const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AppraisalSchema = new Schema({
  userId: {
    type:Schema.Types.ObjectId,
    ref:"users",
    require: true,
  },
  appraisalCycle:{
    type:String,
    require:true
  },
  startDate:{
    type:String,
    require:true
  },
  endDate:{
    type:String,
    require:true
  },
  overallRating:{
    type:String,
    require:true
  },
  percentage:{
    type:String,
    default:"pending"
  }
},{
    timestamps:true,
});

module.exports = mongoose.model("appraisal",AppraisalSchema)
  