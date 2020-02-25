const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')

const schema = new mongoose.Schema({
    id: {type: Number, required: true, unique: true},
    gameId: {type: Number},
    playerId:{type: Number},
    multiplicator:{type: Number, 
        enum:[1,2,3]
    },
    sector:{type: Number},
    createdAt: {type: Date, default: new Date()}
})

autoIncrement.initialize(mongoose.connection)
schema.plugin(autoIncrement.plugin, {
    model: 'Shot',
    field: 'id',
    startAt: 1
})

const shot = mongoose.model('Shot', schema)

module.exports = {
    insert: (gameId, playerId, sector, multiplicator) => {
        let add_shot = new shot({
            gameId: gameId,
            playerId: playerId,
            multiplicator: multiplicator, 
            sector: sector
        })
        return add_shot.save()
    },
  
    remove: (playerId) => {
      return shot.deleteOne({id: playerId})
    }
  }