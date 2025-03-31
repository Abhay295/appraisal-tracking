const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const goalSchema = new Schema({
  employeeId: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  goalName: {
    type: String,
    require: true,
  },
  goalDescription: {
    type: String,
    require: true,
  },
  startDate:{
    type: String,
    require: true,
  },
  endDate:{
    type: String,
    require: true,
  },
  progress:{
    type:Number,
    require:true
  },
  status:{
    type:String,
    require:true
  }

});


module.exports = mongoose.model("goal",goalSchema)