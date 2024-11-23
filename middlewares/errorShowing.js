//take out err message from whole paragraph and show it
exports.showError = (err, req , res ,next) =>{
    const statusCode = err.statusCode || 500;
    
    if(err.name === "MongoServerError" && err.message.includes("E11000 duplicate key error")){
        err.message = "account already exist with this email id..."
    }

    // if( === null) err.message = "no such account exist !"

    res.status(statusCode).json({
        message : err.message,
        // statusCode :err.statusCode,
        errName : err.name,
        // stack: err.stack
    })
}   