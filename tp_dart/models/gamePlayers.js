const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')

const schema = new mongoose.Schema({
    id: {type: Number, required: true, unique: true},
    playerId: {type: Number, required: true},
    gameId: {type:Number, required: true},
    remainingShots: {type:Number},
    score: {type: Number},
    rank: {type: Number},
    order: {type: Number},
    createdAt: {type: Date, default: new Date()}
})

autoIncrement.initialize(mongoose.connection)
schema.plugin(autoIncrement.plugin, {
    model: 'GamePlayers',
    field: 'id',
    startAt: 1
})

const gameplayer = mongoose.model('GamePlayers', schema)


module.exports = {
    get: (gameplayerId) => {
        return gameplayer.findOne({id: gameplayerId})
    },

    getByGameId: (gameId) => {
        return gameplayer.find({gameId: gameId})
    },

    insert: (params, gameId) => {
        let add_gameplayer = new gameplayer({
            playerId: params.id,
            gameId: gameId,
            remainingShots: params.remainingShots,
            score: params.score,
            rank: params.rank,
            order: params.order
          })
        return add_gameplayer.save()
    },

    remove: (gameplayerId) => {
        return gameplayer.deleteOne({id: gameplayerId})
    }
}