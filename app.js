const express = require("express");
const router = require("./routes/indexRouter");
require("dotenv").config({path:"./.env"})
const app = express();

//db
require("./models/database")

//body parser
app.use(express.json());
app.use(express.urlencoded({extended:false}));


//logger
const logger = require("morgan");
app.use(logger("tiny"))

//session and cookies
const session = require("express-session")
const cookie = require("cookie-parser")
app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:process.env.SESSION_SECRET,
}))

app.use(cookie());

//routes
app.use('/',router);


// ERROR - handling

const ErrorHandler = require("./utils/syncErrorHandler");
app.all('*',function(req,res,next){
    next(new ErrorHandler(`This Page not Found !!!  Requested URL not found ${req.url}` , 404))
})

const { showError } = require("./middlewares/errorShowing")
app.use(showError)

app.listen(process.env.PORT,console.log(`server running on port ${process.env.PORT} !!!`))



