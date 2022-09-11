const express = require('express')
const app = express()
const { Sequelize, Model, DataTypes } = require('sequelize')
const cors = require("cors")
const { logger, readLog } = require('./utils/logger');
app.use(cors())

const PORT = 4000
const bodyParser = require('body-parser')
const sequelize = new Sequelize('postgres://musi:secret@postgres:5432/musilist', {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {},
})

class Album extends Model {}
Album.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.TEXT
  },
  rating: {
    type: DataTypes.FLOAT
  },
  artist: {
    type: DataTypes.TEXT
  },
  language: {
    type: DataTypes.TEXT
  },
  genre: {
    type: DataTypes.TEXT
  },
  released: {
    type: DataTypes.DATE
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'album'
})

Album.sync()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));

app.get('/albums', async function(req, res) {
    const albums = await Album.findAll()
    console.log(albums)
    res.json(albums)
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