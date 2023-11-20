const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const cors = require('cors');

const app = express()

app.use(express.json())
app.use(cors())

//routes

//fetch all data
app.get('/product', async(req, res)=>{
    try{
        const products = await Product.find({});
        res.status(200).json(products)
    }catch (error){
        res.status(500).json({message:error.message})
    }
})

// helper fuction to format query into regex expression understood by mongoose
function recur(data, obj, query, initials){
    if(typeof data[obj] === 'string' && data[obj] != ""){
        if(initials === '') {
            query[obj] = {
                $regex: new RegExp(data[obj], "i"),
           }
        } else {
            query[initials+'.'+obj] = {
                $regex: new RegExp(data[obj], "i")
            }
        }
    }
    
    if(typeof data[obj] === 'object'){
        for(subObj in data[obj]){
            recur(data[obj], subObj, query, obj)
        }
    }
}

//query data
app.post('/product/time/query', async (req, res) => {
    try {
      const { filterparams, timeRange } = req.body;
    //   console.log(filterparams)
      const regexObj = {};
  
      // Process the filterparams
      for (const obj in filterparams) {
        recur(filterparams, obj, regexObj, '');
      }
  
      // Process the timeRange
      if (timeRange.startTime && timeRange.endTime) {
        regexObj.timestamp = {
          $gte: timeRange.startTime,
          $lt: timeRange.endTime,
        };
      }else {
        return res.status(400).json({ message: 'Both Start time and End time are required' });
      }
  
      const products = await Product.find(regexObj).exec();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

//Creates new logs
app.post('/product', async(req, res)=>{
    try{
        console.log(req.body)
        const product = await Product.create(req.body)
        res.status(200).json(product)
    }catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

mongoose.connect('mongodb+srv://admin:Saswati*1701@myapi.dfxidjs.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(()=>{
    console.log('connected to MongoDB')
    app.listen(3000, ()=>{
        console.log(`Node API app is running on port 3000`)
    })
}).catch((error)=>{
    console.log(error)

})          