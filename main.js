const productRouter = require('./routes/productRouter')
const customerRouter = require('./routes/customerRouter')
const purchaseRouter = require('./routes/purchaseRouter')
const path = require('path')

const express = require('express');
//const usersRouter = require("./routers/usersRouter")
var cors = require('cors');
const { Mongoose } = require('mongoose');
let app = express();
app.use(cors())
process.env.NODE_ENV = "production"

const PORT = process.env.PORT || 3001

require('./configs/database');

app.use(express.json());

//app.use('/api/users', usersRouter);
app.use('/api/product', productRouter);
app.use('/api/customers', customerRouter);
app.use('/api/purchases', purchaseRouter);

 if(process.env.NODE_ENV === 'production'){
 app.use(express.static(path.join((__dirname,'client/build'))))

 app.get('*',(req,res) => {
     res.sendFile(path.join(__dirname,'client','build','index.html'))
 })
 }
 else {
   app.get('/', (req,res) => {

    res.send('api running')
   }) 
 }



app.listen(PORT,console.log(`server is starting at ${PORT}`));


   

   
