const { ErrorMessage, successMessage } = require('../middleware/SuccessFailure');
const {addProductsService,listProductsService,editProductsService,deleteProductsService}=require('./products.service');

module.exports={
    addProductsController:async(req,res)=>{
        try {
            const userId=req.userId;
            
            if (!req.file) {
                return ErrorMessage(res, 400, "No file uploaded");
            }
            let data=req.body;
            if(!data.subcategory_name || !data.category_name || !data.product_name){
                return ErrorMessage(res, 400, "Fields cannot be empty");
            }
    
            const imagePath = `/images/${req.file.filename}`; 
            
            const addProductResult=await addProductsService(data,imagePath,userId)
            return successMessage(res,200,addProductResult);
        } catch (error) {
            console.log(error.message);
            
            return ErrorMessage(res,500,error.message);
        }
    },
    listProductsController:async (req,res)=>{
        try {
            const listProductsResult=await listProductsService();
            console.log(listProductsResult,"listProductsResult");
            
            return successMessage(res,200,"getting lists of subcategory success",listProductsResult);
        } catch (error) {
            console.log(error.message);
            return ErrorMessage(res,500,error.message);
        }
    },
    editProductsController:async (req,res)=>{
        try {
            
            if (!req.file) {
                return ErrorMessage(res, 400, "No file uploaded");
            }
            let data=req.body;
            if(!data.subcategory_name || !data.category_name || !data.product_name){
                return ErrorMessage(res, 400, "Fields cannot be empty");
            }
    
    
            const imagePath = `/images/${req.file.filename}`; 
            
            const ProductsResult=await editProductsService(data,imagePath)
            return successMessage(res,200,ProductsResult);
        }  catch (error) {
            console.log(error.message);
            return ErrorMessage(res,500,error.message);
        }
    },
    deleteProductsController:async (req,res)=>{
        try {
            const product_id=req.params.id;
            if(!product_id){
                return ErrorMessage(res, 400, "No product id selected");
            }
            const deleteProductsResult=await deleteProductsService(product_id);
            
            return successMessage(res,200,deleteProductsResult);
        } catch (error) {
            console.log(error.message);
            return ErrorMessage(res,500,error.message);
        }
    },
}