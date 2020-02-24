const mongoose = require('mongoose')
const db = require('./database')
const autoIncrement = require('mongoose-auto-increment')

const schema = new mongoose.Schema({
    id: {type: Number, required: true, unique: true},
    name: {type: String},
    mode:{type: String, 
        enum:['around-the-world', '301', 'cricket']},
    currentPlayerId:{type: String},
    status:{type: String, 
        enum:['draft', 'started', 'ended'],
        default: 'draft'
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
          })
        return add_game.save()
    },

    update: (gameId, params) => {
        let update_game = game.findOne({id: gameId})
        if(params.name) update_game.name = params.name
        if(params.mode) update_game.mode = params.mode
        if(params.status) update_game.status = params.status
        if(params.currentPlayerId) update_game.currentPlayerId = params.currentPlayerId
        return update_game.save()
    },

    remove: (gameId) => {
        return game.deleteOne({id: gameId})
    }
}