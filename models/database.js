const mongoose = require("mongoose");

const db = mongoose.connect("mongodb://127.0.0.1:27017/setupPractice").then(()=>{
    console.log("db Established !!! ")
})

module.exports =db;