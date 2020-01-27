const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')

const schema = new mongoose.Schema({
    rowid: {type: Number, required: true, unique: true},
    playerId: {type: Number, required: true},
    gameId: {type:Number, required: true},
    remainingShots: {type:Number},
    score: {type: Number},
    rank: {type: Number},
    order: {type: Number},
    createdAt: {type: Date, default: new Date()}
})

const gameplayer = mongoose.model('GamePlayers', schema)

autoIncrement.initialize(mongoose.connection)
schema.plugin(autoIncrement.plugin, {
    model: 'GamePlayers',
    field: 'rowid',
    startAt: 1
})

module.exports = {
    get: (gameplayerId) => {
        return gameplayer.findOne({rowid: gameplayerId})
    },

    insert: (params) => {
        let add_gameplayer = new gameplayer({
            playerId: params.playerId,
            gameId: params.gameId,
            remainingShots: params.remainingShots,
            score: params.score,
            rank: params.rank,
            order: params.order
          })
        return add_gameplayer.save()
    },

    remove: (gameplayerId) => {
        return gameplayer.deleteOne({rowid: gameplayerId})
    }
}