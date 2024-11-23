exports.sendToken = (student , statusCode, res)=>{
    const token = student.getjwttoken();
    const option= {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly:true,
    }
    res.status(statusCode).cookie("token",token, option).json({
        success:true,
        message: 'yes yes',
        student,
        token
    })
}