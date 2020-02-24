const mongoose = require('mongoose')
const db = require('./database')
const autoIncrement = require('mongoose-auto-increment')
const gameStatus = require('../assets/messages').gameStatus
const modeName = require('../assets/messages').modename

const schema = new mongoose.Schema({
    id: {type: Number, required: true, unique: true},
    name: {type: String},
    mode:{type: String, 
        enum:[modeName.worldtour, modeName.threehundredone, modeName.cricket]},
    currentPlayerId:{type: String},
    status:{type: String, 
        enum:[gameStatus.draft, gameStatus.started, gameStatus.ended],
        default: gameStatus.draft
    },
    createdAt: {type: Date, default: new Date()}
})

autoIncrement.initialize(mongoose.connection)
schema.plugin(autoIncrement.plugin, {
    model: 'Game',
    field: 'id',
    startAt: 1
})

const game = mongoose.model('Game', schema)

module.exports = {
    get: (gameId) => {
        return game.findOne({id: gameId})
    },

    getAll: (limit, offset, sort, reverse, status) => {
        let order = {}
        sort ? order[sort] = reverse : order = undefined
        status ? gamestatus = {'status':status} : gamestatus = undefined
        return game.find(gamestatus).skip(offset).limit(limit).sort(order)
    },

    insert: (params) => {
        const add_game = new game({
            name: params.name,
            mode: params.mode,
            status: gameStatus.draft,
          })
        return add_game.save()
    },

    update: (gameId, params) => {
        const update_game = game.findOne({id: gameId})
        const filter = { id: gameId };
        const update = {
            name : params.name ? params.name : update_game.name,
            mode : params.mode ? params.mode : update_game.mode,
            currentPlayerId : params.currentPlayerId ? params.currentPlayerId : update_game.currentPlayerId,
            status : params.status ? params.status : update_game.status,
        }
        return game.findOneAndUpdate(filter,update)
    },

    remove: (gameId) => {
        return game.deleteOne({id: gameId})
    }
}