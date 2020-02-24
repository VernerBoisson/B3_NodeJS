const mongoose = require('mongoose')

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

const shot = mongoose.model('Shot', schema)

autoIncrement.initialize(mongoose.connection)
schema.plugin(autoIncrement.plugin, {
    model: 'Shot',
    field: 'id',
    startAt: 1
})

module.exports = {
    insert: (params) => {
        let add_shot = new shot({
            gameId: params.gameId,
            playerId: params.playerId,
            multiplicator: params.multiplicator, 
            sector: params.sector
        })
        return add_shot.save()
    },
  
    remove: (playerId) => {
      return shot.deleteOne({id: playerId})
    }
  }