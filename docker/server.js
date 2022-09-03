const express = require('express')
const app = express()
const {MongoClient}= require('mongodb')
const cors = require("cors")
app.use(cors())

const config = require('./db')
const PORT = 4000
const client = new MongoClient(config.DB);

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Establish and verify connection
    await client.db("music").command({ ping: 1 });
    console.log("Connected successfully to server");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.get('/albums', function(req, res) {
    client.connect()
    client
    .db("music")
    .collection("albums")
    .find({})
    .toArray(function (err, result) {
        if (err) throw err
        res.json(result)
    })
})

app.listen(PORT, function(){
    console.log('Your node js server is running on PORT:', PORT)
})