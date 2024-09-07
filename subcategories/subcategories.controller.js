const { ErrorMessage, successMessage } = require('../middleware/SuccessFailure');
const {subCategoryService,listSubCategoryService,editSubCategoryService,deleteSubCategoryService}=require('./subcategories.service');

module.exports={
    subCategoryController:async(req,res)=>{
        try {
            const userId=req.userId;
            
            if (!req.file) {
                return ErrorMessage(res, 400, "No file uploaded");
            }
            let data=req.body;
            if(!data.subcategory_name || !data.subcategory_sequence_no){
                return ErrorMessage(res, 400, "Fields cannot be empty");
            }
    
            const imagePath = `/images/${req.file.filename}`; 
            
            const subcategoriesResult=await subCategoryService(data,imagePath,userId)
            return successMessage(res,200,subcategoriesResult);
        } catch (error) {
            console.log(error.message);
            
            return ErrorMessage(res,500,error.message);
        }
    },
    listSubCategoryController:async (req,res)=>{
        try {
            const listSubCategoryResult=await listSubCategoryService();
            console.log(listSubCategoryResult,"listSubCategoryResult");
            
            return successMessage(res,200,"getting lists of subcategory success",listSubCategoryResult);
        } catch (error) {
            console.log(error.message);
            return ErrorMessage(res,500,error.message);
        }
    },
    editSubCategoryController:async (req,res)=>{
        try {
            
            if (!req.file) {
                return ErrorMessage(res, 400, "No file uploaded");
            }
            let data=req.body;
            if(!data.subcategory_name || !data.subcategory_sequence_no){
                return ErrorMessage(res, 400, "Fields cannot be empty");
            }
    
            const imagePath = `/images/${req.file.filename}`; 
            
            const subcategoriesResult=await editSubCategoryService(data,imagePath)
            return successMessage(res,200,subcategoriesResult);
        }  catch (error) {
            console.log(error.message);
            return ErrorMessage(res,500,error.message);
        }
    },
    deleteSubCategoryController:async (req,res)=>{
        try {
            const sub_category_id=req.params.id;
            if(!sub_category_id){
                return ErrorMessage(res, 400, "No subcategory id selected");
            }
            const deleteSubCategoryResult=await deleteSubCategoryService(sub_category_id);
            
            return successMessage(res,200,deleteSubCategoryResult);
        } catch (error) {
            console.log(error.message);
            return ErrorMessage(res,500,error.message);
        }
    },
}