const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')

const schema = new mongoose.Schema({
    id: {type: Number, required: true, unique: true},
    name: {type: String},
    email: {type: String},
    gameWin: {type: Number, default:0},
    gameLost: {type: Number, default:0},
    createdAt: {type: Date, default: new Date()}
})


autoIncrement.initialize(mongoose.connection)
schema.plugin(autoIncrement.plugin, {
    model: 'Player',
    field: 'id',
    startAt: 1
})
const player = mongoose.model('Player', schema)

module.exports = {
    get: (playerId) => {
      return player.findOne({id: playerId})
    },
  
    getAll: (limit, offset, sort="name", reverse=1) => {
      order = {}
      sort ? order[sort]= reverse : order = undefined
      return player.find().skip(offset).limit(limit).sort(order)
    },
  
    insert: (params) => {
      const add_player = new player({
        name: params.name,
        email: params.email,
      })
      return add_player.save()
    },
  
    update: (playerId, params) => {
      const update_player = player.findOne({id: playerId})
      const filter = { id: playerId };
      const update = {
        name : params.name ? params.name : update_player.name,
        email : params.email ? params.email : update_player.email,
        gameWin : params.gameWin ? params.gameWin : update_player.gameWin,
        gameLost : params.gameLost ? params.gameLost : update_player.gameLost,
      }
      return player.findOneAndUpdate(filter,update)
    },
  
    remove: (playerId) => {
      return player.deleteOne({id: playerId})
    },

    count: () =>{
      return player.count()
    }
  
  }