const validator = require('validator')
const mongoose = require('mongoose')

var mentorSchema = new mongoose.Schema(
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
        course:{type:String,required:true},
        role:{type:String,require:true,default:'Mentor'},
        studentsAssigned : {
            type :[],
       
        },
      
        createdAt:{type:Date,default:Date.now}
    }
)



let mentorModel = mongoose.model('mentor',mentorSchema)
module.exports={mentorModel}