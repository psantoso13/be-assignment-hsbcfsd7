require("dotenv").config();     

const express = require("express");     
const cors = require('cors')
const PORT = process.env.SERVER_PORT || 3000   
const {sequelize} =require('./models')     // mengambil file index.js yang ada dalam folder models

const productRouter = require('./routes/product.route')     
const userRouter = require('./routes/user.route');
const inputproductRouter = require("./routes/inputproduct.route");

const app = express();

app.use(express.urlencoded({extended:true}));     
app.use(express.json());
// app.use(cors())
app.use(cors({origin: true, credentials:true}))

sequelize.authenticate().then(function (error) {
  console.log('database connection has successfully connected')
}).catch(function (error) {
  console.log('unable to connect to database' + error)
})

app.use('/api/products', productRouter)   
app.use('/katakita/user', userRouter)     
app.use('/katakita/kuliner', inputproductRouter) 

app.get('/home', (req, res) => {
  // res.send('<h2>Hallo Surabaya!</h2>')
  res.send({Nama: 'myProductApi', version: '1.0.23', author: 'Prayogo Santoso'})
});

// app.listen(process.env.SERVER_PORT, () => {console.log('Server Running')});

app.listen(PORT, () => {
  console.log('Server is running on' + ' ' +PORT)
})


