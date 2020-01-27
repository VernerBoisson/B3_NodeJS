const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    rowid: {type: Number, required: true, unique: true},
    name: {type: String},
    mode:{type: String},
    currentPlayerId:{type: String},
    status:{type: String},
    createdAt: {type: Date}
})
/*
    mode: 'around-the-world' | '301' | 'cricket',
    currentPlayerId: null | string | number,
    status: 'draft' | 'started' | 'ended',
*/