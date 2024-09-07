const router=require('express').Router();
const {addProductsController,listProductsController,editProductsController,deleteProductsController}=require('./products.controller');
const upload = require('../middleware/multer');
const {authenticateToken}=require('../middleware/tokenService');

router.post('/add-product', upload.single('image'),authenticateToken,addProductsController);
router.get('/list-product',authenticateToken,listProductsController);
router.put('/edit-product', upload.single('image'),authenticateToken,editProductsController);
router.delete('/delete-product/:id?',authenticateToken,deleteProductsController);

module.exports=router;