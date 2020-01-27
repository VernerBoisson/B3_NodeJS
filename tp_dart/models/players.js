const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    rowid: {type: Number, required: true, unique: true},
    name: {type: String},
    email: {type: String},
    gameWin: {type: Number},
    gameLost: {type: Number},
    createdAt: {type: Date}
})

const player = mongoose.model('Player', schema)

module.exports = {
    get: (playerId) => {
      return player.findOne({rowid: playerId})
    },
  
    count: () => {
      return player.count()
    },
  
    getAll: (limit, offset) => {
      return player.find().skip(offset).limit(limit)
    },
  
    insert: (params) => {
      let id = player.count()
      let add_player = new player({
        rowid: id,
        name: params.name,
        email: params.email,
        gameWin: 0,
        gameLost: 0,
        createdAt: params.createdAt,
      })
      return add_player.save()
    },
  
    update: (playerId, params) => {
      let update_player = player.findOne({rowid: playerId})
      if(params.name) update_player.name = params.name
      if(params.email) update_player.email = params.email
      if(params.gameWin) update_player.gameWin = params.gameWin
      if(params.gameLost) update_player.gameLost = params.gameLost
      return update_player.save()
    },
  
    remove: (playerId) => {
      return player.deleteOne({rowid: playerId})
    }
  
  }