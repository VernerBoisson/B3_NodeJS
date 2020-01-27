const router = require("express").Router()
const errors = require('../assets/errors')

router.get('/', (req, res, next) => {
    res.format({
        html: () => { res.send(errors[200]) },
        json: () => { res.send("hello world") }
      })
})

router.get('/new', (req, res, next) => {
    res.format({
        html: () => {   },
        json: () => { res.send("hello world") }
      })
})

router.post('/', (req, res, next) => {

})

router.get('/:id', (req, res, next) => {

})

router.get('/:id/edit', (req, res, next) => {

})

router.patch('/:id', (req, res, next) => {

})

router.delete('/:id', (req, res, next) => {

})

router.get('/:id/players',  (req, res, next) => {

})

router.post('/:id/players',  (req, res, next) => {

})

router.delete('/:id/players', (req, res, next) => {

})

router.post('/:id/shots',  (req, res, next) => {

})

router.delete('/:id/shots/previous',  (req, res, next) => {

})

module.exports = router