const router = require("express").Router()
const errors = require('../assets/errors')
const Game = require('../models/games')
const GamePlayer = require('../models/gamePlayers')
const Player = require('../models/players')

router.get('/', async (req, res, next) => {
  let limit = parseInt(req.query.limit) || 10
  let offset = parseInt(req.query.offset)*limit || 0
  if (limit > 20) limit = 20
  let sort = req.query.sort
  let reverse = req.query.reverse ? -1 : 1
  let status = ['draft', 'started', 'ended'].indexOf(req.query.status) >= 0 ? req.query.status : false

  const games = await Game.getAll(limit, offset, sort, reverse, status)
  res.format({
      html: () => {
      res.render('games/', {
          games: results,
          limit: limit,
          offset: offset
      })
      },
      json: () => {
      res.send({
          data: results[0],
          meta: {
          count: results[1].count
          }
      })
      }
  })
})

router.get('/new', (req, res, next) => {
    res.format({
        html: () => {  
          res.render('games/new', {
            games: {},
            action: '/games'
          })
        },
        json: () => { 
          let error = new Error(errors[406])
          error.status = 406
          next(error)
        }
      })
})

router.post('/', async (req, res, next) => {
  const game = await Game.insert(req.body)
  res.format({
    html: () => { res.redirect(`/games/${req.params.gameId}`) },
    json: () => { res.status(201).send({message: errors[201], game}) }
  })
})


// TODO : get games id
router.get('/:id', (req, res, next) => {

})

router.get('/:id/edit', (req, res, next) => {
  res.format({
    html: () => { res.redirect(`/games/${req.params.id}/edit`) },
    json: () => { res.status(406).send({message: errors[406], game}) }
  })
})

// TODO: patch games id
router.patch('/:id', (req, res, next) => {

})

router.delete('/:id', async (req, res, next) => {
  const game = await Game.delete(req.params.id)
  res.format({
    html: () => { res.redirect(`/games/${req.params.id}`) },
    json: () => { res.status(201).send({message: errors[201], game}) }
  })
})

// TODO: fix games/id/players
router.get('/:id/players',  (req, res, next) => {
  const game = await GamePlayer.get(req.query.id)
  const players = await Player.getAll()
  res.format({
    html: () => { res.redirect(`/games/${req.params.id}`) },
    json: () => { res.status(201).send({message: errors[201], game}) }
  })
})

// TODO: FINIR TP
router.post('/:id/players',  (req, res, next) => {

})

router.delete('/:id/players', (req, res, next) => {

})

router.post('/:id/shots',  (req, res, next) => {

})

router.delete('/:id/shots/previous',  (req, res, next) => {

})

module.exports = router