const { pool } = require("../config/database")

module.exports = {
    subCategoryService: async (data, imagePath, userId) => {
        try {
            let q = `insert into sub_categories (sub_category_name,category_name,sub_category_image,sub_category_sequence_no,status,created_by)
                        values($1,$2,$3,$4,$5,$6)
                    `
            let values = [
                data.subcategory_name,
                data.category_name,
                imagePath,
                data.subcategory_sequence_no,
                1,
                userId
            ]
            await pool.query(q, values)
            return "Subcategory Added Success"
        } catch (error) {
            throw new Error(error.message)
        }
    },
    listSubCategoryService: async () => {
        try {
            let q = `select * 
                    from sub_categories sc
                    order by sc.sub_category_sequence_no asc`
            const getListsSubCategories = await pool.query(q);
            return getListsSubCategories.rows
        } catch (error) {
            throw new Error(error.message)
        }
    },
    editSubCategoryService: async (data, imagePath) => {
        try {
            let q = `update sub_categories set sub_category_name=$1,sub_category_image=$2,sub_category_sequence_no=$3,status=$4,category_name=$5 where id=$6`
            let values = [
                data.subcategory_name,
                imagePath,
                data.subcategory_sequence_no,
                data.status,
                data.category_name,
                data.sub_category_id
            ]
            await pool.query(q, values)
            return "Subcategory updated Success"
        } catch (error) {
            throw new Error(error.message)
        }
    },
    deleteSubCategoryService: async (id) => {
        try {
            let q = ` delete from sub_categories where id=$1`
            const deleteSubCategories = await pool.query(q, [id]);
            return "Delete subcategory success"
        } catch (error) {
            throw new Error(error.message)
        }
    },
}