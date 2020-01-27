const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')

const schema = new mongoose.Schema({
    rowid: {type: Number, required: true, unique: true},
    name: {type: String},
    email: {type: String},
    gameWin: {type: Number, default:0},
    gameLost: {type: Number, default:0},
    createdAt: {type: Date, default: new Date()}
})

const player = mongoose.model('Player', schema)

autoIncrement.initialize(mongoose.connection)
schema.plugin(autoIncrement.plugin, {
    model: 'Player',
    field: 'rowid',
    startAt: 1
})

module.exports = {
    get: (playerId) => {
      return player.findOne({rowid: playerId})
    },
  
    getAll: (limit, offset, sort="name", reverse=1) => {
      order[sort]= reverse
      return player.find().skip(offset).limit(limit).sort(order)
    },
  
    insert: (params) => {
      let add_player = new player({
        name: params.name,
        email: params.email,
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