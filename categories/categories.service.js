const { pool } = require("../config/database")



module.exports = {
    categoryService: async (data, imagePath,userId) => {
        try {
            let q = `insert into categories (category_name,image,sequence_no,status,created_by)
                        values($1,$2,$3,$4,$5)
                    `
            let values=[
                data.category_name,
                imagePath,
                data.sequence_no,
                1,
                userId
            ]
            await pool.query(q,values)
            return "Category Added Success"
        } catch (error) {
            throw new Error(error.message)
        }
    },
    listCategoryService: async () => {
        try {
            let q = `select * from categories order by sequence_no asc`
            const getListsCategories=await pool.query(q);
            return getListsCategories.rows
        } catch (error) {
            throw new Error(error.message)
        }
    },
    editCategoryService: async (data, imagePath) => {
        try {
            let q = `update categories set category_name=$1,image=$2,sequence_no=$3,status=$4 where id=$5`
            let values=[
                data.category_name,
                imagePath,
                data.sequence_no,
                data.status,
                data.category_id
            ]
            await pool.query(q,values)
            return "Category updated Success"
        } catch (error) {
            throw new Error(error.message)
        }
    },
    deleteCategoryService:async (id) => {
        try {
            let q = ` delete from categories where id=$1`
            const deleteCategories=await pool.query(q,[id]);
            return "Delete category success"
        } catch (error) {
            throw new Error(error.message)
        }
    },
    getCategoryByIdService: async (id) => {
        try {
            let q = `select * from categories where id=$1 order by sequence_no asc`
            const getListsCategories=await pool.query(q,[id]);
            return getListsCategories.rows[0]
        } catch (error) {
            throw new Error(error.message)
        }
    },
}