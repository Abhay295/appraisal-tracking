const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const roleSchema = new Schema({
    name:{
        enum:['Admin', 'Project manager', 'HR', 'Developer'],
        type:String
    }
})

module.exports= mongoose.model("roles",roleSchema)