const router=require('express').Router();
const {subCategoryController,listSubCategoryController,editSubCategoryController,deleteSubCategoryController}=require('./subcategories.controller');
const upload = require('../middleware/multer');
const {authenticateToken}=require('../middleware/tokenService');

router.post('/add-subcategory', upload.single('image'),authenticateToken,subCategoryController);
router.get('/list-subcategory',authenticateToken,listSubCategoryController);
router.put('/edit-subcategory', upload.single('image'),authenticateToken,editSubCategoryController);
router.delete('/delete-subcategory/:id?',authenticateToken,deleteSubCategoryController);

module.exports=router;