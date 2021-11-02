const express = require('express')
const { MongoClient } = require('mongodb');
const  ObjectId  = require('mongodb').ObjectId;
require('dotenv').config();
const bodyParser = require('body-parser')
const cors = require('cors')
const port =process.env.PORT || 5055


const app = express();
app.use(cors());
app.use(bodyParser.json());



app.get('/', (req, res) => {
  res.send('Hello World!')
})




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4xoys.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  console.log("err",err);
  const productCollection = client.db("freshvalley").collection("products");
  app.get('/allProducts',(req,res)=>{
      productCollection.find()
      .toArray((err,items)=>{
        // console.log("items",items);
        res.send(items)
      })
  })

  app.get('/productList',(req,res)=>{
    productCollection.find()
    .toArray((err,products)=>{
      res.send(products)
    })
  })
  // add product from admin
  app.post('/addProduct',(req,res)=>{
    const newProduct=req.body;
    console.log("adding a new product",newProduct);
    productCollection.insertOne(newProduct)
    .then(result=>{
      console.log("inserted count",result);
      res.send(result.insertedCount>0)
    })
  })

  app.delete('/delete/:id',(req,res)=>{
    // const id=ObjectId(req.params.id);
    console.log("delete this ",id);
    productCollection.findOneAndDelete({ _id: ObjectId(req.params.id)})
    .then(documents=>{
      res.send(documents.deletedCount>0)
    })
  })

  console.log("database connected");
  // perform actions on the collection object
  // client.close();
});




app.listen(port, () => {
  console.log("server running at 5055");
})
