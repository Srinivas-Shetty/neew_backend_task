const router=require('express').Router();
const {registerController,loginController}=require('./auth.controller');
const {hashPassword}=require('../middleware/passwordService');
const {tokenGenertor}=require('../middleware/tokenService')

router.post('/register',hashPassword,registerController);
router.post('/login',loginController,tokenGenertor);

module.exports=router;