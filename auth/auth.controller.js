const { successMessage, ErrorMessage } = require("../middleware/SuccessFailure");
const {registerService,loginService}=require('./auth.service')


module.exports={
    registerController: async (req,res)=>{
        try{
            const password=req.hashedPassword;
            
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!emailPattern.test(req.body.email)){
                return ErrorMessage(res, 400, "email format is wrong ");
            }
            let data=req.body;
            data.password=password;
    
            const registerResult=await registerService(data);
            return successMessage(res,200,registerResult);
        }
        catch(error){
            console.log(error);
            return ErrorMessage(res,500,error.message);
        }
    },
    loginController: async (req,res,next)=>{
        try{
            const{email,password}=req.body;
            if(!email || !password){
                return ErrorMessage(res, 400, "Fields cannot be empty");
            }
            const loginResult=await loginService(email,password);
            req.userDetails=loginResult;
            next();
        }
        catch(error){
            console.log("ERROR CHECKING HEREEEEEEE",error);
            return ErrorMessage(res,500,error.message);
        }
    },
}