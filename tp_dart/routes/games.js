const router = require("express").Router()
const errors = require('../assets/errors')
const Game = require('../models/games')
const GamePlayer = require('../models/gamePlayers')
const Player = require('../models/players')
const gameStatus = require('../assets/messages').gameStatus

router.get('/', async (req, res, next) => {
  let limit = parseInt(req.query.limit) || 10
  let offset = parseInt(req.query.offset)*limit || 0
  if (limit > 20) limit = 20
  let sort = req.query.sort ? req.query.sort : false
  let reverse = req.query.reverse
  let status = [gameStatus.draft, gameStatus.started, gameStatus.ended].indexOf(req.query.status) >= 0 ? req.query.status : false

  const games = await Game.getAll(limit, offset, sort, reverse, status)
  res.format({
      html: () => {
      res.render('games/games', {
          games: games,
          limit: limit,
          offset: offset
      })
      },
      json: () => {
      res.send({
          data: games,
          meta: {
          count: games.length
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
          let error = new Error(errors[406].not_available)
          error.status = 406
          next(error)
        }
      })
})

router.post('/', async (req, res, next) => {
  const game = await Game.insert(req.body)
  res.format({
    html: () => { res.redirect(`/games`) },
    json: () => { res.status(201).send({message: errors[201], game}) }
  })
})


router.get('/:id', async (req, res, next) => {
  const game = await Game.get(req.params.id)
  res.format({
    html: () => { res.redirect(`/games/${req.params.id}/edit`) },
    json: async () => { 
      if(req.query.include === "gamePlayers"){
        const players = await GamePlayer.getByGameId(game.gameId)
        game.gamePlayer = players
      }
      res.send(game)
    }
  })
})

router.get('/:id/edit', async (req, res, next) => {
  const game = await Game.get(req.params.id)
  if(!game) return next()
  res.format({
    html: () => { 
      res.render(`/games/new`, {
        games: game,
        action: `/games/${game.id}?_method=put`
      })
    },
    json: () => { 
      let error = new Error(errors[406].not_available)
      error.status = 406
      next(error)
    }
  })
})


router.patch('/:id', async (req, res, next) => {
  let game = await Game.get(req.params.id)
  const players = await GamePlayer.getByGameId(game.id)
  let error_code = 200
  let error_message = errors[200]
  if(game.status !== gameStatus.draft){
    if(req.params.status === gameStatus.started){
      error_code = 422
      error_message = errors[422].not_startable
    }else{
      error_code = 410
      error_message = errors[410].game_not_editable
    }
  }else{
    if(players.length<2){
      error_code = 422
      error_message = errors[422].player_missing
    }else
      game = await Game.update(game.id, req.params.name, req.params.status)
  }
  res.format({
    html: () => { res.redirect(`/games/${req.params.id}`) },
    json: () => {
      if(error!==200){
        let error = new Error(error_message)
        error.status = error_code
        next(error) 
      }
      res.status(200).send({message: errors[200], game})
    }
  })

})

router.delete('/:id', async (req, res, next) => {
  const game = await Game.remove(req.params.id)
  res.format({
    html: () => { res.redirect(`/games`) },
    json: () => { res.status(201).send({message: errors[201], game}) }
  })
})

router.get('/:id/players', async (req, res, next) => {
  const players = await GamePlayer.getByGameId(req.params.id)
  res.format({
    html: () => { res.redirect(`/games/${req.params.id}`) },
    json: () => { res.status(201).send({message: errors[201], players}) }
  })
})

// TODO: les fonctions qui suivents 
router.post('/:id/players', async (req, res, next) => {
  const game = await Game.get(req.params.id)
  res.format({
    html: () => { res.redirect(`/games/${req.params.id}`) },
    json: () => { res.status(201).send({message: errors[201], player}) }
  })
})

router.delete('/:id/players', async (req, res, next) => {
  const game = await Game.get(req.params.id)
  res.format({
    html: () => { res.redirect(`/games/${req.params.id}`) },
    json: () => { res.status(201).send({message: errors[201], player}) }
  })
})

router.post('/:id/shots',  (req, res, next) => {

})

router.delete('/:id/shots/previous',  (req, res, next) => {

})

module.exports = router