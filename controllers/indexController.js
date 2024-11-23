const { catchAsyncError } = require("../middlewares/catchAsyncErrors");
const studentModel = require("../models/studentModel");
const { sendToken } = require("../utils/sendToken");
const ErrorHandler = require("../utils/syncErrorHandler");

exports.home = (req, res, next) => {  
    res.json("welcome to home page")
}


exports.signUp = catchAsyncError(async (req, res, next) => {
    const stu = await new studentModel(req.body).save();
    sendToken(stu , 201 , res);
})


exports.signIn = catchAsyncError(async (req, res, next) => {
    const student  = await studentModel.findOne({email: req.body.email}).select("+password").exec();
    
    if(!student) {
        return next(new ErrorHandler("no such account exist with this email id !!" , 404))
    }
    let isMatch = student.comparePassword(req.body.password);

    if(!isMatch) {
        return next(new ErrorHandler("Your password doesn't match , plz try again", 401))
    }
    sendToken(student , 201 , res);
    // res.json(student);
})


exports.signOut = catchAsyncError(async (req, res, next) => {
    res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        success:true,
        message:"SuccessFully signOut !!!"
    })
})


