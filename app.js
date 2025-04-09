const express = require("express");
const authRouter = require('./routes/authRoute')
const productRoute = require('./routes/productRoute')
const cartRoutes = require('./routes/cartRoute');
require("dotenv").config();
const pool = require('./config/db');

const app = express();
app.use(express.json());

app.use('/',authRouter) 
app.use('/', productRoute)
app.use('/cart', cartRoutes)

const PORT = process.env.PORT || 3000;


app.listen(PORT , ()=>{
  try{
    pool.query('SELECT NOW()', (err, res) => {
      if (err) {
        console.error('Connection error:', err.stack);
      } else {
        console.log('Connected at:', res.rows[0].now); 
      }
    });
  }catch(err){
    console.error(err.message)
  }
})




