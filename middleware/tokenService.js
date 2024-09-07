require('dotenv').config();
const jwt=require('jsonwebtoken');
const {successMessage,ErrorMessage}=require('../middleware/SuccessFailure');

module.exports={
    tokenGenertor: async (req,res)=>{
        try{
            const {id,email}=req.userDetails;
        const token= jwt.sign(
            {id,email},
            process.env.ACCESS_TOKEN_KEY,
            {expiresIn:'30d'}
        )
        
        let data={
            token:token,
            userId:id,
            email:email
        }
        return successMessage(res,200,"Login Successful!",data);

        }
        catch(error){
            return ErrorMessage(res,400,error.message);
        }
    },
    
    authenticateToken: async (req,res,next)=>{
        try{
            const authHeader=await req.headers['authorization'];
            const token=await authHeader &&authHeader.split(' ')[1];

            const verifyToken=jwt.verify(token,process.env.ACCESS_TOKEN_KEY);
            req.userId=verifyToken.id;
            req.email=verifyToken.email;
            next()
        }
        catch(error){
            return ErrorMessage(res,400,error.message);

        }
    },
    tokenGeneratorForgotpassword: async (req,res)=>{
        try{
        const id=await req.userId;
        const token= jwt.sign(
            {id},
            process.env.ACCESS_TOKEN_KEY,
            {expiresIn:'30min'}
        )
        // return res.status(200).json({
        //     status:200,
        //     data:{
        //         token:token
        //     },
        //     msg:"OTP sent success for reset password"
        // })
        let data={
            token:token
        }
        return successMessage(res,200,"OTP sent success for reset password",data);
        }
        catch(error){
            return ErrorMessage(res,400,error.message);
        }
    },
    authenticateForgotpassword: async (req,res,next)=>{
        try{
            const authHeader=await req.headers['authorization'];
            const token=await authHeader &&authHeader.split(' ')[1];

            const verifyToken=jwt.verify(token,process.env.ACCESS_TOKEN_KEY);
            req.userId=verifyToken.id;
            next();
        }
        catch(error){
            return ErrorMessage(res,400,error.message);
        }
    },
}