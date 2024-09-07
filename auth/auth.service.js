const { pool } = require('../config/database.js');
const bcrypt = require('bcryptjs');

module.exports={
    registerService: async (data) => {
        try {
            let q1 = `select email from users where email=$1`;
            const checkEmailExist = await pool.query(q1, [data.email]);
            if (checkEmailExist.rows.length > 0) {
                throw new Error('Email already taken');
            }

            let q3 = `INSERT INTO users (name,email,password) 
                  VALUES ($1, $2, $3) RETURNING id`;
            let values = [
                data.name || "default name",
                data.email,
                data.password
            ];
            let insert = await pool.query(q3, values);
            console.log(insert);
            return 'Register success'
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    loginService: async (email, password) => {
        try {
            let q = `select *
                        from users u
                        where u.email=$1`
            const checkEmail = await pool.query(q, [email]);
            if (checkEmail.rows.length === 0) {
                throw new Error('email or password incorrect');
            }
            const isPasswordValid = await bcrypt.compare(password, checkEmail.rows[0].password);
            if (isPasswordValid === false) {
                throw new Error('email or password incorrect');
            }
            let result = {
                "id": checkEmail.rows[0].id,
                "email": checkEmail.rows[0].email,
            }
            return result;
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
}