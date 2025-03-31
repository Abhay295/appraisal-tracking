const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const departmentSchema = new Schema({
    name:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model("departments",departmentSchema)