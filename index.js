const express = require('express')
const { MongoClient } = require('mongodb');
require('dotenv').config();
const bodyParser = require('body-parser')
const cors = require('cors')
const port =process.env.PORT || 5055


const app = express();
app.use(cors());
app.use(bodyParser.json())



app.get('/', (req, res) => {
  res.send('Hello World!')
})




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4xoys.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  console.log("err",err);
  const productCollection = client.db("freshvalley").collection("products");
  console.log("database connected");
  // perform actions on the collection object
  // client.close();
});




app.listen(port, () => {
  console.log("object");
})
