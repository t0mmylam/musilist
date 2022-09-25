const express = require('express')
const fileUpload = require("express-fileupload")
const app = express()
app.use(fileUpload())
const { Sequelize, Model, DataTypes } = require('sequelize')
const cors = require("cors")
const { logger, readLog } = require('./utils/logger');
const AWS = require("aws-sdk")
require('dotenv').config()
app.use(cors())
app.use(express.json())
const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
})
const PORT = 4000
const bodyParser = require('body-parser');
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
    type: DataTypes.STRING
  },
  artist: {
    type: DataTypes.STRING
  },
  language: {
    type: DataTypes.STRING
  },
  genre: {
    type: DataTypes.STRING
  },
  released: {
    type: DataTypes.DATE
  },
  image: {
    type: DataTypes.TEXT
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'album'
})

class User extends Model {}
User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  },
  access: {
    type: DataTypes.STRING
  },
  image: {
    type: DataTypes.TEXT
  }
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'user'
})

class Rating extends Model {}
Rating.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING
  },
  rating: {
    type: DataTypes.INTEGER
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'rating'
})

User.sync()
Album.sync()
Rating.sync()

async function uploadFile(file) {
  const params = {
    Bucket: 'musilistimages',
    Key: `albums/${file.name}`,
    Body: file.data,
    ACL: "public-read",
  }
  const data = await s3.upload(params).promise()
  return data.Location
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));

app.get('/albums', async function(req, res) {
    const albums = await Album.findAll()
    res.json(albums)
})

app.get('/api/users/:username', async function(req, res) {
  const user = await User.findAll({
    where: {
      username: req.params.username
    }
  })
  res.json(user)
})

app.get('/api/ratings/:username', async function(req, res) {
  const ratings = await Rating.findAll({
    where: {
      username: req.params.username
    }
  })
  res.json(ratings)
})

app.get('/api/users/:access', async function(req, res) {
  const user = await User.count({
    where: {
      username: req.params.access
    }
  })
  const obj = { count : user}
  res.send(JSON.stringify(obj))
})

app.get('/api/username', async function(req, res) {
  const number = await User.count({
    where: {
      username: req.query.username
    }
  })
  const obj = { count : number}
  res.send(JSON.stringify(obj))
})

app.get('/api/users', async function(req, res) {
  const number = await User.count({
    where: {
      username: req.query.username,
      password: req.query.password
    }
  })
  const obj = { count : number}
  res.send(JSON.stringify(obj))
})

app.post('/api/albums/add', async function(req, res) {
  const album = await Album.create({
    name: req.body.name,
    artist: req.body.artist,
    language: req.body.language,
    genre: req.body.genre,
    released: req.body.released,
    image: req.body.image
  })
  if (album) {
    res.send(album)
  } else {
    res.status(400).send('Error in adding new album')
  }
})

app.post('/api/users/add', async function(req, res) {
  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    access: req.body.access,
    image: 'https://musilistimages.s3.amazonaws.com/profiles/Default.png'
  });
  if (user) {
    res.send(user);
  } else {
    res.status(400).send('Error in creating new user');
  }
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

app.post("/upload", async (req, res) => {
  const fileLocation = await uploadFile(req.files.file)
  return res.status(200).json({ location : fileLocation })
})

app.listen(PORT, function(){
    logger.info('Your node js server is running on PORT:', PORT)
})