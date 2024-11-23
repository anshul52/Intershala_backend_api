const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const studentModel = new mongoose.Schema(
    {
        email:{
            type :String,
            required:[true, "Email is required"],
            unique:true,
            match:[/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, "Please fill a valid email name"]
        },
        password:{
            type:String,
            select:false,
            required:[true, "Password is required"],
            maxLength:[15,"password should not exceed more than 15 characters"],
            minLength: [6,"password should have altest 6 characters"],
        }
    },
    {timestamps:true}
) 


studentModel.pre("save",function(){
    if(!this.isModified("password")) return;

    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password , salt);
})

studentModel.methods.comparePassword = function(password){
    return bcrypt.compareSync(password , this.password);
}


//token

studentModel.methods.getjwttoken = ()=>{
    return jwt.sign({id:this._id}, process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    })
}


module.exports = mongoose.model("student",studentModel);