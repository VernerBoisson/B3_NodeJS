const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    rowid: {type: Number, required: true, unique: true},
    gameId: {type: Number},
    playerId:{type: Number},
    multiplicator:{type: Number},
    sector:{type: Number},
    createdAt: {type: Date}
})