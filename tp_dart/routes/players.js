const router = require("express").Router()
const Player = require("../models/players")
const errors = require("../assets/errors")

router.get('/', async (req, res, next) => {
    let limit = parseInt(req.query.limit) || 10
    let offset = parseInt(req.query.offset)*limit || 0
    let sort = req.query.sort || "name"
    let reverse = parseInt(req.query.reverse) || 1
    if (limit > 20) limit = 20

    const results = await Player.getAll(limit, offset, sort, reverse)
    + await Player.count()
    res.format({
        html: () => {
        res.render('players/players', {
            pla: results[0],
            count: results[1],
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

router.post('/', async (req, res, next) => {
    if (
        !req.body.name || req.body.name === '' ||
        !req.body.email || req.body.email === ''
      ) {
        let err = new Error(errors[400])
        err.status = 400
        return next(err)
      }
    
    const player = await Player.insert(req.body)
    res.format({
        html: () => { res.redirect('/users') },
        json: () => { res.status(201).send({message: errors[201], player}) }
    })
})

router.get('/new', (req, res, next) => {
    res.format({
        html: () => {
          res.render('players/new', {
            player: {},
            action: '/players'
          })
        },
        json: () => {
          let error = new Error(errors[406])
          error.status = 406
          next(error)
        }
    })
})

router.get('/:id', async (req, res, next) => {
    const player = await Player.get(req.params.id)
    if(!player) return next()

    res.format({
        html: () => { res.redirect(`/player/${req.params.id}/edit`) },
        json: () => { res.send({ data: player }) }
    })
})

router.get('/:id/edit', async (req, res, next) => {
    const player = await Player.get(req.params.id)
    if(!player) return next()
    res.format({
        html: () => {
          res.render('players/edit', {
            player: player,
            action: `/players/${player.rowid}?_method=put`
          })
        },
        json: () => {
          let error = new Error(errors[406])
          error.status = 406
          next(error)
        }
    })
})

router.patch('/:id', async (req, res, next) => {
    player = await Player.update(req.params.id, req.body)
    res.format({
        html: () => { res.redirect(`/players/${req.params.userId}`) },
        json: () => { res.status(200).send({ message: errors[200] }) }
    })
})

router.delete('/:id', async (req, res, next) => {
    let player = await Player.get(req.params.id)
    if(!player){
        let err = new Error(errors[410])
        err.status = 410
        return next(err)
    }
    player = await Player.remove(req.params.id)
    res.format({
        html: () => { res.redirect(`/players`) },
        json: () => { res.status(204).send({ message: errors[204] }) }
    })
})

module.exports = router