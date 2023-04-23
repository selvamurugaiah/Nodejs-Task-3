const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient;
const dbName = "nodejs-Task-3"
const url =`mongodb+srv://selvamurugaiah100:Mselva95@cluster0.zphx6l8.mongodb.net/${dbName}`

module.exports={url,mongodb,MongoClient}