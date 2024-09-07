require('dotenv').config();
const express=require('express');
const path=require('path')
const cors = require('cors');
const bodyParser=require('body-parser');

const app=express();

app.use(express.json());
const corsOptions = {
    origin: 'https://frontend-react-tan.vercel.app', // your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // allow cookies or authentication headers
    optionsSuccessStatus: 204
  };
  
  app.use(cors(corsOptions));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

const port=process.env.PORT  || 5001;

app.use('/images', express.static(path.join(__dirname, 'images')));

const auth=require('./auth/auth.router');
const categories=require('./categories/categories.router')
const subcategories=require('./subcategories/subcategories.router')
const products=require('./products/products.router')

app.use('/auth',auth)
app.use('/categories',categories)
app.use('/subcategories',subcategories)
app.use('/products',products)

app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
})

