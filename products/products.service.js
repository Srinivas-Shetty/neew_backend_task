const { pool } = require("../config/database")

module.exports = {
    addProductsService: async (data, imagePath, userId) => {
        try {
            let q = `insert into products (product_name,product_image,category_name,sub_category_name,status,created_by)
                        values($1,$2,$3,$4,$5,$6)
                    `
            let values = [
                data.product_name,
                imagePath,
                data.category_name,
                data.subcategory_name,
                1,
                userId
            ]
            await pool.query(q, values)
            return "Product added Success"
        } catch (error) {
            throw new Error(error.message)
        }
    },
    listProductsService: async () => {
        try {
            let q = `select * from products`
            const getListsProducts = await pool.query(q);
            return getListsProducts.rows
        } catch (error) {
            throw new Error(error.message)
        }
    },
    editProductsService: async (data, imagePath) => {
        try {
            let q = `update products set product_name=$1,product_image=$2,category_name=$3,sub_category_name=$4,status=$5 where id=$6`
            let values = [
                data.product_name,
                imagePath,
                data.category_name,
                data.subcategory_name,
                data.status,
                data.product_id
            ]
            await pool.query(q, values)
            return "Product updated Success"
        } catch (error) {
            throw new Error(error.message)
        }
    },
    deleteProductsService: async (id) => {
        try {
            let q = ` delete from products where id=$1`
            const deleteSubCategories = await pool.query(q, [id]);
            return "Delete product success"
        } catch (error) {
            throw new Error(error.message)
        }
    },
}