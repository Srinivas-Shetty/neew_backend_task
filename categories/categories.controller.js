const { ErrorMessage, successMessage } = require('../middleware/SuccessFailure');
const {categoryService,listCategoryService,editCategoryService,deleteCategoryService,getCategoryByIdService}=require('./categories.service');

module.exports={
    categoryController:async(req,res)=>{
        try {
            const userId=req.userId;
            
            if (!req.file) {
                return ErrorMessage(res, 400, "No file uploaded");
            }
            let data=req.body;
            if(!data.category_name || !data.sequence_no){
                return ErrorMessage(res, 400, "Fields cannot be empty");
            }
    
            // const imagePath = `../imagesBackend/${req.file.filename}`; 
            const imagePath = `images/${req.file.filename}`; 
            
            const categoriesResult=await categoryService(data,imagePath,userId)
            return successMessage(res,200,categoriesResult);
        } catch (error) {
            console.log(error.message);
            
            return ErrorMessage(res,500,error.message);
        }
    },
    listCategoryController:async (req,res)=>{
        try {
            const listCategoryResult=await listCategoryService();
            console.log(listCategoryResult,"listCategoryResult");
            
            return successMessage(res,200,"getting lists of category success",listCategoryResult);
        } catch (error) {
            console.log(error.message);
            return ErrorMessage(res,500,error.message);
        }
    },
    editCategoryController:async (req,res)=>{
        try {
            
            if (!req.file) {
                return ErrorMessage(res, 400, "No file uploaded");
            }
            let data=req.body;
            if(!data.category_name || !data.sequence_no){
                return ErrorMessage(res, 400, "Fields cannot be empty");
            }
    
            const imagePath = `/images/${req.file.filename}`; 
            
            const categoriesResult=await editCategoryService(data,imagePath)
            return successMessage(res,200,categoriesResult);
        }  catch (error) {
            console.log(error.message);
            return ErrorMessage(res,500,error.message);
        }
    },
    deleteCategoryController:async (req,res)=>{
        try {
            const category_id=req.params.id;
            if(!category_id){
                return ErrorMessage(res, 400, "No Category id selected");
            }
            const deleteCategoryResult=await deleteCategoryService(category_id);
            
            return successMessage(res,200,deleteCategoryResult);
        } catch (error) {
            console.log(error.message);
            return ErrorMessage(res,500,error.message);
        }
    },
    getCategoryByIdController:async (req,res)=>{
        try {
            const id=req.params.id;
            if(!id){
                return ErrorMessage(res,400,"Category id not provided");
            }
            const getCategoryResult=await getCategoryByIdService(id);
            console.log(getCategoryResult,"getCategoryResult");
            
            return successMessage(res,200,"getting lists of category success",getCategoryResult);
        } catch (error) {
            console.log(error.message);
            return ErrorMessage(res,500,error.message);
        }
    },
}