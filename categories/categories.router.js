const router=require('express').Router();
const {categoryController,listCategoryController,editCategoryController,deleteCategoryController,getCategoryByIdController}=require('./categories.controller')
const upload = require('../middleware/multer');
const {authenticateToken}=require('../middleware/tokenService');

router.post('/add-category', upload.single('image'),authenticateToken,categoryController);
router.get('/list-category',authenticateToken,listCategoryController);
router.put('/edit-category', upload.single('image'),authenticateToken,editCategoryController);
router.delete('/delete-category/:id?',authenticateToken,deleteCategoryController);

router.get('/get-category/:id?',authenticateToken,getCategoryByIdController);

module.exports=router;