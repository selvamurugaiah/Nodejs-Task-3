
const validator = require('validator')
const mongoose = require('mongoose')


var studentSchema = new mongoose.Schema(
    {
        name:{type:String,required:true},
        email:{
            type:String,
            required:true,
            lowercase:true,
            validate:(value)=>{
                return(validator.isEmail(value))
            }
        },
        batch:{type:String,required:true},
        course: { type: String, required: true},
        role:{type:String,require:true ,default:'Student'},
        mentor : {
            type :[],
       
        },
        createdAt:{type:Date,default:Date.now}
    },

 
)

let studentModel = mongoose.model('student',studentSchema)
module.exports={studentModel}