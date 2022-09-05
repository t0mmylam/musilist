const express = require('express')
const app = express()
const {MongoClient}= require('mongodb')
const cors = require("cors")
const { logger, readLog } = require('./utils/logger');
app.use(cors())

const bodyParser = require('body-parser')
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));

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

app.post('/albums/add', function(req, response) {
    logger.info(req.body)
    let album = {
        name: req.body.name,
        artist: req.body.artist,
        released: req.body.released,
        rating: req.body.rating,
        language: req.body.language,
    }
    client.connect()
    client
    .db("music")
    .collection("albums")
    .insertOne(album, function (err, res) {
        if (err) throw err
        console.log('test')
        response.json(res)
    })
})

app.get("/api/logs", (request, response) => {
    try {
      const result = readLog();
      response.set('Content-Type', 'text/plain');
      return response.send(result);
    } catch(e) {
      return response.sendStatus(500);
    }
  });

app.listen(PORT, function(){
    logger.info('Your node js server is running on PORT:', PORT)
})