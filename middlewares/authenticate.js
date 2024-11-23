const ErrorHandler = require("../utils/syncErrorHandler");
const { catchAsyncError } = require("./catchAsyncErrors")
const jwt = require("jsonwebtoken")

exports.isAuthenticated = catchAsyncError(async(req,res, next)=>{
    const {token} = req.cookies;
    if(!token){
        return next(new ErrorHandler("Token not available !!!  , Please login to access the resource", 401))
    }

    const {id} = jwt.verify(token , process.env.JWT_SECRET)
    req.id = id
    next();
    // res.json(token);
})

