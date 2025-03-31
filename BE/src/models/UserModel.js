const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
    require: true,
  },
  contactNum:{
    type:Number,
    require:true
  },
  roleId:{
    type:Schema.Types.ObjectId,
    ref:"roles",
    require:true
  },
  status:{
    type:String,
    default:"active"
  },
  dateOfJoining:{
    type:String
  },
  imageUrl:{
    type:String
  },

  departmentId:{
    type:Schema.Types.ObjectId,
    ref:"departments"
  }
},{timestamps:true});

module.exports = mongoose.model("users",UserSchema)