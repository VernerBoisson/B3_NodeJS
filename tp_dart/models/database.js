const mongoose = require('mongoose')
const config = require('../config')
const mongoDB = config.database
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false, useCreateIndex: true })
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
module.exports = db