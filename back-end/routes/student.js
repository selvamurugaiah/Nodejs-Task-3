var express = require('express');
var router = express.Router();
const {studentModel} = require('../schemas/studentSchema')
const {mentorModel} = require('../schemas/mentorSchema')
;
const mongoose = require('mongoose')

const {url} = require('../common/dbConfig')
mongoose.connect(url)

/* GET users listing. */


router.get('/mentors', async function(req, res, next) {
  try{
    let users = await mentorModel.find({},{password:0})
    res.status(200).send({
      users,
      message:"Users Data Fetch Successfully"
    })

  }catch(error){
    res.status(500).send({
      message:"Internal Server Error",
      error 
    })
  }
});
//create mentor

router.post('/create-mentor',async(req,res,next)=>{
  const {name,email,course} =req.body
  const addMentor =new mentorModel({
    "name":name,
    "email":email,
    "course":course
  })

  try{
   
    let mentor = await addMentor.save()
    res.status(201).send({
      message:"User Signup Successfull!"
    })
  }catch(error){
     res.status(500).send({
      message:"Internal Server Error",
      error
     })
  }
})

//get mentor based on id
router.get('/get-mentors/:id', async function(req, res, next) {
  const {id} = req.params
  try{
    let mentor = await mentorModel.findById({_id: id})
    res.status(200).send({
      mentor,
      message:"Users Data Fetch Successfully"
    })

  }catch(error){
    res.status(500).send({
      message:"Internal Server Error",
      error 
    })
  }
});

//all student details
router.get('/students', async function(req, res, next) {
  try{
    let users = await studentModel.find({},{password:0})
    res.status(200).send({
      users,
      message:"Users Data Fetch Successfully"
    })

  }catch{
    res.status(500).send({
      message:"Internal Server Error",
      error 
    })
  }
});


// create student
router.post('/create-student',async(req,res,next)=>{
    const addStudent = new studentModel({
       "name" :req.body.name,
       "email":req.body.email,
       "batch":req.body.batch,
       "course":req.body.course,
       "mentor":req.body.mentor ? req.body.mentor : undefined
    })
  try{

    let student = await addStudent.save()
    res.status(201).send({
      student,
      message:"User Signup Successfull!"
    })
  }catch(error){
     res.status(500).send({
      message:"Internal Server Error",
      error
     })
  }
})

//List of students with no mentors

router.get('/no-mentors', async function(req, res, next) {
   const students = await studentModel.find({mentor:[]})
  try{
    res.status(200).send({
      students,
      message:"Users Data Fetch Successfully"
    })

  }catch{
    res.status(500).send({
      message:"Internal Server Error",
      error 
    })
  }
});

//Assign or chanage Mentor for student-- select one student and assign one mentor

router.post('/assign-mentor/:id',async (req,res) => {
  const {id} = req.params;

  try{
      const student = await studentModel.findById(id);
      student.mentor = req.body;
      await student.save();
      res.send(student);
  }catch(err){
      res.status(500);
      res.send(err);
  }
})

//Assign multiple students for mentor

router.post('/assign-student/:id',async (req,res) => {
  const {id} = req.params;
  
  try{
      const student = await mentorModel.findById(id);
      student.studentsAssigned = req.body;
      await student.save();
      res.send(student);
  }catch(err){
      res.status(500);
      res.send(err);
  }
})



module.exports = router;
