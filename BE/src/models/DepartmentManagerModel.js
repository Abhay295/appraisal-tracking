const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const managerSchema = new Schema({
    departmentId:{
        type:Schema.Types.ObjectId,
        ref:"departments",
        unique:true,
        // require:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"users",
        unique:true,
        // require:true
    }
})

module.exports = mongoose.model("managers",managerSchema)