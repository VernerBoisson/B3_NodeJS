const errors = require('./assets/errors')

const express = require('express')
const app = express()

const PORT = 8080

app.use('/players', require('./routes/players'))

app.use('/games', require('./routes/games'))

app.get('/', function (req, res) {
  res.format({
    html: () => { res.redirect("/games") },
    json: () => { res.status(406).message(errors[406]) }
  })
})

app.use(function(err, req, res, next) {
  let data = {
    message: err.message,
    status: err.status || 500
  }

  res.status(data.status)

  res.format({
    html: () => { res.render('error', data) },
    json: () => { res.send(data) }
  })
})


app.listen(PORT)