const bcrypt=require('bcryptjs');
const {successMessage,ErrorMessage}=require('../middleware/SuccessFailure');

module.exports={
    hashPassword : async (req, res, next) => {
        let { password } = req.body;
        password = password.trim();
        // if (!password) {
        //     return res.status(400).json({
        //         success: false,
        //         msg: "Please fill in the password",
        //     });
        // }
    
        function isValidPassword(password) {
            return /^.{6,}$/.test(password);
        }
    
        if (!isValidPassword(password)) {
            return ErrorMessage(res,400,"Password must be at least 6 characters long");
        }
    
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            req.hashedPassword = hashedPassword;
            next();
        } catch (error) {
            return res.status(500).json({
                success: false,
                msg: "Error hashing the password",
            });
        }
    }
}