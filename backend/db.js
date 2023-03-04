const mongoose = require('mongoose');
const mongoURI = 'mongodb://127.0.0.1:27017/enote?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.0'

const connnectToMongo = ()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("connected to mongo successfully");
    })
}
module.exports = connnectToMongo;