const errors = require('./assets/errors')
const express = require('express')
const methodOverride = require('method-override')
const config = require("./config")
const app = express()

const PORT = config.port

app.set('view engine', 'pug')

app.use(methodOverride('_method'))

app.use(express.urlencoded({extended: true}));

app.use('/players', require('./routes/players'))

app.use('/games', require('./routes/games'))

app.get('/', function (req, res) {
  res.format({
    html: () => { res.redirect("/games") },
    json: () => { res.status(406).message(errors[406]) }
  })
})

app.get('*', (req, res, next) => {
  let error = new Error(errors[404])
  error.status = 404
  next(error)
});

app.use((err, req, res, next) => {
  let data = {
    message: err.message || errors[500],
    status: err.status || 500
  }
  res.status(data.status)

  res.format({
    html: () => { res.render('error', {data}) },
    json: () => { res.send(data) }
  })
})



app.listen(PORT)